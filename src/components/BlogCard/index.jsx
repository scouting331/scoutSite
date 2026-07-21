/**
 * @file index.jsx
 * @description Renders a grid section displaying recent Docusaurus blog posts as stylized cards.
 * Features automated image fallbacks, author stacks, tag truncation, and formatted localized dates.
 * 
 * @module HomepageBlogCards
 * @requires React
 * @requires @docusaurus/Link
 * @requires @docusaurus/useBaseUrl
 * @requires @theme/Heading
 * @requires @docusaurus/useGlobalData
 * 
 * @see {@link https://docusaurus.io | Docusaurus Blog Features}
 */

import React from "react";
import Link from '@docusaurus/Link';                        // Docusaurus optimized router link component to prevent full-page reloads
import clsx from "clsx";                                    // Utility for conditionally joining CSS class names together cleanly
import styles from './styles.module.css';                  // Scoped CSS Modules styling sheet for this specific layout component
import Heading from '@theme/Heading';                        // Swappable theme heading component supporting semantic HTML structures
import { usePluginData } from '@docusaurus/useGlobalData';    // Consumes plugin-provided build data in React components
import useBaseUrl from "@docusaurus/useBaseUrl";            // Appends the site's configured baseUrl configuration prefix to static paths

/**
 * Localizes an ISO date string to "MMM DD, YYYY" using UTC to prevent timezone offsets.
 * @private
 * @param {string} isoString - The ISO date format string from Docusaurus metadata.
 * @returns {string} The formatted date.
 */
const formatDate = (isoString) => {
    const date = new Date(isoString);                       // Instantiates a native JavaScript Date engine object
    return new Intl.DateTimeFormat('en-US', {               // Leverages ECMAScript Internationalization API for lightweight date building
      month: 'short',                                       // Formats month into a 3-letter shorthand descriptor (e.g., "Jan")
      day: 'numeric',                                       // Formats day into standard integer characters (e.g., "18")
      year: 'numeric',                                      // Formats year into a 4-digit layout block (e.g., "2026")
      timeZone: 'UTC'                                       // Enforces universal time to guard against localized browser skew shifts
    }).format(date);                                        // Commits parsing transformations to output a finalized string wrapper
};

/**
 * Renders an individual blog post item inside a grid column.
 * @component
 * @param {Object} props
 * @param {string} props.permalink - Target URL route for the blog post link.
 * @param {string} props.title - Main headline of the post.
 * @param {string} props.date - ISO timestamp of the publication date.
 * @param {Array<Object>} props.authors - Collection of author data containing names and avatar image URLs.
 * @param {Array<Object>} props.tags - List of metadata tag categories with text labels.
 * @param {Object} props.frontmatter - Unprocessed raw frontmatter fields containing configuration like custom cover images.
 */
function BlogCard({ permalink, title, date, authors, tags, frontmatter }) {
  const postImage = frontmatter?.image;
  const resolvedCoverUrl = postImage
    ? postImage.startsWith('http')
      ? postImage
      : useBaseUrl(postImage.replace(/^\/+/, ''))
    : useBaseUrl('img/blog/default-blog-cover.webp');

  return (
    // Infuses standard Infima CSS grid infrastructure properties (allocating 3 out of 12 columns per entry)
    <div className={clsx("col col--3 margin-bottom--lg")}>
      <Link to={permalink} className={styles.blogCard}>
        
        {/* 1. Card Image Header Frame Container */}
        <div className={styles.cardHeader}>
          <img 
            src={resolvedCoverUrl} 
            alt={title} 
            className={styles.cardImage}
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* 2. Card Body Content Presentation Wrapper */}
        <div className={styles.cardBody}>
          {/* Converts structural timestamps into beautiful localized textual outputs */}
          <span className={styles.date}>{formatDate(date)}</span>
          <h3 className={styles.cardTitle}>{title}</h3>

          {/* Iterates through a limited section slice of taxonomies to layout classification labels */}
          <div className={styles.cardMeta}>
            {tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className={styles.tagPill}>
                {tag.label}
              </span>
            ))}
          </div>
          
          {/* 3. Footer: Authors Avatar Profiles Stack & Direct Action Link */}
          <div className={styles.cardFooter}>
            <div className={styles.authorStack}>
              {/* Loops over the individual post authors block data mapping variables */}
              {authors.map((author, idx) => (
                <img 
                  key={idx}
                  src={author.imageURL || 'img/logos/favicon.png'} // Checks for customized user profiles, deploying an internal site favicon fallback if none exist
                  alt={author.name} 
                  className={styles.authorAvatar}
                  title={author.name}                       // Native element hover tooltip string showing name metrics
                  style={{ zIndex: 10 - idx }}              // Enforces layered layout stacks moving elements rightwards
                />
              ))}
              {/* Dynamic summary phrase adjustment matching plural criteria boundaries */}
              <span className={styles.authorName}>
                {authors.length === 1 ? authors[0].name : `${authors.length} Authors`}
              </span>
            </div>
            {/* Visual element anchor pointing to the comprehensive blog post review content view */}
            <span className={styles.readMore}>Read &rarr;</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

/**
 * Root component that maps out the collective layout grid workspace dashboard view.
 * @public
 * @returns {JSX.Element} Structural framework rendering recent post items.
 */
export default function HomepageBlogCards() {
  const recentPosts = usePluginData('docusaurus-plugin-content-blog') || [];

    return (
        <>
        {/* Layout container aligning content cleanly along central layout coordinate nodes */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Heading as="h2">Recent Adventures</Heading>
        </div>
        {/* Standard center-aligned responsive Infima CSS grid structural layout row box wrapper */}
        <div className="container">
            {recentPosts.length === 0 ? (
              <div className="row">
                <div className="col col--12 text--center">
                  <p>
                    No recent adventures are available yet. Check back soon for new
                    stories from Pack 303, Troop 303, Troop 331, and Crew 303.
                  </p>
                </div>
              </div>
            ) : (
              <div className="row">
                {/* Dynamically steps down through the collection items data payload to inject the components grid */}
                {recentPosts.map((post) => (
                    <BlogCard
                        key={post.id}                       // React unique identification tag string used for virtual DOM diff tracking
                        permalink={post.metadata.permalink} // Absolute layout route parameter
                        title={post.metadata.title}         // Article text title element string
                        date={post.metadata.date}           // Raw immutable generation date value string
                        authors={post.metadata.authors}     // Passes the full raw author listing array object group
                        tags={post.metadata.tags}           // Passes the full raw tag classification descriptor mapping array
                        frontmatter={post.metadata.frontMatter} // Access parameter tracking optional variables custom set inside posts
                    />
                ))}
              </div>
            )}
        </div>
        </>
    );
}
