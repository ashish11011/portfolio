const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { renderToStaticMarkup } = require('react-dom/server');
const React = require('react');

// Exercise the actual TypeScript modules with isolated storage/auth dependencies.
// No database, schema application, or external upload is performed.
function load(file, mocks = {}, env = {}) {
  const module = { exports: {} };
  const output = ts.transpileModule(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(output, {
    module, exports: module.exports, process: { env }, URL, Response, Request, console,
    require: (id) => Object.hasOwn(mocks, id) ? mocks[id] : require(id),
  }, { filename: file });
  return module.exports;
}
const validation = load('src/lib/projects.validation.ts');
const catalog = load('src/lib/projects.catalog.ts');
const original = JSON.parse(fs.readFileSync(path.join(__dirname, '../exports/projects.json'), 'utf8'));
const clone = (value) => JSON.parse(JSON.stringify(value));

function actions({ authenticated = true, ready = true, existing = original, failWrite = false } = {}) {
  const writes = [], invalidated = [];
  const db = { insert: () => ({ values: (project) => ({ onConflictDoUpdate: async () => {
    if (failWrite) throw new Error('Unavailable');
    writes.push(project);
  } }) }) };
  const api = load('src/lib/projects.actions.ts', {
    'next/cache': { revalidatePath: (value) => invalidated.push(value) },
    '@/dbConfig/dbConfig': { db }, '../../db/schema': { projectTable: { id: 'id' } },
    './admin-auth': { isAdminAuthenticated: async () => authenticated },
    './projects.repository': { getProjectCatalog: async () => ({ projects: existing, storageReady: ready }) },
    './projects.catalog': catalog, './projects.validation': validation,
  });
  return { ...api, writes, invalidated };
}

test('backup preserves all ten projects, image arrays, and local screenshots', () => {
  assert.equal(original.length, 10);
  assert.equal(new Set(original.map((project) => project.id)).size, 10);
  assert.equal(original.flatMap((project) => project.images).length, 7);
  for (const project of original) {
    validation.validateProject(project);
    for (const image of project.images) assert(fs.existsSync(path.join(__dirname, '..', 'public', image)));
  }
});

test('sorting preserves stored records and cleared fields without adding file records', () => {
  const edited = { ...clone(original[2]), name: 'Updated project', slug: 'new-project-url', summary: '', images: [], featuredOrder: null };
  const result = catalog.sortProjects([edited]);
  assert.equal(result.length, 1);
  const project = result.find((item) => item.id === edited.id);
  assert.equal(project.slug, 'new-project-url');
  assert.equal(project.summary, '');
  assert.equal(project.images.length, 0);
  assert.equal(project.featuredOrder, null);
});

test('adds new projects and retains hidden records for administrators', () => {
  const added = { ...clone(original[0]), id: 'new-project', slug: 'new-project', isVisible: false, sortOrder: 100 };
  const result = catalog.sortProjects([...original, added]);
  assert.equal(result.length, 11);
  assert.equal(result.at(-1).id, 'new-project');
  assert.equal(result.filter((item) => item.isVisible).length, 10);
});

test('rejects unsafe image and link protocols', () => {
  for (const src of ['javascript:alert(1)', 'data:text/html,test', '//example.com/x.png']) assert.equal(validation.isImageSource(src), false);
  assert.equal(validation.isImageSource('/project/1.png'), true);
  assert.equal(validation.isImageSource('https://images.example.com/a.png'), true);
  assert.equal(validation.isProjectLink('javascript:alert(1)'), false);
  const project = clone(original[0]);
  project.images = ['javascript:alert(1)'];
  assert.throws(() => validation.validateProject(project));
});

test('rejects duplicate slugs, malformed slugs, and invalid sort orders', async () => {
  const project = clone(original[0]);
  project.slug = '../private';
  assert.throws(() => validation.validateProject(project));
  project.slug = original[1].slug;
  const api = actions();
  assert.equal((await api.saveProject(project)).success, false);
  assert.equal(api.writes.length, 0);
  project.slug = original[0].slug;
  project.sortOrder = -1;
  assert.throws(() => validation.validateProject(project));
});

test('validates rich documents and strips unknown image attributes', () => {
  const project = clone(original[0]);
  project.content = { type: 'doc', content: [{ type: 'image', attrs: { src: '/project/1.png', onerror: 'alert(1)' } }] };
  const result = validation.validateProject(project);
  assert.equal(result.content.content[0].attrs.onerror, undefined);
  project.content = { type: 'doc', content: [{ type: 'text', text: 'click', marks: [{ type: 'link', attrs: { href: 'javascript:alert(1)' } }] }] };
  assert.throws(() => validation.validateProject(project));
  let nested = { type: 'paragraph', content: [] };
  for (let index = 0; index < 25; index++) nested = { type: 'blockquote', content: [nested] };
  project.content = { type: 'doc', content: [nested] };
  assert.throws(() => validation.validateProject(project));
});

test('renders project text safely and omits unsafe images', () => {
  const { ProjectContent } = load('src/components/project-content.tsx', { '@/lib/projects.validation': validation });
  const html = renderToStaticMarkup(React.createElement(ProjectContent, { content: { type: 'doc', content: [
    { type: 'paragraph', content: [{ type: 'text', text: '<script>alert(1)</script>' }] },
    { type: 'image', attrs: { src: 'javascript:alert(1)' } },
  ] } }));
  assert(html.includes('&lt;script&gt;'));
  assert(!html.includes('<script>'));
  assert(!html.includes('javascript:'));
});

test('unauthenticated saves and missing storage never write or claim success', async () => {
  for (const options of [{ authenticated: false }, { ready: false }]) {
    const api = actions(options);
    assert.equal((await api.saveProject(original[0])).success, false);
    assert.equal(api.writes.length, 0);
    assert.equal(api.invalidated.length, 0);
  }
});

test('saves complete edits including multiple images and invalidates old/new public routes', async () => {
  const project = { ...clone(original[0]), slug: 'updated-cozzy', name: 'Updated name', images: ['/project/1.png', '/project/2.png'], content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'The project story.' }] }] } };
  const api = actions();
  const result = await api.saveProject(project);
  assert.equal(result.success, true);
  assert.equal(api.writes[0].images.length, 2);
  assert.equal(api.writes[0].content.content[0].content[0].text, 'The project story.');
  for (const route of ['/', '/projects', '/projects/cozzy-corner', '/projects/updated-cozzy', `/admin/projects/${project.id}`]) assert(api.invalidated.includes(route));
});

