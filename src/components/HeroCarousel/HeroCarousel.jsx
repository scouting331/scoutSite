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
import Slider from "react-slick";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import Heading from "@theme/Heading";
import styles from "./index.module.css";

/**
 * Renders the text overlay for the hero section, including the site title, 
 * tagline, and a "Join Us" call-to-action link.
 * 
 * @component
 * @private
 * @returns {React.JSX.Element} The branded content overlay block.
 */
function HeroText() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className="overlay-text">
      <Heading as="h1" className="hero__title">
        {siteConfig.title}
      </Heading>
      <p className="hero__subtitle">{siteConfig.tagline}</p>
      <div className={styles.buttons}>
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
  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    waitForAnimate: false,
    arrows: false,
  };
  return (
    <Slider
      {...settings}
      className={clsx("hero hero--primary", styles.heroBanner)}
    >
      <div>
        <HeroText />
        <img src="img\carousel\hero1.jpg" />
      </div>
      <div>
        <HeroText />
        <img src="img\carousel\hero2.jpg" />
      </div>
      <div>
        <HeroText />
        <img src="img\carousel\hero3.jpg" />
      </div>
    </Slider>
  );
}
