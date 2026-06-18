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
 * @requires @site/.docusaurus/recent-posts.json
 * 
 * @see {@link https://docusaurus.io | Docusaurus Blog Features}
 */

import React from "react";
import Link from '@docusaurus/Link';                        // Docusaurus optimized router link component to prevent full-page reloads
import clsx from "clsx";                                    // Utility for conditionally joining CSS class names together cleanly
import styles from './styles.module.css';                  // Scoped CSS Modules styling sheet for this specific layout component
import Heading from '@theme/Heading';                        // Swappable theme heading component supporting semantic HTML structures
import recentPosts from '@site/.docusaurus/recent-posts.json'; // Pre-built local JSON database payload containing recent post metadata
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
function BlogCard({ permalink, title, date, authors, tags }) {
  // Pre-caches the global server asset path prefixing mapping rule for the default background
  const fallbackDefaultImage = useBaseUrl('img/blog/default-blog-cover.webp');
  
  // 1. Isolate the base slug name by stripping the leading "/blog" and trailing slashes
  const cleanUrl = permalink.replace(/^\/|\/$/g, '').replace(/^blog\//, '');

  // 2. Isolate ONLY the final trailing title string
  const slugName = cleanUrl.split('/').pop();
  
  // 3. Extract the exact YYYY-MM-DD prefix from the raw ISO string directly without date manipulation
  // An ISO timestamp starts with "YYYY-MM-DD", so we slice the first 10 characters
  const datePrefix = date.slice(0, 10);

  // 4. Combine them into the exact format requested: YYYY-MM-DD-blogtitle
  const folderName = `${datePrefix}-${slugName}`;
  
  let resolvedCoverUrl;
  try {
    // 2. Webpack looks inside the static folder during compile time
    // Dynamically checks for the presence of an optimized webp illustration file asset block at compilation time
    resolvedCoverUrl = require(`@site/static/img/blog/${folderName}/cover.webp`).default;
  } catch (err) {
    // 3. If file doesn't exist, it instantly uses the fallback at build time
    // Fallback error-handling catching missing directory trees to seamlessly inject standard cards instead
    resolvedCoverUrl = fallbackDefaultImage;
  }

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
                  {/* Checks for customized user profiles, deploying an internal site favicon fallback if none exist */}
                  src={author.imageURL || 'img/logos/favicon.png'} 
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
    return (
        <>
        {/* Layout container aligning content cleanly along central layout coordinate nodes */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Heading as="h1">Recent Adventures</Heading>
        </div>
        {/* Standard center-aligned responsive Infima CSS grid structural layout row box wrapper */}
        <div className="container">
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
        </div>
        </>
    );
}
