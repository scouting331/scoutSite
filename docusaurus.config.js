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
import {
  navbarItems,
  footerLinks,
  siteMetadata,
} from "./src/data/siteContent";

/**
 * Global configuration data schema structure for Docusaurus system operations.
 *
 * @type {import('@docusaurus/types').Config}
 */

// 🔔 ANNOUNCEMENT BANNER TOGGLE: Set this to true to turn on an alert bar at the top of every page.
const SHOW_ANNOUNCEMENT = false;

const config = {
  // --- CORE WEBSITE IDENTITY ---
  title: siteMetadata.title,
  tagline: siteMetadata.tagline,
  favicon: "img/logos/favicon.png",

  // Future flags ensure our code remains compatible with upcoming major versions of Docusaurus.
  // See https://docusaurus.io#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // The live public web address where parents and the community access the site.
  url: "https://brownsburgscouts.org",
  baseUrl: "/", // Tells the server that the website is installed at the root directory level

  // Guardrails to prevent broken links from going live.
  onBrokenLinks: "throw", // ❌ STOPS the build process immediately if a Scout links to a page or image that does not exist.
  onBrokenAnchors: "ignore", // 🟡 Ignores minor section-header anchor tag mistakes so they don't break the build pipeline.

  // Internationalization settings (Language control).
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  trailingSlash: false, // Ensures consistent URL structures across the site for better search visibility.

  // Reusable custom text values that can be dropped into page footers or layouts dynamically.
  customFields: {
    copyright1: `© ${new Date().getFullYear()} The Scouting Units of American Legion Post 331, Scouting America`,
    copyright2: `All Rights Reserved`,
  },

  // --- CORE WEBSITE PRESETS ---
  presets: [
    [
      "classic",
      {
        // We set core blog/docs to false here because we manage them manually below using multi-instance settings.
        blog: false,
        docs: false,
        theme: {
          customCss: "./src/css/custom.css", // The central styling file for changing fonts and brand colors.
        },
        // --- SEARCH ENGINE SITEMAP ENGINE ---
        // Dynamically turns off sitemap generation during Cloudflare Preview builds to save build time for the Scouts.
        sitemap:
          process.env.SKIP_SITEMAP == "true"
            ? false
            : {
                lastmod: "date",
                changefreq: "weekly",
                priority: 0.5,
                ignorePatterns: ["/tags/**"], // Bypasses internal organization tags to keep search results clean.
                filename: "sitemap.xml",
                // Custom filter that strips out pagination pages (like /page/2) from search engine results.
                createSitemapItems: async (params) => {
                  const { defaultCreateSitemapItems, ...rest } = params;
                  const items = await defaultCreateSitemapItems(rest);
                  return items.filter((item) => !item.url.includes("/page/"));
                },
              },
      },
    ],
  ],

  // --- CUSTOM WEBSITE PLUGINS & EXTENSIONS ---
  plugins: [
    // 📖 MULTI-INSTANCE DOCS #1: The Camping Cookbook section.
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "cookbook",
        path: "cookbook", // Looks for folder named 'cookbook' in the root of the project.
        routeBasePath: "cookbook", // Makes the website URL point to brownsburgscouts.org/cookbook.
        sidebarPath: "./sidebarCookbook.js", // The control panel file managing the cookbook's left-hand menu tree.
      },
    ],
    // 📖 MULTI-INSTANCE DOCS #2: Core unit documents and shared files.
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docs",
        path: "docs", // Looks for folder named 'docs' in the root of the project.
        routeBasePath: "docs", // Makes the website URL point to brownsburgscouts.org/docs.
        sidebarPath: "./sidebarDocs.js", // The control panel file managing the core documentation menu tree.
      },
    ],
    // ✍️ CUSTOM EXTENSION: Automated recent adventure post processor.
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
        // 💡 SAFETY OVERRIDE: Automatically assigns a default Scouting logo if a Scout forgets to add an author profile photo.
        processBlogPosts: async ({ blogPosts }) => {
          const DEFAULT_IMAGE = "/img/logos/favicon.png";

          return blogPosts.map((post) => {
            if (post.metadata && post.metadata.authors) {
              post.metadata.authors = post.metadata.authors.map((author) => ({
                ...author,
                imageURL: author.imageURL || DEFAULT_IMAGE, // Fallback safety catch
              }));
            }
            return post;
          });
        },
      },
    ],
    // 🍪 PRIVACY COMPLIANCE: Optional cookie consent pop-up banner.
    // Set 'enabled: true' if you decide to activate tracking analytics in the future.
    [
      "docusaurus-plugin-cookie-consent",
      {
        title: "Cookie Consent",
        description:
          "We use cookies to enhance your browsing experience and analyze our traffic.",
        links: [
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Cookie Policy", href: "/cookies" },
        ],
        enabled: false,
        acceptAllText: "Accept All Cookies",
        rejectOptionalText: "Essential Only",
        rejectAllText: "Reject All",
        toastMode: true,
      },
    ],
  ],

  // --- VISUAL THEME ARCHITECTURE & UI LAYOUTS ---
  themeConfig: {
    image: "img/logos/favicon.png", // Default image used when links are shared on text messages or social cards.
    colorMode: {
      respectPrefersColorScheme: true,
      disableSwitch: true, // Forces light mode across the site to guarantee crisp visibility of unit layouts.
      defaultMode: "light",
    },
    // Configures the header banner alert when active. Controlled by the SHOW_ANNOUNCEMENT toggle at the top of this file.
    announcementBar: SHOW_ANNOUNCEMENT
      ? {
          id: "announcement-bar",
          content: "This is an announcement",
          backgroundColor: "var(--announcement-bar)", // Links to a color variable set in src/css/custom.css
          textColor: "var(--scouting-america-white)",
          isCloseable: true,
        }
      : undefined,

    // --- NAVIGATION BAR CONFIGURATION ---
    navbar: {
      title: "Scouting America",
      logo: {
        alt: "Scouting America Units",
        src: "img/logos/all-units-logo.png",
      },
      // Left and right aligned items sitting at the top of the webpage.
      items: navbarItems,
      hideOnScroll: false, // Keeps navigation links immediately accessible at the top while reading down pages.
    },

    // --- FOOTER SECTION ---
    footer: {
      style: "dark", // Employs the charcoal/black theme layout block at the bottom of the page.
      links: footerLinks,
    },
    // --- CODE BLOCKS SYNTAX HIGHLIGHTING ---
    // Controls how programming snippets look when displayed in documentation tutorials or cookbook instructions.
    prism: {
      theme: prismThemes.github, // Uses clean light colors matching general GitHub documentation layouts.
      darkTheme: prismThemes.dracula, // Fallback dark color block theme format.
    },
    // --- MERMAID DIAGRAM OPERATOR ---
    // Configures flowchart layout trees so we can build unit organization maps using text commands.
    mermaid: {
      options: {
        securityLevel: "loose", // Necessary to allow custom CSS styling tags to color our flow charts properly.
      },
    },
    // --- GLOBAL SEO GOOGLE KEYWORDS ---
    // These hidden search tokens help parents in Brownsburg, Indiana find our Scouting units when searching on Google.
    metadata: [
      {
        name: "keywords",
        content: siteMetadata.keywords,
      },
    ],
  },

  // --- MARKDOWN & PARSING ENGINES ---
  themes: ["@docusaurus/theme-mermaid"], // Extends theme engine capabilities to natively render Mermaid charts.
  markdown: {
    format: "mdx", // Enforces rich MDX format so we can embed custom interactive buttons inside text files.
    mermaid: true, // Turns on graph generation tools within standard markdown documents.
    emoji: true, // Allows Scouts to write basic shortcuts like :tent: or :fire: to automatically show visual emojis.

    // --- SAFETY HOOKS & COMPILATION GUARDRAILS ---
    hooks: {
      onBrokenMarkdownLinks: "warn", // 🟡 Warns us in the terminal if a text link points to an invalid section header anchor.
      onBrokenMarkdownImages: "throw", // ❌ CRASHES the local builder instantly if a Scout tries to link a photo that is missing.
    },
  },
};

export default config;
