import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import UpcomingEvents from '@site/src/components/UpcomingEvents';
import HeroCarousel from '../components/HeroCarousel';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';


export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Home of the Scouting Units of American Legion Post 331">
      <HeroCarousel />
      <main>
        <HomepageFeatures />
        <h1 className="text--center">Upcoming Events</h1>
        <iframe id="open-web-calendar" 
          src="https://open-web-calendar.hosted.quelltext.eu/calendar.html?css=.CALENDAR-INDEX-0%2C%20.CALENDAR-INDEX-0%20.dhx_body%2C%20.CALENDAR-INDEX-0%20.dhx_title%20%20%7B%20background-color%3A%20%23fcd116%3B%20%7D%20%0A.CALENDAR-INDEX-1%2C%20.CALENDAR-INDEX-1%20.dhx_body%2C%20.CALENDAR-INDEX-1%20.dhx_title%20%20%7B%20background-color%3A%20%23d6cebd%3B%20%7D%20%0A&amp;event_url_geo=https%3A%2F%2Fwww.google.com%2Fmaps%2F%40%7Blat%7D%2C%7Blon%7D%2C%7Bzoom%7Dz&amp;event_url_location=https%3A%2F%2Fwww.google.com%2Fmaps%2Fsearch%2F%7Blocation%7D&amp;hour_format=%25g%3A%25i%E2%80%AF%25a&amp;loader=&amp;menu_shows_title=false&amp;skin=flat&amp;start_of_week=su&amp;tabs=month&amp;target=_blank&amp;timezone=America%2FNew_York&amp;title=Upcoming%20Events&amp;url=https%3A%2F%2Fapi.scouting.org%2Fadvancements%2Fevents%2Fcalendar%2F51646&amp;url=https%3A%2F%2Fapi.scouting.org%2Fadvancements%2Fevents%2Fcalendar%2F48074"
          sandbox="allow-scripts allow-same-origin allow-popups allow-downloads allow-popups-to-escape-sandbox"
          allowTransparency="true" scrolling="no" 
          frameborder="0" height="552px" width="70%"></iframe>
      </main>
    </Layout>
  );
}
