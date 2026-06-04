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

import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import UpcomingEvents from "@site/src/components/UpcomingEvents";
import HeroCarousel from "../components/HeroCarousel/HeroCarousel";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HomepageBlogCards from "../components/BlogCard";

/**
 * Renders the master homepage structure wrapped within the global Docusaurus layout framework.
 * Pulls SEO metadata variables dynamically from the system `siteConfig` file.
 * 
 * @component
 * @returns {React.JSX.Element} The fully assembled homepage template.
 */
export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Home of the Scouting Units of American Legion Post 331"
    >
      <HeroCarousel />
      <main>
        <HomepageFeatures />
        <HomepageBlogCards />
        <UpcomingEvents />
      </main>
    </Layout>
  );
}
