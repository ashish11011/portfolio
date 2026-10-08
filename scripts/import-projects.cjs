const fs = require('node:fs/promises');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const postgres = require('postgres');
const { drizzle } = require('drizzle-orm/postgres-js');
const { inArray } = require('drizzle-orm');
require('@next/env').loadEnvConfig(process.cwd());

async function loadTypeScript(file) {
  const source = await fs.readFile(path.join(process.cwd(), file), 'utf8');
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 } }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(output, { module, exports: module.exports, require, URL });
  return module.exports;
}

async function main() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required.');
  const source = JSON.parse(await fs.readFile(path.join(process.cwd(), 'exports/projects.json'), 'utf8'));
  if (!Array.isArray(source) || !source.length) throw new Error('The project export must contain a nonempty array.');
  const { validateProject } = await loadTypeScript('src/lib/projects.validation.ts');
  const projects = source.map(validateProject);
  if (new Set(projects.map((project) => project.id)).size !== projects.length || new Set(projects.map((project) => project.slug)).size !== projects.length) {
    throw new Error('Duplicate project IDs or slugs in the export.');
  }
  const schema = await loadTypeScript('db/schema.ts');
  const sql = postgres(process.env.DATABASE_URL, { max: 1, connect_timeout: 10, idle_timeout: 1 });
  try {
    const db = drizzle(sql, { schema });
    const result = await db.transaction(async (transaction) => {
      // Preserve existing admin edits. Only insert missing records into the existing table.
      const inserted = await transaction.insert(schema.projectTable).values(projects).onConflictDoNothing().returning({ id: schema.projectTable.id });
      const stored = await transaction.select({ id: schema.projectTable.id }).from(schema.projectTable).where(inArray(schema.projectTable.id, projects.map((project) => project.id)));
      if (stored.length !== projects.length) throw new Error('A conflicting slug prevented an import. The transaction was rolled back.');
      return { inserted: inserted.length, retained: stored.length - inserted.length, verified: stored.length };
    });
    console.log(JSON.stringify(result));
  } finally { await sql.end({ timeout: 2 }); }
}

main().catch((error) => {
  console.error(`Project import failed (${error.code || error.name}). No schema changes or migrations were performed.`);
  process.exitCode = 1;
});
