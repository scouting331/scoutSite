import React from 'react';
import Footer from '@theme-original/Footer';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function FooterWrapper(props) {
  const {siteConfig} = useDocusaurusContext();
  const {copyright1, copyright2} = siteConfig.customFields;
  
  return (
    <>
      <Footer {...props} />
      <section class="footer-bottom">
      </section>
      <section class="copyright-section">
        {copyright1}<br />{copyright2}  
      </section>
    </>
  );
}