/**
 * @file docusaurus.config.js
 * @description Master Node.js configuration schema engine for the American Legion Post 331 Scouting website.
 * Declares localized metadata paths, custom theme configurations, multi-instance plugin documentation paths 
 * (Standard Docs + Cookbooks), custom localized sitemap filtration schemes, and third-party tracking scripts.
 * 
 * @environment Node.js (Build-time compilation script)
 * @see {@link https://docusaurus.io/docs/api/docusaurus-config | Docusaurus Configuration API Documentation}
 */

import { themes as prismThemes } from "prism-react-renderer";

/**
 * Global configuration data schema structure for Docusaurus system operations.
 * 
 * @type {import('@docusaurus/types').Config}
 * @property {string} title - Primary core website branding text headline.
 * @property {string} tagline - SEO and card fallback metadata summary description block.
 * @property {Object} future - Flag registry optimizing compatibility properties with modern up-stream tools.
 * @property {Object} customFields - Storage object injecting custom corporate legal copyright labels into the runtime environment.
 * @property {Array<Array<string|Object>>} presets - Classic Docusaurus preset bundle setups handling theme layouts and core document paths.
 * @property {Array<Array<string|Object>>} plugins - Custom multi-instance document routes and isolated post processors parsing recent content folders.
 * @property {import('@docusaurus/types').ThemeConfig} themeConfig - The master styling architecture setting default light-modes, banners, nav bars, and HTML social links.
 */
