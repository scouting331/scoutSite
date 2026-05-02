import recentPosts from "@site/.docusaurus/recent-posts.json";
import React from "react";
import Link from '@docusaurus/Link';
import clsx from "clsx";
import styles from './styles.module.css';
import Heading from '@theme/Heading';
import recentPosts from '@site/.docusaurus/recent-posts.json';
import defaultBlogHeader from '@site/static/img/blog-covers/default-blog-cover.jpg';
import useBaseUrl from "@docusaurus/useBaseUrl";

const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
};

function BlogCard({ permalink, title, date, authors, tags, frontmatter }) {
  const coverImgUrl = useBaseUrl(
    frontmatter.cover_image
        ? `/img/blog-covers/${frontmatter.cover_image}`
        : defaultBlogHeader
  );

  return (
    <div className={clsx("col col--3 margin-bottom--lg")}>
      <Link to={permalink} className={styles.blogCard}>
        
        <div className={styles.cardHeader}>
           {/* You can replace this with a specific post image if available */}
          <img 
            src={coverImgUrl} 
            alt={title} 
            className={styles.cardImage} 
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