test('write failures return errors and do not invalidate public content', async () => {
  const api = actions({ failWrite: true });
  assert.equal((await api.saveProject(original[0])).success, false);
  assert.equal(api.invalidated.length, 0);
});

function repository({ rows = [], configured = true, failRead = false } = {}) {
  let reads = 0;
  const api = load('src/lib/projects.repository.ts', {
    'server-only': {}, react: { cache: (fn) => fn },
    '@/dbConfig/dbConfig': { db: { select: () => ({ from: async () => {
      reads++;
      if (failRead) throw new Error('Missing table');
      return rows;
    } }) } },
    '../../db/schema': { projectTable: {} }, './projects.catalog': catalog,
  }, configured ? { DATABASE_URL: 'postgres://test' } : {});
  return { ...api, reads: () => reads };
}

test('database records are the only source and cleared fields stay cleared', async () => {
  const edited = { ...clone(original[0]), summary: '', images: [], content: { type: 'doc', content: [] }, createdAt: 'timestamp', updatedAt: 'timestamp' };
  const api = repository({ rows: [edited] });
  const state = await api.getProjectCatalog();
  assert.equal(state.storageReady, true);
  assert.equal(state.projects.length, 1);
  assert.equal(state.projects[0].summary, '');
  assert.equal(state.projects[0].images.length, 0);
  assert.equal('createdAt' in state.projects[0], false);
  assert.equal(await api.getProjectBySlug(original[1].slug), undefined);
});

