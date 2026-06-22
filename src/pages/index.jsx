/**
 * @file index.jsx
 * @description The main homepage component for American Legion Post 331 Scouting Units.
 * Assembles the landing page layout structure by combining the top branding hero banner carousel,
 * responsive scouting unit grid features, dynamic recent blog posts, and integrated group calendars.
 * 
 * @module Home
 * @requires React
 * @requires @theme/Layout
 * @requires @docusaurus/useDocusaurusContext
 * @requires @site/src/components/HeroCarousel
 * @requires @site/src/components/HomepageFeatures
 * @requires @site/src/components/BlogCard
 * @requires @site/src/components/UpcomingEvents
 */

import Layout from "@theme/Layout";                        // Imports the global Docusaurus scaffolding layout (injects top navigation bars, mobile menus, and site footers)
import HomepageFeatures from "@site/src/components/HomepageFeatures"; // Layout component grid highlighting the active units (Troop 303, Pack 303, etc.)
import UpcomingEvents from "@site/src/components/UpcomingEvents";     // Calendar aggregator component mapping out global group schedules
import HeroCarousel from "@site/src/components/HeroCarousel";         // Autoplay picture slideshow component anchoring home recruitment copy
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"; // System configuration context hook fetching variables from docusaurus.config.js
import HomepageBlogCards from "@site/src/components/BlogCard";       // Grid section displaying the most recent adventure posts on the site

/**
 * Renders the master homepage structure wrapped within the global Docusaurus layout framework.
 * Pulls SEO metadata variables dynamically from the system `siteConfig` file.
 * 
 * @component
 * @returns {React.JSX.Element} The fully assembled homepage template.
 */
export default function Home() {
  // Pulls system metadata configurations directly out of your repository's central workspace environment config layer
  const { siteConfig } = useDocusaurusContext();
  return (
    // Wraps everything inside the global frame layout, providing clean search engine metadata mapping arguments
    <Layout
      title={`${siteConfig.title}`}                          // Pulls the title value string (e.g., "Brownsburg Scouts") to map HTML tab titles
      description="Home of the Scouting Units of American Legion Post 331" // Sets search engine description headers for optimal indexing results
    >
      {/* Dynamic top carousel block containing background imagery and main onboarding buttons */}
      <HeroCarousel />
      
      {/* Semantic main HTML content workspace block containing standard page subdivisions */}
      <main>
        {/* Row block section mapping out grid profiles for each charter scouting unit */}
        <HomepageFeatures />
        
        {/* Row block section displaying a grid of recent blog entries compiled on the server */}
        <HomepageBlogCards />
        
        {/* Row block section mounting the responsive multi-unit shared schedule overview frame */}
        <UpcomingEvents />
      </main>
    </Layout>
  );
}

