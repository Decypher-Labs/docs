# DecypherLabs Docs

A modern docs, blog, and courses site built with **Next.js 16**, **Tailwind CSS 4**, and Markdown. Use it to publish reference docs, blog posts, and structured courses—all from `static/` and optional YAML config.

## Features

- **Docs** — Reference guides from `static/docs/` (folders + `.md` files). Optional per-section and per-file config for titles, descriptions, keywords, and “Updated” dates.
- **Blogs** — Posts from `static/blogs/*.md` with optional card overrides and keywords in `config.yaml`.
- **Courses** — Multi-lesson courses from `static/courses/<course>/` with configurable titles and lesson order.
- **Search** — ⌘K over docs, blogs, and courses with keyword filters.
- **Theme** — Light/dark mode with system preference support.
- **Responsive** — Mobile-friendly layout with collapsible sidebar and scroll-to-top.
- **Docker** — Production image via multi-stage Dockerfile and Next.js `standalone` output.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
static/
├── docs/           # Reference docs
│   ├── config.yaml           # Section titles, descriptions, keywords (slug = folder name)
│   └── 01_docker/            # One folder per topic
│       ├── config.yaml       # Optional: file titles and "updated" dates (slug = filename without .md)
│       ├── 01_intro.md
│       └── 02_dockerfile.md
├── blogs/          # Blog posts
│   ├── config.yaml           # Overrides: heading, excerpt, keywords, updated (slug = filename without .md)
│   └── getting-started.md
└── courses/        # Courses (one folder per course)
    ├── config.yaml           # Course cards: heading, description, keywords (slug = folder name)
    └── 01_html/
        ├── config.yaml       # Optional: lesson file/slug/heading/updated
        ├── 01_intro.md
        └── 02_elements.md
```

Content is discovered from the filesystem; `config.yaml` files are optional and only override defaults (e.g. titles derived from filenames).

## Config reference

### `static/docs/config.yaml`

- **slug** — Folder name (e.g. `01_docker`).
- **heading** — Display name for the section.
- **description** — Short blurb for cards.
- **keywords** — Used for search and filters.

### `static/docs/<folder>/config.yaml` (per folder)

- **files** — List of `slug`, optional **heading**, optional **updated** (ISO date).

### `static/blogs/config.yaml`

- **blogs** — List of entries keyed by **slug** (filename without `.md`).
- **heading**, **description**, **excerpt**, **keywords**, **updated** (ISO date).

### `static/courses/config.yaml`

- **courses** — List of **slug** (folder name, e.g. `html` for `01_html`), **heading**, **description**, **keywords**.

### `static/courses/<folder>/config.yaml` (per course)

- **files** — List of **file** (filename without `.md`), **slug** (URL slug), optional **heading**, optional **updated** (ISO date).

## Scripts

| Command        | Description                |
|----------------|----------------------------|
| `npm run dev`  | Start dev server           |
| `npm run build`| Production build            |
| `npm run start`| Run production server       |
| `npm run lint` | Run ESLint                  |

## Docker

Build and run:

```bash
docker build -t docs .
docker run -p 3000:3000 docs
```

Port mapping options go before the image name, e.g. `docker run -p 4000:3000 docs`.

## Deployment

- **Vercel / Netlify** — Connect the repo; build command `npm run build`, output is the default Next.js app.
- **Self-hosted** — Use the Dockerfile or run `npm run build && npm run start` behind a reverse proxy.

## Customization

- **Site links** — Edit `lib/site-config.ts` for GitHub org, repo URL, and Buy Me a Coffee.
- **Theme** — Colors and CSS variables in `app/globals.css` (`:root` and `.dark`).

## License

Same as the parent organization.
