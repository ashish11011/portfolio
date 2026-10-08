const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function load(file, mocks = {}, env = {}) {
  const module = { exports: {} };
  const output = ts.transpileModule(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
  }).outputText;
  vm.runInNewContext(output, {
    module, exports: module.exports, process: { env }, URL,
    require: (id) => mocks[id],
  });
  return module.exports;
}

function gates(values, env = { ADMIN_TOKEN: 'test-secret' }) {
  const token = load('src/lib/admin-token.ts', {}, env);
  const cookies = { get: (name) => values[name] === undefined ? undefined : { value: values[name] } };
  const server = load('src/lib/admin-auth.ts', {
    'server-only': {}, 'next/headers': { cookies: async () => cookies }, './admin-token': token,
  });
  const proxy = load('src/proxy.ts', {
    '@/lib/admin-token': token,
    'next/server': { NextResponse: { next: () => ({ allowed: true }), redirect: (url) => ({ allowed: false, path: url.pathname }) } },
  });
  return { server, proxy: () => proxy.proxy({ cookies, url: 'http://localhost:3000/admin/projects' }) };
}

test('admintoken and legacy token authenticate both proxy and server-side gates', async () => {
  for (const name of ['admintoken', 'token']) {
    const api = gates({ [name]: 'test-secret' });
    assert.equal(api.proxy().allowed, true);
    assert.equal(await api.server.isAdminAuthenticated(), true);
  }
});

test('missing, wrong, empty, or differently named cookies fail both gates', async () => {
  for (const cookies of [{}, { admintoken: 'wrong' }, { token: '' }, { ADMIN_TOKEN: 'test-secret' }, { adminToken: 'test-secret' }]) {
    const api = gates(cookies);
    assert.equal(api.proxy().allowed, false);
    assert.equal(api.proxy().path, '/');
    assert.equal(await api.server.isAdminAuthenticated(), false);
  }
});

test('a stale alias cannot block a valid legacy cookie', async () => {
  const api = gates({ admintoken: 'stale', token: 'test-secret' });
  assert.equal(api.proxy().allowed, true);
  assert.equal(await api.server.isAdminAuthenticated(), true);
});

test('configured ADMIN_TOKEN overrides the existing default for both cookie names', async () => {
  for (const name of ['admintoken', 'token']) {
    const fallback = gates({ [name]: 'Ashish.ab1' }, {});
    assert.equal(fallback.proxy().allowed, true);
    assert.equal(await fallback.server.isAdminAuthenticated(), true);
    const overridden = gates({ [name]: 'Ashish.ab1' });
    assert.equal(overridden.proxy().allowed, false);
    assert.equal(await overridden.server.isAdminAuthenticated(), false);
  }
});
