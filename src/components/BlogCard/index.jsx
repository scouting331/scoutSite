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
import Link from '@docusaurus/Link';
import clsx from "clsx";
import styles from './styles.module.css';
import Heading from '@theme/Heading';
import recentPosts from '@site/.docusaurus/recent-posts.json';
import useBaseUrl from "@docusaurus/useBaseUrl";

/**
 * Localizes an ISO date string to "MMM DD, YYYY" format (e.g., "Oct 24, 2026").
 * @private
 * @param {string} isoString - The ISO date format string from Docusaurus metadata.
 * @returns {string} The formatted date.
 */
const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
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
  // Resolved path: permalink "/blog/campout" maps to "static/blog/campout/cover.webp"
  const resolvedCoverUrl = useBaseUrl(`img/${permalink}/cover.webp`);
  const fallbackDefaultImage = useBaseUrl('img/blog/default-blog-cover.webp');

  return (
    <div className={clsx("col col--3 margin-bottom--lg")}>
      <Link to={permalink} className={styles.blogCard}>
        
        <div className={styles.cardHeader}>
          <img 
            src={resolvedCoverUrl} 
            alt={title} 
            className={styles.cardImage} 
            onError={(e) => {
              // 2. Safe layout backup step if the web asset does not exist
              e.currentTarget.onerror = null; // Stops infinite replacement rendering bugs
              e.currentTarget.src = fallbackDefaultImage;
            }}
          />
        </div>

        {/* 2. Card Body */}
        <div className={styles.cardBody}>
          <span className={styles.date}>{formatDate(date)}</span>
          <h3 className={styles.cardTitle}>{title}</h3>

          <div className={styles.cardMeta}>
            {tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className={styles.tagPill}>
                {tag.label}
              </span>
            ))}
          </div>
          
          {/* 3. Footer: Authors & Read More */}
          <div className={styles.cardFooter}>
            <div className={styles.authorStack}>
              {authors.map((author, idx) => (
                <img 
                  key={idx}
                  src={author.imageURL || 'img/favicon.png'} 
                  alt={author.name} 
                  className={styles.authorAvatar}
                  title={author.name}
                  style={{ zIndex: 10 - idx }} // Stacks them nicely
                />
              ))}
              <span className={styles.authorName}>
                {authors.length === 1 ? authors[0].name : `${authors.length} Authors`}
              </span>
            </div>
            <span className={styles.readMore}>Read &rarr;</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageBlogCards() {
    return (
        <>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Heading as="h1">Recent Adventures</Heading>
        </div>
        <div className="container">
            <div className="row">
                {recentPosts.map((post) => (
                    <BlogCard
                        key={post.id}
                        permalink={post.metadata.permalink}
                        title={post.metadata.title}
                        date={post.metadata.date}
                        authors={post.metadata.authors} // Pass the full array
                        tags={post.metadata.tags} // Pass the full array
                        frontmatter={post.metadata.frontMatter}
                    />
                ))}
            </div>
        </div>
        </>
    );
}