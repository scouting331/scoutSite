/**
 * @file index.jsx
 * @description A dynamic, full-width homepage hero banner featuring an autoplaying image carousel.
 * It overlays site branding information and a primary call-to-action button over the cycling slides.
 * 
 * @module HeroCarousel
 * @requires React
 * @requires react-slick
 * @requires clsx
 * @requires @docusaurus/Link
 * @requires @docusaurus/useDocusaurusContext
 * @requires @theme/Heading
 */

import React from "react";
import Slider from "react-slick";                            // Import the core react-slick sliding carousel framework layout component
import clsx from "clsx";                                    // Utility engine used for conditionally joining dynamic string classes together
import Link from "@docusaurus/Link";                        // Docusaurus optimized router link component to prevent full-page reloads
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"; // React hook providing access to global site configuration variables

import Heading from "@theme/Heading";                        // Swappable theme heading component supporting semantic HTML structures
import styles from "./index.module.css";                  // Scoped CSS Modules styling sheet for this specific layout component

/**
 * Renders the text overlay for the hero section, including the site title, 
 * tagline, and a "Join Us" call-to-action link.
 * 
 * @component
 * @private
 * @returns {React.JSX.Element} The branded content overlay block.
 */
function HeroText() {
  // Destructures the siteConfig configuration payload from the central Docusaurus context provider
  const { siteConfig } = useDocusaurusContext();
  return (
    // Inner typography container absolute-positioned over the active visual image layer
    <div className="overlay-text">
      {/* Renders a semantic h1 block using the official site title from docusaurus.config.js */}
      <Heading as="h1" className="hero__title">
        {siteConfig.title}
      </Heading>
      {/* Renders the official site subtitle/tagline text from docusaurus.config.js */}
      <p className="hero__subtitle">{siteConfig.tagline}</p>
      {/* Action button grouping container wrapper */}
      <div className={styles.buttons}>
        {/* Large, high-contrast call-to-action button routing users directly to the recruitment form page */}
        <Link className="button button--secondary button--lg" to="/join-us">
          Join Us
        </Link>
      </div>
    </div>
  );
}

/**
 * Main structural layout component that initializes the react-slick slider with 
 * fade transitions, dots navigation, and automated image cycling.
 * 
 * @component
 * @returns {React.JSX.Element} An autoplaying slideshow with interactive navigation overlays.
 */
export default function HeroCarousel() {
  // Configuration options object passed to configure the underlying react-slick engine
  const settings = {
    dots: true,                           // Enables the navigation dots tracker buttons at the bottom of the card frame
    infinite: true,                       // Loops the carousel slides infinitely back to slide 1 upon reaching the terminal item
    fade: true,                           // Deploys a smooth opacity cross-fade transition instead of a horizontal slide swipe action
    speed: 1000,                          // Setting tracking animation cross-fade layout transition durations (1000ms = 1 second)
    slidesToShow: 1,                      // Dictates the volume of slides exposed on screen simultaneously within the viewpoint window
    slidesToScroll: 1,                    // Dictates the index increment stepping count value advanced on every progression trigger
    autoplay: true,                       // Automates background image cycling processes without demanding user interaction clicks
    waitForAnimate: false,                // Disables animation queues to allow immediate navigation interactions during active fades
    arrows: false,                        // Suppresses the native left/right side navigation arrow buttons to clean up visual clutter
  };
  return (
    // Mounts the Slider wrapper, spreading configuration rules and infusing standard Infima hero layout classes
    <Slider
      {...settings}
      className={clsx("hero hero--primary", styles.heroBanner)}
    >
      {/* --- CAROUSEL SLIDE ITEM 1 --- */}
      <div>
        <HeroText />                      {/* Re-injects the dynamic text overlay structure directly over the active slide index */}
        <img src="img/carousel/hero1.jpg" alt="Hero slide showing Scouts in action"/>
      </div>
      {/* --- CAROUSEL SLIDE ITEM 2 --- */}
      <div>
        <HeroText />
        <img src="img/carousel/hero2.jpg" alt="Hero slide showing Scouts in action"/>
      </div>
      {/* --- CAROUSEL SLIDE ITEM 3 --- */}
      <div>
        <HeroText />
        <img src="img/carousel/hero3.jpg" alt="Hero slide showing Scouts in action"/>
      </div>
    </Slider>
  );
}
