export const siteMetadata = {
  title: "The Scouting Units of American Legion Post 331",
  tagline:
    "Discover character, leadership, and outdoor adventure for youth ages 5-20 with the Brownsburg, IN Scouting America units at Post 331.",
  description: "Home of the Scouting Units of American Legion Post 331",
  keywords:
    "Brownsburg scouts, Cub Scouts, Scouts BSA, Venturing Crew, troop 303, troop 331, pack 303, youth leadership, camping resources, scout events",
};

export const homepageSectionCopy = {
  scoutingUnitsHeading: "Scouting Units",
  introHeading: "Start your Scout adventure today",
  introText:
    "We support local youth with safe, active programs that build outdoor skills, leadership, and character across Cub Scouts, Scouts BSA, and Venturing. Explore our units to find the right fit for your scout and family.",
};

export const navbarItems = [
  {
    type: "dropdown",
    label: "Unit Sites",
    position: "right",
    items: [
      { label: "Troop 303", to: "/troop-303" },
      { label: "Troop 331", to: "/troop-331" },
      { label: "Crew 303", to: "/crew-303" },
      { label: "Pack 303", to: "/pack-303" },
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
];

const socialLinks = [
  {
    label: "YouTube Channel",
    href: "https://www.youtube.com/@Scouting331",
    iconClass: "fa-youtube",
    ariaLabel: "YouTube Channel",
  },
  {
    label: "Troop 303",
    href: "https://www.facebook.com/groups/114681931900039",
    iconClass: "fa-facebook",
    ariaLabel: "Troop 303 Facebook Page",
  },
  {
    label: "Troop 331",
    href: "https://www.facebook.com/groups/177465650239377",
    iconClass: "fa-facebook",
    ariaLabel: "Troop 331 Facebook Page",
  },
  {
    label: "Pack 303",
    href: "https://www.facebook.com/groups/441282630057267",
    iconClass: "fa-facebook",
    ariaLabel: "Pack 303 Facebook Page",
  },
  {
    label: "Crew 303",
    href: "https://www.instagram.com/venturecrew.303",
    iconClass: "fa-instagram",
    ariaLabel: "Venture Crew 303 Instagram Page",
  },
];

export const footerLinks = [
  {
    title: "Quick Links",
    items: [
      {
        label: "Documents",
        to: "/docs/general",
      },
      {
        label: "Blog",
        to: "/blog",
      },
      {
        label: "Helpful Links",
        to: "/docs/general/helpful-links",
      },
    ],
  },
  {
    title: "Social Media",
    items: socialLinks.map((link) => ({
      html: `
        <a href="${link.href}"
          target="_blank" rel="noreferrer noopener"
          aria-label="${link.ariaLabel}"
          class="footer__link-item">
          <i class="fa-brands ${link.iconClass} footer__link-logo" aria-hidden="true"></i>
          ${link.label}
        </a>
        `,
    })),
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
          `,
      },
      {
        html: `
          <a href="mailto:scoutingunits331@gmail.com?subject=Website%20Inquiry" style="font-style: normal" class="footer__link-item">
            <div style="display: flex; align-items: flex-start; gap: 8px;">
              <i class="fa-solid fa-at footer__link-logo" aria-hidden="true"></i>
              Email Us
            </div>
          </a>
          `,
      },
    ],
  },
];
