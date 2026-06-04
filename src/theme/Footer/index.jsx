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
 * Renders the original system footer layout integrated with customized organization compliance details.
 * 
 * @component
 * @param {Object} props - Standard properties and downstream configurations passed to the core Footer.
 * @returns {React.JSX.Element} The original footer element coupled with custom bottom layout panels.
 */
export default function FooterWrapper(props) {
  const { siteConfig } = useDocusaurusContext();
  const { copyright1, copyright2 } = siteConfig.customFields;

  return (
    <>
      <Footer {...props} />
      <section className="footer-bottom"></section>
      <section className="copyright-section">
        {copyright1}
        <br />
        {copyright2}
      </section>
    </>
  );
}
