import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import UpcomingEvents from "@site/src/components/UpcomingEvents";
import HeroCarousel from "../components/HeroCarousel/HeroCarousel";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HomepageBlogCards from "../components/BlogCard";

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
