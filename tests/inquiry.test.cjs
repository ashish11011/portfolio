const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function inquiry({ configured = true, failWrite = false } = {}) {
  const module = { exports: {} };
  const writes = [], invalidated = [];
  const output = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../src/app/api/inquiry/route.ts'), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
  }).outputText;
  const mocks = {
    'next/server': { NextResponse: { json: (data, options) => Response.json(data, options) } },
    'next/cache': { revalidatePath: (path) => invalidated.push(path) },
    '@/dbConfig/dbConfig': { db: { insert: () => ({ values: async (data) => {
      if (failWrite) throw new Error('Database unavailable');
      writes.push(data);
    } }) } },
    '../../../../db/schema': { blogForm: {} },
  };
  vm.runInNewContext(output, {
    module, exports: module.exports, process: { env: configured ? { DATABASE_URL: 'test-only' } : {} },
    require: (id) => mocks[id],
  });
  const submit = (data) => module.exports.POST(new Request('http://localhost/api/inquiry', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  }));
  return { ...module.exports, submit, writes, invalidated };
}

test('stores a trimmed email and message together and refreshes the admin view', async () => {
  const api = inquiry();
  const response = await api.submit({ email: ' visitor@example.com ', message: ' I need a web app. ' });
  assert.equal(response.status, 200);
  assert.equal(api.writes.length, 1);
  assert.equal(api.writes[0].email, 'visitor@example.com');
  assert.equal(api.writes[0].message, 'I need a web app.');
  assert.deepEqual(api.invalidated, ['/admin', '/admin/messages']);
});

test('contact submissions retain the trimmed name with email and message', async () => {
  const api = inquiry();
  const response = await api.submit({ name: ' Visitor ', email: ' visitor@example.com ', message: ' Hello from the contact form. ' });
  assert.equal(response.status, 200);
  assert.equal(api.writes[0].name, 'Visitor');
  assert.equal(api.writes[0].email, 'visitor@example.com');
  assert.equal(api.writes[0].message, 'Hello from the contact form.');
  assert(api.invalidated.includes('/admin/messages'));
});

test('invalid email, empty or oversized messages, and malformed JSON never write', async () => {
  const api = inquiry();
  for (const data of [null, [], {}, { email: 'bad-email', message: 'Hello' },
    { email: 'a@example.com', message: '  ' }, { email: 'a@example.com', message: 'x'.repeat(5001) },
    { email: 'x'.repeat(255) + '@example.com', message: 'Hello' }, { email: 'a@example.com', message: 123 },
    { name: 123, email: 'a@example.com', message: 'Hello' }, { name: ' ', email: 'a@example.com', message: 'Hello' },
    { name: 'x'.repeat(201), email: 'a@example.com', message: 'Hello' }]) {
    assert.equal((await api.submit(data)).status, 400);
  }
  assert.equal((await api.POST(new Request('http://localhost/api/inquiry', { method: 'POST', body: '{' }))).status, 400);
  assert.equal(api.writes.length, 0);
});

test('missing storage reports unavailability without claiming success', async () => {
  const api = inquiry({ configured: false });
  assert.equal((await api.submit({ email: 'a@example.com', message: 'Hello' })).status, 503);
  assert.equal(api.writes.length, 0);
  assert.equal(api.invalidated.length, 0);
});

test('write failures return an error and do not refresh or claim receipt', async () => {
  const api = inquiry({ failWrite: true });
  const response = await api.submit({ email: 'a@example.com', message: 'Hello' });
  assert.equal(response.status, 500);
  assert.match((await response.json()).message, /Couldn’t save/);
  assert.equal(api.invalidated.length, 0);
});
