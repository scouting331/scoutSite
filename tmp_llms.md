# American Legion Post 331 Scouting Units - Docusaurus Site Context

> System architecture and formatting rules for LLMs contributing to this repository.

## Project Profile
- **Stack:** Docusaurus v3+, React, MDX, JavaScript/TypeScript, Python.
- **Audience:** Scouting America members, parents, and leaders.
- **Design Core:** Custom theme using Scouting America branding (Khaki/Blue/Red). 
- **Dark Mode:** Explicitly disabled. Code must only support light mode.

## Codebase Map & Router Configurations

### Content Plugins (Multi-Instance Docs)
This site uses multiple instances of the Docusaurus docs plugin. 
- `/docs/`: Main instance. Core Scouting unit documents and shared files. Uses `sidebarsDocs.js`.
- `/cookbook/`: Custom instance. Camping recipes ecosystem. Uses `sidebarCookbook.js`.

### Blogs & Components
- `/blog/`: Unit activity updates. Cross-referenced via `/blog/authors.yml` and `/blog/tags.yml`.
- `/src/pages/`: Main entry point and unit-specific landing pages.
- `/src/components/[ComponentName]/index.jsx`: Modular UI components. Optional localized `styles.module.css` inside the same folder.
- `/static/`: Shared media assets (images, PDFs). Reference using absolute paths (e.g., `/img/logo.png`).
- `/src/css/custom.css`: Target file for global font and CSS variable overrides.

## Strict Code Conventions

### Frontmatter Definitions
AI must generate frontmatter matching these strict JSON schemas:

#### Docs & Cookbook (`/docs/`, `/cookbook/`)
```yaml
title: "Page Title"
description: "SEO description under 160 chars"
```

#### Blog Posts (`/blog/`)
```yaml
title: "Post Title"
date: YYYY-MM-DD
authors: [author_key_from_authors_yml]
tags: [unit_tag_from_tags_yml]
```

#### MDX Pages (`/src/pages/`)
```yaml
description: "SEO description"
hide_table_of_contents: true
```

### Component & Markup Rules
- **Formatting:** All narrative content must use `.mdx` extensions. Custom components must use `.jsx`.
- **Built-ins:** Always default to native `<Admonition>`, `<Tabs>`, and `<TabItem>` components.
- **Custom HTML:** Never write raw inline HTML in markdown. Wrap HTML into a reusable component in `/src/components/`.
- **Modification:** Never modify `node_modules`. Use `npm run swizzle` for layout overrides.

## CLI Core Commands
- **Local Dev:** `npm run start`
- **Code Storage:** The code is stored and version controlled in a Github
  repository at https://github.com/scouting331/scoutSite
- **Site Hosting:** After a pull request, a worker builds the site for
  hosting on Cloudflare at https://brownsburgscouts.org
