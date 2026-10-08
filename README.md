🌐 Ashish Bishnoi - Personal Portfolio

This is my personal portfolio built with Next.js, Tailwind CSS, and TypeScript.
It highlights my skills, projects, testimonials, freelancing work, and provides an easy way to download my resume or contact me.

🚀 Tech Stack

Next.js 16.4
React
Tailwind CSS
TypeScript
Shadcn/UI
Framer Motion
Cloudflare R2 / Vercel Deployments

✨ Features
🧑‍💻 About Me Section
📁 Featured Projects
🛠️ Freelancing Work Showcase
⭐ Testimonials
📄 Resume

🎨 Clean, modern UI with smooth animations

🧩 Getting Started
Use Node.js 24. If you use nvm, run `nvm install` and `nvm use` to select the version in `.nvmrc`.

Install dependencies:

npm install
\
or
\
yarn install
\
or
\
pnpm install
\
or
\
bun install



Run the development server:

npm run dev


Open http://localhost:3000
 to view the site.

📂 Project Structure\
app/\
 ├── components/       # UI components\
 ├── sections/         # Homepage sections\
 ├── projects/         # Project pages & data\
 ├── api/              # Server actions / API routes\
 ├── styles/           # Global styles\
 └── page.tsx          # Home page

📦 Deployment

This portfolio is deployed using Vercel.
To deploy your own version:

Push the project to GitHub
Connect the repository to Vercel
Configure environment variables

Use Node.js **24.x** in Vercel's **Project Settings → Build and Deployment → Node.js Version**. The `engines.node` value in `package.json` also selects Node.js 24 for new deployments. Deploy the updated commit for this setting to take effect.

🤝 Contributing

This is a personal project, but suggestions and feedback are welcome.
Feel free to open an issue or submit improvements.

📬 Contact

If you'd like to collaborate or get in touch:

Portfolio: https://ashishbishnoi.com
Email: bishnoi11011@gmail.com

### Project pages and editing

- `/projects` lists all projects; `/projects/[slug]` shows each project's details, gallery, highlights, technologies, and rich content.
- Open **Manage projects** from `/admin`, or visit `/admin/projects`. Add a project or edit any existing project's fields, URL slug, images, content, visibility, and display order.
- Admin pages, project saves, and image uploads accept a cookie named `admintoken` or the original `token`, with path `/`. The value must match `ADMIN_TOKEN` if configured, otherwise the existing fallback in `src/lib/admin-token.ts`. Set the cookie on the exact host you visit (`localhost` and `127.0.0.1` have separate cookies).
- The `project` table is defined in `db/schema.ts`. `DATABASE_URL` and an available table are required for saving. This change only defines the schema: it does not generate SQL, apply the schema, or run migrations.
- All public and admin project pages read exclusively from the `project` table through `src/lib/projects.repository.ts`. There is no project file fallback. `exports/projects.json` is a downloadable backup containing all 10 projects, including image arrays and rich content; it is not imported by the website.
- `npm run projects:export` refreshes the JSON backup from the project table. `npm run projects:import` validates the backup and inserts missing records in a transaction, preserving existing records. These scripts do not create tables, generate SQL files, or run schema migrations.
- Gallery images remain arrays. Add URLs/local paths, upload several images, reorder them, or remove them from the gallery. Removing a gallery entry does not delete the stored image file.
- Uploads use the existing S3 region, bucket, access-key, and secret-key environment variables. Optional `S3_PUBLIC_URL` sets the public asset base URL. Uploads allow JPG, PNG, WebP, GIF, and AVIF files up to 10 MB each; existing image URLs work without S3 upload configuration.
- Rich content is stored as structured editor JSON and rendered as React elements. Saves validate URLs, document structure, unique slugs, and admin access.
- Run `npm run test:projects` for isolated catalog, validation, authorization, save, and upload checks. These tests do not connect to a database or upload files.

### Static pages and SEO

- Home, projects, blog listings, and every published project/blog detail page are statically generated. `generateStaticParams` includes all visible detail pages at build time. Blog pagination uses crawlable `/blog/page/2` URLs, with `/blog` as page 1.
- Admin saves invalidate the affected static pages and sitemap. New slugs are generated and cached on their first visit, so publishing new content does not require a redeploy. A daily regeneration interval also picks up changes made directly in the database.
- The build needs access to the configured database to include projects and published blogs. Unavailable project storage or a failed configured blog database read fails static generation instead of publishing an empty archive. The admin project page reports unavailable storage; it does not restore projects from a local file.
- Public pages include unique titles, descriptions, canonical URLs, Open Graph/Twitter cards, and structured data for the portfolio, project collections, individual projects, and articles. `NEXT_PUBLIC_BASE_URL` sets the canonical site origin and defaults to `https://www.ashishbuilds.in`. Set the same value in Vercel so sitemap URLs and canonical tags use the final domain after redirects.
- Hidden content is excluded from public pages and the sitemap. Admin pages are marked `noindex`, and robots permits crawling public images.
- Run `npm run test:seo` to check metadata, safe structured data, published-blog selection, and invalidation after blog saves and visibility changes, without connecting to the database.

### Portfolio inquiries

- The homepage CTA accepts an email and message. `/api/inquiry` validates and stores both together in the existing `blogForm` table; no schema change is needed. It does not add inquiries to the newsletter subscriber list or send email.
- Read the latest inquiries in the **Messages** section of `/admin`. If storage fails, the form reports the error and retains the entered message.
- Resume and hero profile links are shared in `src/data/profile.ts`. Resume buttons use the existing Google Drive resume link.
- Run `npm run test:inquiry` to check valid submissions, malformed input, and storage failures with isolated storage mocks.
