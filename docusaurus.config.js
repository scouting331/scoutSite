// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/* @type {import('@docusaurus/types').Config} */
const config = {
  title: 'The Scouting Units of American Legion Post 331',
  tagline: 'Scouting America Units Troop 303, Troop 331, Crew 303, and Pack 303 of Brownsburg, Indiana',
  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',

  organizationName: 'scouting331', // Usually your GitHub org/user name.
  projectName: 'scoutSite', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'ignore',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  trailingSlash: false,

  customFields: {
        copyright1: `© ${new Date().getFullYear()} The Scouting Units of American Legion Post 331, Scouting America`,
        copyright2: `All Rights Reserved`,
        navbarSubtitle: 'Troop 303, Troop 331, Crew 303 and Pack 303',
  },

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: './sidebarsDocs.js',
          path: 'troop-docs',
          routeBasePath: 'troop-docs',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: undefined,
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          },
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'cookbook',
        path: 'cookbook',
        routeBasePath: 'cookbook',
        sidebarPath: './sidebarsCookbook.js',
      },
    ],
    '@react-leaflet/docusaurus-plugin',
  ],

  themeConfig:
    ({
      colorMode: {
        respectPrefersColorScheme: true,
        disableSwitch: true,
        defaultMode: 'light',
      },
      announcementBar: {
        id: 'demo_announcement',
        content: 'Welcome to our new website!',
        backgroundColor: '#7CB342',
        textColor: '#FFF',
        isCloseable: false,
      },
      navbar: {
        title: 'Scouting America',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo_white.png',
        },
        items: [
          {
            to: '/blog', 
            label: 'Blog', 
            position: 'right'
          },
          {
            to: '/join-us',
            label: 'Join Us',
            position: 'right',
            className: 'button button--secondary'

          },
        ],
        hideOnScroll: false,
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Learn',
            items: [
              {
                label: 'Documents',
                to: '/troop-docs/helpful-links',
              },
            ],
          },
          {
            title: 'Scouting Links',
            items: [
              {
                label: 'Scouting America',
                to: 'https://www.souting.org/',
              },
              {
                label: 'Crossroads of America Council',
                to: 'https://www.joinscoutsin.org/',
              },
              {
                label: 'Five Creeks District',
                to: 'https://www.5creeks.org/',
              },
            ],
          },
          {
            title: 'Connect',
            items: [
              {
                html: `
                  <a href="https://www.facebook.com/groups/114681931900039/" target=_blank rel="noreferrer noopener" aria-label="Facebook">
                    <i class="fa-brands fa-facebook fa-2xl footer__link-logo"></i>
                  </a>
                  `,
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
          name: 'keywords', 
          content: 'eagle scout, webelos, scouts bsa, boy scouts near me, sea scouts, scoutbook, Venture, bsa, Boy Scouts of America, cub scouts, scouts, kids events near me, kid friendly activities near me, fun places for kids near me, scout, boy scouts, Scouting America, Things to do with kids near me, Kids activities near me, kids activities, child development, kids fun near me, trails near me, crafts for kids, Tent camping near me, science experiments for kids, science projects for kids, stem for kids, Canoe, trails near me, hiking trails near me, all trails, campsites, walking trails near me, Camping, Campground, Hiking near me, Camping near me, campgrounds near me, hiking trails near me, Fishing, Swimming, Brownsburg scout troops, Brownsburg kids, find cub scouts near me, find boy scouts near me, find girl scouts near me'
        },
      ],
    }),
    themes: [
      "@docusaurus/theme-mermaid",
    ],
    markdown: {
      mermaid: true,
      emoji: true,
      hooks: {
        onBrokenMarkdownLinks: "warn",
        onBrokenMarkdownImages: "throw",
      },
    },
};

export default config;
