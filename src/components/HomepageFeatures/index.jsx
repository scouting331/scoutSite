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
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";

/**
 * Core dataset representing individual scouting unit details.
 * @type {Array<{title: string, Jpg: string, UnitSite: string, description: React.JSX.Element}>}
 */
const FeatureList = [
  {
    title: "Troop 303",
    Jpg: require("@site/static/img/feature-cards/troop303.jpg").default,
    UnitSite: "/unit-docs/troop-303",
    description: (
      <>
        Serving young men ages 11–17 on their journey to Eagle Scout and beyond.
      </>
    ),
  },
  {
    title: "Troop 331",
    Jpg: require("@site/static/img/feature-cards/troop331.jpg").default,
    UnitSite: "/unit-docs/troop-331",
    description: (
      <>
        Providing adventure, leadership, and service opportunities for girls ages 11–17.
      </>
    ),
  },
  {
    title: "Crew 303",
    Jpg: require("@site/static/img/feature-cards/crew303.jpg").default,
    UnitSite: "/unit-docs/crew-303",
    description: (
      <>
        High adventure, leadership, and service opportunities for young men and women ages 14–20.
      </>
    ),
  },
  {
    title: "Pack 303",
    Jpg: require("@site/static/img/feature-cards/pack303.jpg").default,
    UnitSite: "/unit-docs/pack-303",
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
    <div className={clsx("col col--3")}>
      <div className="text--center">
        <Link to={UnitSite} className={styles.imageContainer}>
          <img src={Jpg} className={styles.featureJpg} alt={title} />
          <div className={styles.overlayContent}>
            <Heading as="h3" className={styles.overlayHeading}>{title}</Heading>
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
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <Heading as="h1">Scouting Units</Heading>
      </div>
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
