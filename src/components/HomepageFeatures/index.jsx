/**
 * @file index.jsx
 * @description Renders a grid section on the homepage displaying the active Scouting units.
 * Each unit card features an image, programmatic link, descriptive summary, and hover-triggered overlay content.
 * 
 * @module HomepageFeatures
 * @requires React
 * @requires clsx
 * @requires @docusaurus/Link
 * @requires @theme/Heading
 */

import clsx from "clsx";
import styles from "./styles.module.css";                  // Scoped CSS Modules styling sheet managing custom cards and hover states
import Link from "@docusaurus/Link";                        // Docusaurus optimized internal link router to prevent page refreshes
import Heading from "@theme/Heading";                        // Structural theme heading component enforcing standard semantic HTML tags

/**
 * Core dataset representing individual scouting unit details.
 * @type {Array<{title: string, Jpg: string, UnitSite: string, description: React.JSX.Element}>}
 */
const FeatureList = [
  {
    title: "Troop 303",
    // Webpack resolves this image path from the static directory at compilation build time
    Jpg: require("@site/static/img/feature-cards/troop303.jpg").default,
    UnitSite: "/troop-303",                                 // Target destination route for the Boys/Girls Troop page
    description: (
      <>
        Serving young men ages 11–17 on their journey to Eagle Scout and beyond.
      </>
    ),
  },
  {
    title: "Troop 331",
    // Resolves and caches the file asset bundle during the deployment optimization process
    Jpg: require("@site/static/img/feature-cards/troop331.jpg").default,
    UnitSite: "/troop-331",                                 // Target destination route for the All-Girl Troop page
    description: (
      <>
        Providing adventure, leadership, and service opportunities for girls ages 11–17.
      </>
    ),
  },
  {
    title: "Crew 303",
    // Resolves the high-adventure co-ed branch image reference location block
    Jpg: require("@site/static/img/feature-cards/crew303.jpg").default,
    UnitSite: "/crew-303",                                 // Target destination route for the Venturing Crew page
    description: (
      <>
        High adventure, leadership, and service opportunities for young men and women ages 14–20.
      </>
    ),
  },
  {
    title: "Pack 303",
    // Resolves the entry-level elementary school program image path resource
    Jpg: require("@site/static/img/feature-cards/pack303.jpg").default,
    UnitSite: "/pack-303",                                 // Target destination route for the Cub Scout Pack page
    description: (
      <>
        Starting the journey of Scouting with fun and adventure for boys and girls in grades K–5.
      </>
    ),
  },
];

/**
 * Renders an individual scouting unit block inside a responsive layout column.
 * Includes a text overlay that interacts with module-scoped hover animations.
 * 
 * @component
 * @private
 * @param {Object} props - Component properties.
 * @param {string} props.Jpg - Resolved asset path for the background banner image.
 * @param {string} props.UnitSite - Internal Docusaurus route or external url for the unit's page.
 * @param {string} props.title - The name of the specific Scouting unit (e.g., "Troop 303").
 * @param {React.JSX.Element} props.description - Explanatory markup detailing age ranges and target demographics.
 * @returns {React.JSX.Element} A grid column containing the linked image and overlay.
 */
function Feature({ Jpg, UnitSite, title, description }) {
  return (
    // Allocates exactly 3 out of 12 grid spaces per element, making a clean 4-column layout layout grid
    <div className={clsx("col col--3")}>
      <div className="text--center">
        {/* Link container wrapping the entire card graphic canvas to handle click routing events */}
        <Link to={UnitSite} className={styles.imageContainer}>
          {/* Background display banner image asset representing the unit */}
          <img src={Jpg} className={styles.featureJpg} alt={title} />
          {/* Animated visual display box absolute-positioned directly over the image surface */}
          <div className={styles.overlayContent}>
            {/* Semantic h3 header component block displaying the current active unit string */}
            <Heading as="h3" className={styles.overlayHeading}>{title}</Heading>
            {/* Paragraph block summarizing the membership parameters and unit goals */}
            <p className={styles.overlayDescription}>{description}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

/**
 * Main sections wrapper component that structures the layout row and global grid container.
 * 
 * @component
 * @returns {React.JSX.Element} A clean layout section displaying all registered scouting units.
 */
export default function HomepageFeatures() {
  return (
    <>
      {" "}
      {/* Centered layout row segment initializing section text header indicators */}
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <Heading as="h1">Scouting Units</Heading>
      </div>
      {/* Root section context viewport element utilizing module styles layouts */}
      <section className={styles.features}>
        {/* Fixed horizontal margin spacing box aligning content frames with global layout layouts */}
        <div className="container">
          {/* Standard row flex design structure wrapping column grid elements safely */}
          <div className="row">
            {/* Loops over the FeatureList matrix records to dynamically inject custom cards onto the page DOM */}
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} /> // Spreads data properties object keys and passes unique index numbers for React diff tracking
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
