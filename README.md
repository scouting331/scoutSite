# The Scouting Units of American Legion Post 331

This repository hosts the content for the Website for the Scouting Units of
American Legion Post 331.

## Updating Site

### Homepage

Other than images, the homepage should stay fairly static.

#### Carousel

The carousel pictures are stored in `/static/img/carousel/`. The files shall be
jpg images. When replacing pictures, keep the names the same (older photos are
automatically archived in the git repo).

#### Feature Cards

The feature card pictures are stored in `/static/img/feature-cards/`. The files
should be jpg images. When replacing the pictures, keep the name the same.

### Docs

Each unit has its own docs locations. All of these are "markdown" files. Adding
documents is as simple as adding the new markdown file to the folder in
`/unit-docs/` directory.

### Blog

These are also all markdown files. Blog files shall be named
"Y-M-D-blog_title.mdx". Tags can be added to associate it with a particular
unit.

## List of TODOs

- [ ] Determine list of domains (subdomains can also be used)

### Homepage TODOs

- [ ] Determine what links should be in navbar
- [ ] Better formatting of navbar Title
- [ ] Blurbs for each unit below feature cards
- [ ] Fill out calendar with all units
  - [ ] Determine best display template
- [ ] Determine best pictures
- [ ] Work on footer links and information
  - [ ] Should there be a link to our 501(c)(3)?

### Join Us Page TODOs

- [ ] Layout improvement
- [ ] Markers on map (may need actual domain before this can be fixed)

### Docs pages TODOs

- [ ] About page content for all units
- [ ] Collect content for all units that they want displayed
- [ ] Determine organization (what docs should be in general category)
