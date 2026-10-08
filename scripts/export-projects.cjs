const fs = require('node:fs/promises');
const path = require('node:path');
const postgres = require('postgres');
require('@next/env').loadEnvConfig(process.cwd());

async function main() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required.');
  const sql = postgres(process.env.DATABASE_URL, { max: 1, connect_timeout: 10, idle_timeout: 1 });
  let projects;
  try {
    projects = await sql`select id, slug, name, description, summary, features, technologies, images, website, logo, content,
      featured_order as "featuredOrder", sort_order as "sortOrder", is_visible as "isVisible" from project`;
  } finally { await sql.end({ timeout: 2 }); }
  projects.sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
  const destination = path.join(process.cwd(), 'exports/projects.json');
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, `${JSON.stringify(projects, null, 2)}\n`);
  console.log(JSON.stringify({ file: 'exports/projects.json', exportedProjects: projects.length }));
}

main().catch((error) => {
  console.error(`Project export failed (${error.code || error.name}). No existing export was replaced.`);
  process.exitCode = 1;
});
