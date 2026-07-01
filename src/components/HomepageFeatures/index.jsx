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
import { homepageFeatureCards } from "@site/src/data/homepageContent";
import { homepageSectionCopy } from "@site/src/data/siteContent";

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
function Feature({ image, href, title, description }) {
  return (
    // Allocates exactly 3 out of 12 grid spaces per element, making a clean 4-column layout layout grid
    <div className={clsx("col col--3")}>
      <div className="text--center">
        {/* Link container wrapping the entire card graphic canvas to handle click routing events */}
        <Link to={href} className={styles.imageContainer}>
          {/* Background display banner image asset representing the unit */}
          <img src={image} className={styles.featureJpg} alt={title} />
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
        <Heading as="h2" id="scouting-units-heading">
          {homepageSectionCopy.scoutingUnitsHeading}
        </Heading>
      </div>
      {/* Root section context viewport element utilizing module styles layouts */}
      <section className={styles.features} aria-labelledby="scouting-units-heading">
        {/* Fixed horizontal margin spacing box aligning content frames with global layout layouts */}
        <div className="container">
          {/* Standard row flex design structure wrapping column grid elements safely */}
          <div className="row">
            {/* Loops over the homepage feature cards data to dynamically inject custom cards onto the page DOM */}
            {homepageFeatureCards.map((props) => (
              <Feature key={props.id} {...props} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
