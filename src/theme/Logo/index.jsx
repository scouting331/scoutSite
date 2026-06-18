/**
 * @file index.js
 * @description Renders the main brand anchor element for the navigation headers.
 * Resolves standard light and dark mode image assets, implements programmatic accessibility descriptions, 
 * and handles layout wrap divisions legacy-inherited from Infima core upgrades.
 * 
 * @module Logo
 * @requires React
 * @requires @docusaurus/Link
 * @requires @docusaurus/useBaseUrl
 * @requires @docusaurus/useDocusaurusContext
 * @requires @docusaurus/theme-common
 * @requires @theme/ThemedImage
 */

import React from "react";
import Link from "@docusaurus/Link";                        // Docusaurus optimized internal link router to prevent page refreshes
import useBaseUrl from "@docusaurus/useBaseUrl";            // Appends the site's configured baseUrl configuration prefix to static paths
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"; // System configuration context hook fetching variables from docusaurus.config.js
import { useThemeConfig } from "@docusaurus/theme-common";  // Extracts current navigation and theme settings from global client contexts
import ThemedImage from "@theme/ThemedImage";                // Core Docusaurus component capable of hot-swapping images between light and dark mode UI toggles

/**
 * Processes light/dark source values and structures the underlying theme element image canvas.
 * Includes a structural outer div wrapper wrapper if an image class rule parameter is passed.
 * 
 * @component
 * @private
 * @param {Object} props - Component properties.
 * @param {Object} props.logo - Navbar image configuration data object containing dimensions and source paths.
 * @param {string} props.alt - Calculated accessibility screen-reader label text.
 * @param {string} [props.imageClassName] - Optional extra class name targeting the parent wrapper element.
 * @returns {React.JSX.Element} A configured brand image layout node.
 */
function LogoThemedImage({ logo, alt, imageClassName }) {
  // Appends baseUrl routing paths to light and dark source strings dynamically
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),             // Falls back to the light mode image source layout map if dark asset is omitted
  };
  
  // Assembles the core image markup canvas with size dimensions and inline style properties
  const themedImage = (
    <ThemedImage
      className={logo.className}
      sources={sources}
      height={logo.height}
      width={logo.width}
      alt={alt}
      style={logo.style}
    />
  );
  
  // Historical Legacy Inheritance Note: This explicit div block wrapper was introduced 
  // in Docusaurus PR #5666 to isolate navbar logo boundaries following Infima framework updates.
  return imageClassName ? (
    <div className={imageClassName}>{themedImage}</div>     // Wraps the theme image inside a layout div cell block if custom styles match
  ) : (
    themedImage                                             // Returns the bare image object node if no specific layout rules exist
  );
}

/**
 * Main clickable application brand entry node matching active navigation links and configuration titles.
 * Marks image assets as decorative items if the visible metadata label is already rendering.
 * 
 * @component
 * @param {Object} props - Downstream layout styles and theme property mappings.
 * @param {string} [props.imageClassName] - Style targeting the internal logo image wrapper element.
 * @param {string} [props.titleClassName] - Style targeting accompanying text tags.
 * @returns {React.JSX.Element} A link block surrounding the brand theme elements.
 */
export default function Logo(props) {
  // Pulls site meta properties variables out of global tracking layers
  const {
    siteConfig: { title },
  } = useDocusaurusContext();
  
  // Extracts navbar-specific property blocks out of active configuration files (docusaurus.config.js)
  const {
    navbar: { title: navbarTitle, logo },
  } = useThemeConfig();
  
  // Descriptors mapping custom element naming styles from rest arguments properties arrays
  const { imageClassName, titleClassName, ...propsRest } = props;
  
  // Calculates base landing page home routes fallback locations links
  const logoLink = useBaseUrl(logo?.href || "/");
  
  // Accessibility Engine Logic Check: If a text name is already visible in the navigation header bar, 
  // setting fallbackAlt to an empty string hides the image asset from screen readers to prevent duplicate text notifications.
  const fallbackAlt = navbarTitle ? "" : title;
  
  // Prefers user-defined custom override alt tags over calculated automated screen reading templates
  const alt = logo?.alt ?? fallbackAlt;
  
  return (
    // Wraps brand identity icons inside an optimized single-page routing anchor container link
    <Link
      to={logoLink}
      {...propsRest}
      {...(logo?.target && { target: logo.target })}        // Conditional object mapping: applies custom target properties (like opening in new tabs) if set
    >
      {/* Checks if a valid logo object tree config map parameter exists before mounting components */}
      {logo && (
        <LogoThemedImage
          logo={logo}
          alt={alt}
          imageClassName={imageClassName}
        />
      )}
    </Link>
  );
}
