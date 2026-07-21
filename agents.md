# American Legion Post 331 Scouting Units - Docusaurus Site Context

> System architecture and formatting rules for LLMs contributing to this
> repository.

## Project Profile

- **Stack:** Docusaurus v3+, React, MDX, JavaScript/TypeScript, Python.
- **Audience:** Scouting America members, parents, and leaders.
- **Design Core:** Custom theme using Scouting America branding
  (Khaki/Blue/Red).
- **Dark Mode:** Explicitly disabled. Code must only support light mode.
- **Source Code:** Hosted at `https://github.com/scouting331/scoutSite`.
- **Hosting & CI/CD:** Built automatically by a worker on commit and deployed to
  `https://brownsburgscouts.org`.
- **Maintenance Philosophy:** Built with extensive automations and thorough
  commenting so young youth Scouts with limited coding abilities can easily
  maintain the site, while remaining structured cleanly for a seamless future
  handoff to experienced adult coders.

## Maintainer Audience

- **Primary maintainers:** Youth Scout members.
- **Experience range:** Contributors may have no coding background, beginner
  experience, or intermediate/advanced skills.
- **Authoring rule:** Prefer straightforward patterns, clear naming, and
  predictable structure over clever abstractions unless complexity is required.
- **Handoff rule:** Changes should be easy for first-time Scout contributors to
  read, test, and safely modify.

## Organization Profile & Unit Context

- **Sponsor:** Chartered by American Legion Post 331 in Brownsburg, IN.
- **Core Mission:** Developing tomorrow's leaders through character building,
  citizenship training, and personal fitness.
- **Pack 303:** Co-ed Cub Scout Pack for elementary youth (Grades K-5). Focuses
  on family camping, foundational leadership skills, and advancement. Meets
  weekly during the school year at Eagle Elementary in Brownsburg, IN.
- **Troop 331:** Scouts BSA Girls Troop (Ages 11-17). Focuses on youth-led
  leadership and life preparation to build tomorrow's female leaders. The
  ultimate achievement for these Scouts is the rank of Eagle.
- **Troop 303:** Scouts BSA Boys Troop (Ages 11-17), known as "The Legendary
  Troop 303". Focuses on outdoor adventure and intensive leadership development
  to prepare young men for future success. The ultimate achievement for these
  Scouts is the rank of Eagle Scout.
- **Crew 303:** Co-ed Venturing Crew for older youth (Ages 14-20). Focuses on
  high adventure, high-intensity camping, and advanced youth independence,
  continuing the mission of peer leadership.

## Codebase Map & Router Configurations

### Content Plugins (Multi-Instance Docs)

This site uses multiple instances of the Docusaurus docs plugin.

- `/docs/`: Main instance. Core Scouting unit documents and shared files. Uses
  `sidebarDocs.js`.
- `/cookbook/`: Custom instance. Camping recipes ecosystem. Uses
  `sidebarCookbook.js`.

### Blogs & Components

- `/blog/`: Unit activity updates. Cross-referenced via `/blog/authors.yml` and
  `/blog/tags.yml`.
- `/src/pages/`: Main entry point and unit-specific landing pages.
- `/src/components/[ComponentName]/index.jsx`: Modular UI components. Optional
  localized `styles.module.css` inside the same folder.
- `/static/`: Shared media assets (images, PDFs). Reference using absolute paths
  (e.g., `/img/logo.png`).
- `/src/css/custom.css`: Target file for global font and CSS variable overrides.

## Strict Code Conventions

### Frontmatter Definitions

AI must generate frontmatter matching these strict schemas:

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

_Allowed tags in `tags.yml`:_ `troop-303`, `troop-331`, `pack-303`, `crew-303`.

#### MDX Pages (`/src/pages/`)

```yaml
description: "SEO description"
hide_table_of_contents: true
```

### Component & Markup Rules

- **Formatting:** All narrative content must use `.mdx` extensions. Custom
  components must use `.jsx`.
- **Built-ins:** Always default to native `<Admonition>`, `<Tabs>`, and
  `<TabItem>` components.
- **Custom HTML:** Never write raw inline HTML in markdown. Wrap HTML into a
  reusable component in `/src/components/`.
