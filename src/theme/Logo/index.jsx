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
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useThemeConfig } from "@docusaurus/theme-common";
import ThemedImage from "@theme/ThemedImage";

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
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };
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
  // Is this extra div really necessary?
  // introduced in https://github.com/facebook/docusaurus/pull/5666
  return imageClassName ? (
    <div className={imageClassName}>{themedImage}</div>
  ) : (
    themedImage
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
  const {
    siteConfig: { title },
  } = useDocusaurusContext();
  const {
    navbar: { title: navbarTitle, logo },
  } = useThemeConfig();
  const { imageClassName, titleClassName, ...propsRest } = props;
  const logoLink = useBaseUrl(logo?.href || "/");
  // If visible title is shown, fallback alt text should be
  // an empty string to mark the logo as decorative.
  const fallbackAlt = navbarTitle ? "" : title;
  // Use logo alt text if provided (including empty string),
  // and provide a sensible fallback otherwise.
  const alt = logo?.alt ?? fallbackAlt;
  return (
    <Link
      to={logoLink}
      {...propsRest}
      {...(logo?.target && { target: logo.target })}
    >
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