const config = {
  title: "The Scouting Units of American Legion Post 331",
  tagline:
    "Scouting America Units Troop 303, Troop 331, Crew 303, and Pack 303 of Brownsburg, Indiana",
  favicon: "img/favicon.png",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://brownsburgscouts.org",
  baseUrl: "/",

  onBrokenLinks: "throw",
  onBrokenAnchors: "ignore",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  trailingSlash: false,

  customFields: {
    copyright1: `© ${new Date().getFullYear()} The Scouting Units of American Legion Post 331, Scouting America`,
    copyright2: `All Rights Reserved`,
  },

  presets: [
    [
      "classic",
      {
        blog: false,
        docs: {
          sidebarPath: "./sidebarsDocs.js",
          path: "unit-docs",
          routeBasePath: "unit-docs",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        sitemap: {
          lastmod: "date",
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes("/page/"));
          },
        },
      },
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "cookbook",
        path: "cookbook",
        routeBasePath: "cookbook",
        sidebarPath: "./sidebarsCookbook.js",
      },
    ],
    [
      "./plugins/recent-blog-posts",
      {
        blogTitle: "Adventures of our Scouts",
        blogDescription: "Stories of our recent adventures",
        blogSidebarTitle: "Recent Adventures",
        showReadingTime: true,
        onInlineTags: "warn",
        onInlineAuthors: "warn",
        onUntruncatedBlogPosts: "warn",
      }
    ],
  ],

  themeConfig: {
    image: "img/favicon.png",
    colorMode: {
      respectPrefersColorScheme: true,
      disableSwitch: true,
      defaultMode: "light",
    },
    announcementBar: {
      id: "demo_announcement",
      content: "WEBSITE STILL HEAVILY UNDER CONSTRUCTION!",
      backgroundColor: "var(--announcement-bar)",
      textColor: "var(--scouting-america-white)",
      isCloseable: false,
    },
    navbar: {
      title: "Scouting America",
      logo: {
        alt: "Scouting America Units",
        src: "img/all-units-logo.png",
      },
      items: [
        {
          type: "dropdown",
          label: "Unit Sites",
          position: "right",
          items: [
            { label: "Troop 303", to: "/unit-docs/troop-303" },
            { label: "Troop 331", to: "/unit-docs/troop-331" },
            { label: "Crew 303", to: "/unit-docs/crew-303" },
            { label: "Pack 303", to: "/unit-docs/pack-303" },
          ],
        },
        {
          to: "/blog",
          label: "Blog",
          position: "right",
        },
        {
          to: "/join-us",
          label: "Join Us",
          position: "right",
          className: "button button--secondary",
        },
      ],
      hideOnScroll: false,
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Quick Links",
          items: [
            {
              label: "Documents",
              to: "/unit-docs/general-info",
            },
            {
              label: "Blog",
              to: "/blog",
            },
          ],
        },
        {
          title: "Social Media",
          items: [
            {
              html: `
                <a href="https://www.youtube.com/@Scouting331" 
                  target=_blank rel="noreferrer noopener" 
                  aria-label="YouTube Channel"
                  class="footer__link-item">
                  <i class="fa-brands fa-youtube footer__link-logo" aria-hidden="true"></i>
                  YouTube Channel
                </a>
                `
            },
            {
              html: `
                <a href="https://www.facebook.com/groups/114681931900039" 
                  target=_blank rel="noreferrer noopener" 
                  aria-label="Troop 303 Facebook Page"
                  class="footer__link-item">
                  <i class="fa-brands fa-facebook footer__link-logo" aria-hidden="true"></i>
                  Troop 303
                </a>
                `
            },
            {
              html: `
                <a href="https://www.facebook.com/groups/177465650239377" 
                  target=_blank rel="noreferrer noopener" 
                  aria-label="Troop 331 Facebook Page"
                  class="footer__link-item">
                  <i class="fa-brands fa-facebook footer__link-logo" aria-hidden="true"></i>
                  Troop 331
                </a>
                `
            },
            {
              html: `
                <a href="https://www.facebook.com/groups/441282630057267" 
                  target=_blank rel="noreferrer noopener" 
                  aria-label="Pack 303 Facebook Page"
                  class="footer__link-item">
                  <i class="fa-brands fa-facebook footer__link-logo" aria-hidden="true"></i>
                  Pack 303
                </a>
                `
            },
            {
              html: `
                <a href="https://www.instagram.com/venturecrew.303" 
                  target=_blank rel="noreferrer noopener" 
                  aria-label="Venture Crew 303 Instagram Page"
                  class="footer__link-item">
                  <i class="fa-brands fa-instagram footer__link-logo" aria-hidden="true"></i>
                  Crew 303
                </a>
                `
            },
          ],
        },
        {
          title: "Contact Us",
          items: [
            {
              html: `
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                  <i class="fa-solid fa-location-dot footer__logo" aria-hidden="true"></i>
                  <address style="font-style: normal" class="footer__item">
                    American Legion Post 331<br />
                    636 E Main St<br />
                    Brownsburg, IN 46112
                  </address>
                </div>
                `
            },
            {
              html: `
                <a href="mailto:scoutingunits331@gmail.com?subject=Website%20Inquiry" style="font-style: normal" class="footer__link-item">
                  <div style="display: flex; align-items: flex-start; gap: 8px;">
                    <i class="fa-solid fa-at footer__link-logo" aria-hidden="true"></i>
                    Email Us
                  </div>
                </a>
                `
            },
          ],
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    mermaid: {
      options: {
        securityLevel: "loose",
      },
    },
    metadata: [
      {
        name: "keywords",
        content:
          "eagle scout, webelos, scouts bsa, boy scouts near me, sea scouts, scoutbook, Venture, bsa, Boy Scouts of America, cub scouts, scouts, kids events near me, kid friendly activities near me, fun places for kids near me, scout, boy scouts, Scouting America, Things to do with kids near me, Kids activities near me, kids activities, child development, kids fun near me, trails near me, crafts for kids, Tent camping near me, science experiments for kids, science projects for kids, stem for kids, Canoe, trails near me, hiking trails near me, all trails, campsites, walking trails near me, Camping, Campground, Hiking near me, Camping near me, campgrounds near me, hiking trails near me, Fishing, Swimming, Brownsburg scout troops, Brownsburg kids, find cub scouts near me, find boy scouts near me, find girl scouts near me",
      },
    ],
  },
  themes: ["@docusaurus/theme-mermaid"],
  markdown: {
    format: "mdx",
    mermaid: true,
    emoji: true,
    hooks: {
      onBrokenMarkdownLinks: "warn",
      onBrokenMarkdownImages: "throw",
    },
  },
};

export default config;
