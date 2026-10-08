const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

function load(file, mocks = {}, env = {}) {
  const module = { exports: {} };
  const output = ts.transpileModule(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(output, {
    module, exports: module.exports, process: { env }, URL, console,
    require: (id) => Object.hasOwn(mocks, id) ? mocks[id] : require(id),
  }, { filename: file });
  return module.exports;
}

test('metadata resolves canonical and sharing URLs against the configured origin', () => {
  const seo = load('src/lib/seo.ts', {}, { NEXT_PUBLIC_BASE_URL: 'https://portfolio.example/' });
  const meta = seo.pageMetadata({ title: 'Cozzy Corner', description: 'A project', path: '/projects/cozzy-corner', image: '/project/1.png' });
  assert.equal(meta.title.absolute, 'Cozzy Corner | Ashish Bishnoi');
  assert.equal(meta.description, 'A project');
  assert.equal(meta.alternates.canonical, 'https://portfolio.example/projects/cozzy-corner');
  assert.equal(meta.openGraph.url, meta.alternates.canonical);
  assert.equal(meta.openGraph.images[0].url, 'https://portfolio.example/project/1.png');
  assert.equal(meta.twitter.images[0], meta.openGraph.images[0].url);
  assert.equal(meta.robots.index, true);
});

test('metadata has a valid production origin and sharing image without optional configuration', () => {
  const seo = load('src/lib/seo.ts');
  const meta = seo.pageMetadata({ title: 'Blog', description: 'Articles', path: '/blog' });
  assert.equal(meta.alternates.canonical, 'https://www.ashishbuilds.in/blog');
  assert.equal(meta.twitter.images[0], 'https://www.ashishbuilds.in/ashish-img.jpg');
});

test('sitemap includes public detail pages and every blog archive page with unique absolute URLs', async () => {
  const seo = load('src/lib/seo.ts');
  const publicPosts = Array.from({ length: 25 }, (_, index) => ({ slug: `post-${index}`, isVisible: true }));
  const blogs = repository([...publicPosts, { slug: 'draft', isVisible: false }, { slug: null, isVisible: true }]);
  const { default: sitemap } = load('src/app/sitemap.tsx', {
    '@/lib/seo': seo,
    '@/lib/projects.repository': { getPublicProjects: async () => [{ slug: 'cozzy-corner' }, { slug: 'roamify-planners' }] },
    '@/lib/blogs.repository': blogs,
  });
  const urls = (await sitemap()).map((entry) => entry.url);
  const expectedPaths = ['/', '/projects', '/contact-me', '/blog', '/projects/cozzy-corner', '/projects/roamify-planners',
    ...publicPosts.map((post) => `/blog/${post.slug}`), '/blog/page/2', '/blog/page/3'];
  assert.deepEqual(Array.from(urls).sort(), expectedPaths.map(seo.absoluteUrl).sort());
  assert.equal(new Set(urls).size, urls.length);
  assert(!urls.some((url) => /admin|api\/|draft|\[object Object\]|\/page\/1$/.test(url)));
});

test('sitemap fails a storage read instead of publishing an incomplete catalog', async () => {
  const { default: sitemap } = load('src/app/sitemap.tsx', {
    '@/lib/seo': load('src/lib/seo.ts'),
    '@/lib/projects.repository': { getPublicProjects: async () => { throw new Error('Unavailable'); } },
    '@/lib/blogs.repository': { BLOG_PAGE_SIZE: 10, getPublicBlogs: async () => [] },
  });
  await assert.rejects(sitemap(), /Unavailable/);
});

test('robots points to the canonical sitemap and permits public content and images', () => {
  const { default: robots } = load('src/app/robots.tsx', { '@/lib/seo': load('src/lib/seo.ts') });
  const result = robots();
  assert.equal(result.sitemap, 'https://www.ashishbuilds.in/sitemap.xml');
  assert.equal(result.rules[0].userAgent, '*');
  assert.equal(result.rules[0].allow, '/');
  assert.deepEqual(Array.from(result.rules[0].disallow), ['/admin', '/api/']);
});

test('stored JSON dates and plain dates produce consistent article timestamps', () => {
  const dates = load('src/lib/blog-date.ts');
  assert.equal(dates.blogDateISO('"2025-11-19T12:00:00.000Z"'), '2025-11-19T12:00:00.000Z');
  assert.equal(dates.blogDateISO('2025-11-19'), '2025-11-19T00:00:00.000Z');
  assert.equal(dates.formatBlogDate('"2025-11-19T12:00:00.000Z"'), '19 Nov 2025');
  assert.equal(dates.blogDateISO('invalid date'), undefined);
  assert.equal(dates.blogDateISO('null'), undefined);
});

test('structured data cannot break out of its script tag', () => {
  const { JsonLd } = load('src/components/json-ld.tsx');
  const data = { headline: '</script><script>alert(1)</script>' };
  const markup = renderToStaticMarkup(React.createElement(JsonLd, { data }));
  assert.equal((markup.match(/<script/g) || []).length, 1);
  const serialized = markup.match(/>(.*)<\/script>/)[1];
  assert.deepEqual(JSON.parse(serialized), data);
  assert(!serialized.includes('<'));
});

function repository(posts = [], { configured = true, fail = false } = {}) {
  const fields = { slug: 'slug', isVisible: 'isVisible', date: 'date' };
  let reads = 0;
  const db = { select: () => {
    reads++;
    let result = posts;
    const query = {
      from: () => query,
      where: ({ field, value }) => { result = result.filter((post) => post[field] === value); return query; },
      orderBy: async () => { if (fail) throw new Error('Unavailable'); return result; },
      then: (resolve, reject) => (fail ? Promise.reject(new Error('Unavailable')) : Promise.resolve(result)).then(resolve, reject),
    };
    return query;
  } };
  const api = load('src/lib/blogs.repository.ts', {
    'server-only': {}, react: { cache: (fn) => fn },
    'drizzle-orm': { eq: (field, value) => ({ field, value }), desc: (field) => field },
    '@/dbConfig/dbConfig': { db }, '../../db/schema': { blogTable: fields },
  }, configured ? { DATABASE_URL: 'test-only' } : {});
  return { ...api, reads: () => reads };
}

test('public blog generation includes every published post and excludes drafts and missing slugs', async () => {
  const posts = Array.from({ length: 25 }, (_, index) => ({ slug: `post-${index}`, isVisible: true }));
  posts.push({ slug: 'draft', isVisible: false }, { slug: null, isVisible: true });
  const api = repository(posts);
  assert.equal((await api.getPublicBlogs()).length, 25);
  assert.equal(await api.getPublicBlogBySlug('draft'), undefined);
  assert.equal((await api.getPublicBlogBySlug('post-24')).slug, 'post-24');
});

test('failed configured blog reads fail generation instead of publishing an empty archive', async () => {
  await assert.rejects(repository([], { fail: true }).getPublicBlogs(), /Unavailable/);
  const unconfigured = repository([], { configured: false });
  assert.equal((await unconfigured.getPublicBlogs()).length, 0);
  assert.equal(unconfigured.reads(), 0);
});

function blogActions(authenticated) {
  let writes = 0;
  const invalidations = [];
  const chain = {
    set: () => chain, values: () => chain, where: () => chain,
    returning: async () => [{ slug: 'published-post', isVisible: false }],
  };
  const db = {
    select: () => ({ from: () => ({ where: async () => [] }) }),
    insert: () => { writes++; return chain; }, update: () => { writes++; return chain; },
  };
  const api = load('src/lib/blog.helper.ts', {
    'drizzle-orm': { eq: () => ({}), desc: () => ({}), count: () => ({}), not: () => ({}), and: () => ({}), like: () => ({}), ilike: () => ({}) },
    '../../db/schema': { blogTable: {}, blogForm: {} }, '@/dbConfig/dbConfig': { db },
    'next/cache': { revalidatePath: (path, type) => invalidations.push({ path, type }) },
    './admin-auth': { isAdminAuthenticated: async () => authenticated },
  });
  return { ...api, invalidations, writes: () => writes };
}

test('blog writes require admin authentication before any database changes', async () => {
  const api = blogActions(false);
  await assert.rejects(api.insertBlog({}), /sign in/);
  await assert.rejects(api.updateBlogByID({}), /sign in/);
  await assert.rejects(api.toggleBlogVisibility(1, false), /sign in/);
  assert.equal(api.writes(), 0);
});

test('publishing, editing, and hiding posts invalidate detail pages, all archive pages, and sitemap', async () => {
  for (const action of [
    (api) => api.insertBlog({ title: 'Published Post' }),
    (api) => api.updateBlogByID({ slug: 'published-post' }),
    (api) => api.toggleBlogVisibility(1, false),
  ]) {
    const api = blogActions(true);
    await action(api);
    assert.equal(api.writes(), 1);
    assert(api.invalidations.some(({ path }) => path === '/blog/published-post'));
    assert(api.invalidations.some(({ path, type }) => path === '/blog/page/[page]' && type === 'page'));
    assert(api.invalidations.some(({ path }) => path === '/blog'));
    assert(api.invalidations.some(({ path }) => path === '/sitemap.xml'));
  }
});
