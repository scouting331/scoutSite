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

import React, { useEffect, useState } from "react";
import Slider from "react-slick";                            // Import the core react-slick sliding carousel framework layout component
import clsx from "clsx";                                    // Utility engine used for conditionally joining dynamic string classes together
import Link from "@docusaurus/Link";                        // Docusaurus optimized router link component to prevent full-page reloads
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"; // React hook providing access to global site configuration variables

import Heading from "@theme/Heading";                        // Swappable theme heading component supporting semantic HTML structures
import styles from "./index.module.css";                  // Scoped CSS Modules styling sheet for this specific layout component
import { homepageHeroSlides } from "@site/src/data/homepageContent";

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
      {/* Renders a semantic h2 block using the official site title from docusaurus.config.js */}
      <Heading as="h2" className="hero__title">
        {siteConfig.title}
      </Heading>
      {/* Renders the official site subtitle/tagline text from docusaurus.config.js */}
      <p className="hero__subtitle">{siteConfig.tagline}</p>
      {/* Action button grouping container wrapper */}
      <div className={styles.buttons}>
        {/* Large, high-contrast call-to-action button routing users directly to the recruitment form page */}
        <Link
          className="button button--secondary button--lg"
          to="/join-us"
          aria-label="Learn how to join our Scouting units"
        >
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
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(mediaQuery.matches);

    updatePreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference);
      return () => mediaQuery.removeEventListener("change", updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  // Configuration options object passed to configure the underlying react-slick engine
  const settings = {
    dots: true,                           // Enables the navigation dots tracker buttons at the bottom of the card frame
    infinite: true,                       // Loops the carousel slides infinitely back to slide 1 upon reaching the terminal item
    fade: true,                           // Deploys a smooth opacity cross-fade transition instead of a horizontal slide swipe action
    speed: reduceMotion ? 0 : 1000,       // Uses a direct transition when reduced motion is preferred
    slidesToShow: 1,                      // Dictates the volume of slides exposed on screen simultaneously within the viewpoint window
    slidesToScroll: 1,                    // Dictates the index increment stepping count value advanced on every progression trigger
    autoplay: !reduceMotion,              // Automates background image cycling unless motion is reduced
    autoplaySpeed: 5000,                  // Sets the timing between automatic slide changes
    waitForAnimate: false,                // Disables animation queues to allow immediate navigation interactions during active fades
    arrows: false,                        // Suppresses the native left/right side navigation arrow buttons to clean up visual clutter
    accessibility: true,                  // Supports keyboard navigation and screen-reader semantics
    pauseOnHover: true,                   // Pauses autoplay when visitors hover over the carousel
    pauseOnFocus: true,                   // Pauses autoplay when the carousel is focused
  };

  return (
    // Mounts the Slider wrapper, spreading configuration rules and infusing standard Infima hero layout classes
    <Slider
      {...settings}
      aria-label="Featured Scouting photos"
      className={clsx("hero hero--primary", styles.heroBanner)}
    >
      {homepageHeroSlides.map((slide) => (
        <div key={slide.id}>
          <HeroText />
          <img src={slide.image} alt={slide.alt} loading="lazy" decoding="async" />
        </div>
      ))}
    </Slider>
  );
}