test('an empty project table stays empty instead of restoring backup records', async () => {
  const api = repository();
  assert.equal((await api.getProjectCatalog()).storageReady, true);
  assert.equal((await api.getPublicProjects()).length, 0);
  assert.equal(await api.getProjectBySlug(original[0].slug), undefined);
});

test('hidden database projects stay in admin catalog and are excluded from public pages', async () => {
  const hidden = { ...clone(original[0]), isVisible: false };
  const api = repository({ rows: [hidden, original[1]] });
  assert.equal((await api.getProjectCatalog()).projects.length, 2);
  assert.equal((await api.getPublicProjects()).length, 1);
  assert.equal(await api.getProjectBySlug(hidden.slug), undefined);
});

test('unavailable storage does not use the backup or silently generate empty public pages', async () => {
  for (const settings of [{ failRead: true }, { configured: false }]) {
    const api = repository(settings);
    const state = await api.getProjectCatalog();
    assert.equal(state.storageReady, false);
    assert.equal(state.projects.length, 0);
    await assert.rejects(api.getPublicProjects(), /Project storage is unavailable/);
    await assert.rejects(api.getProjectBySlug(original[0].slug), /Project storage is unavailable/);
    if (settings.configured === false) assert.equal(api.reads(), 0);
  }
});

function uploadApi(authenticated, env = {}) {
  const signed = [];
  const api = load('src/app/api/projects/upload/route.ts', {
    '@/lib/admin-auth': { isAdminAuthenticated: async () => authenticated },
    'next/server': { NextResponse: { json: (body, options = {}) => new Response(JSON.stringify(body), { status: options.status || 200 }) } },
    '@aws-sdk/client-s3': { S3Client: class {}, PutObjectCommand: class { constructor(input) { this.input = input; } } },
    '@aws-sdk/s3-request-presigner': { getSignedUrl: async (_, command) => { signed.push(command.input); return 'https://signed.example.com'; } },
  }, env);
  return { ...api, signed };
}
const uploadRequest = (body, origin) => new Request('http://localhost/api/projects/upload', { method: 'POST', headers: { host: 'localhost', ...(origin ? { origin } : {}) }, body: JSON.stringify(body) });

test('uploads reject anonymous users, foreign origins, invalid types, and oversized files', async () => {
  const anonymous = uploadApi(false);
  assert.equal((await anonymous.POST(uploadRequest({ fileType: 'image/png', fileSize: 10 }))).status, 401);
  const api = uploadApi(true);
  assert.equal((await api.POST(uploadRequest({ fileType: 'image/png', fileSize: 10 }, 'https://foreign.example.com'))).status, 403);
  assert.equal((await api.POST(uploadRequest({ fileType: 'text/html', fileSize: 10 }))).status, 400);
  assert.equal((await api.POST(uploadRequest({ fileType: 'image/png', fileSize: 11 * 1024 * 1024 }))).status, 400);
  assert.equal(api.signed.length, 0);
});

test('authenticated uploads use the actual image type and the configured bucket URL', async () => {
  const api = uploadApi(true, { NEXT_PUBLIC_S3_REGION: 'test-region', NEXT_PUBLIC_S3_BUCKET_NAME: 'test-bucket', NEXT_PUBLIC_S3_ACCESS_KEY: 'test-key', NEXT_S3_SECRET_KEY: 'test-secret' });
  const response = await api.POST(uploadRequest({ fileType: 'image/png', fileSize: 100 }));
  assert.equal(response.status, 200);
  assert.equal(api.signed[0].ContentType, 'image/png');
  assert(api.signed[0].Key.startsWith('personal/v1/projects/'));
  const data = await response.json();
  assert(data.imageUrl.startsWith('https://test-bucket.s3.test-region.amazonaws.com/'));
});