- **Modification:** Never modify `node_modules`. Use `npm run swizzle` for
  layout overrides.

## CLI Core Commands

- **Local Dev:** `npm run start`
- **Production Build:** `npm run build`
- **Serve Built Site:** `npm run serve`
- **Clear Generated Artifacts:** `npm run clear`

## Performance & Copy Guidance

- **Quick-loading pages:** Prioritize fast page rendering and avoid large client-side bundles on landing pages.
- **Concise messaging:** Keep homepage copy short and direct so visitors immediately understand our units and how to join.
- **Image loading:** Use `loading="lazy"` and `decoding="async"` for non-critical images to improve page speed.

## AI Commenting & Documentation Standards

Generated code (JavaScript, JSX, Python, Bash) should prioritize clarity and
beginner readability. The codebase serves as a learning tool for young Scouts;
assume many readers are new to coding.

### Mandatory Structure for Code Files

#### 1. JSX / React Components (`.jsx`)

- **Module Level:** A detailed block comment at the top explaining the
  component's purpose, its visual location on the site, and any props it
  accepts.
- **Inline Comments:** Explain _why_ for non-obvious hooks, conditions, and
  mappings. Avoid noisy comments for obvious one-line assignments.

```jsx
/**
 * AnnouncementsWidget Component
 *
 * Purpose: Displays a list of recent unit updates on the landing page.
 * Audience: Pack 303 / Troop 303 parents looking for schedules.
 * Props:
 *   - limit (Number): Max number of posts to display.
 */
import React from "react";

export default function AnnouncementsWidget({ limit = 3 }) {
  // Step 1: Set up a state variable to hold the blog posts we fetch
  const [posts, setPosts] = React.useState([]);

  return (
    <div className="announcement-container">
      {/* Loop through each post item and convert it into a visual card */}
      {posts.slice(0, limit).map((post) => (
        <div key={post.id} className="post-card">
          <h4>{post.title}</h4>
        </div>
      ))}
    </div>
  );
}
```

#### 2. Python Scripts (`.py`)

- **Module Level:** Google-style module docstring outlining the script's global
  role in the site's automations.
- **Function Level:** Clear docstrings defining `Args` and `Returns` explicitly.
- **Inline Comments:** Explain intent for non-obvious logic and edge cases.

```python
"""Calendar Sync Automation.

This script pulls events from the American Legion Post 331 Google Calendar
and formats them into Markdown files for the Docusaurus site schedule.
"""

def parse_calendar_event(event_data):
    """Extracts date, time, and unit details from a raw calendar object.

    Args:
        event_data (dict): The raw JSON object returned by the Calendar API.

    Returns:
        dict: A cleaned dictionary containing 'title', 'date', and 'target_unit'.
    """
    # Initialize an empty dictionary to safely structure our clean data
    cleaned_event = {}

    # Extract the summary line (e.g., "Pack 303 Blue & Gold Banquet")
    cleaned_event['title'] = event_data.get('summary', 'Untitled Event')

    return cleaned_event
```

### Strict LLM Rules for Code Generation

1. **Explain the "Why" for Non-Obvious Logic:** Prefer comments where intent,
  tradeoffs, or edge cases are not immediately clear.
2. **Avoid Comment Noise:** Do not add comments that restate obvious code.
3. **Explain the "Why", Not Just the "What":** Instead of writing
   `# sets x to 5`, write
   `# Set the fallback limit to 5 so the page doesn't break if the API fails`.
4. **Use Simple Analogies Sparingly:** When explaining complex coding patterns (like git
   filters or regex parsing), include a one-sentence conceptual analogy in the
   comment block.

## Scout & Leader Local Execution Guide

Detailed contributor runbooks are maintained in [CONTRIBUTING.md](CONTRIBUTING.md).
Keep this file focused on agent behavior and coding constraints.

### Quick Contributor Commands

- Python tools setup: `pip install -r scripts/requirements.txt`
- Frontend dependencies: `npm install`
- Local development: `npm run start`
- Production build check: `npm run build`

## Contributor Runbooks

Detailed onboarding, local setup, troubleshooting, and Git workflow instructions
for Scouts and leaders are intentionally centralized in
[CONTRIBUTING.md](CONTRIBUTING.md) to avoid duplication and drift.
