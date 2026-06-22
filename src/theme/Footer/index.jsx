/**
 * @file index.js
 * @description A custom wrapper that extends the default Docusaurus footer layout via swizzling.
 * Appends a secondary custom copyright split-section utilizing global site configuration fields.
 * 
 * @module FooterWrapper
 * @requires React
 * @requires @theme-original/Footer
 * @requires @docusaurus/useDocusaurusContext
 */
import React from "react";
import Footer from "@theme-original/Footer";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

/**
/**
 * @file index.js
 * @description A custom wrapper that extends the default Docusaurus footer layout via swizzling.
 * Appends a secondary custom copyright split-section utilizing global site configuration fields.
 * 
 * @module FooterWrapper
 * @requires React
 * @requires @theme-original/Footer
 * @requires @docusaurus/useDocusaurusContext
 */
import React from "react";
import Footer from "@theme-original/Footer";              // Imports the unswizzled core Docusaurus original theme footer blueprint
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"; // React context hook to fetch metadata arrays out of docusaurus.config.js

/**
 * Renders the original system footer layout integrated with customized organization compliance details.
 * 
 * @component
 * @param {Object} props - Standard properties and downstream configurations passed to the core Footer.
 * @returns {React.JSX.Element} The original footer element coupled with custom bottom layout panels.
 */
export default function FooterWrapper(props) {
  // Pulls system config context variables directly out of your repository's central runtime layer
  const { siteConfig } = useDocusaurusContext();
  
  // Destructures the custom string fields variables defined inside your docusaurus.config.js object mapping array
  const { copyright1, copyright2 } = siteConfig.customFields;

  return (
    <>
      {/* Renders the un-swizzled standard Docusaurus original theme links matrix, passing all default props downstream safely */}
      <Footer {...props} />
      
      {/* Custom visual dividing block panel layout separating standard links from extended footer content cells */}
      <section className="footer-bottom"></section>
      
      {/* 
        Custom Split-Section compliance block panel layout.
        Outputs additional required organizational metadata text lines right at the baseline floor of the site canvas.
      */}
      <section className="copyright-section">
        {copyright1}                        {/* Displays custom line 1 text configurations (e.g., Charter organization notices) */}
        <br />                              {/* Native structural line break pushing downstream properties to a clean row */}
        {copyright2}                        {/* Displays custom line 2 text configurations (e.g., Unified privacy policy or unit compliance headers) */}
      </section>
    </>
  );
}
