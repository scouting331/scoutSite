/**
 * @file index.jsx
 * @description Renders the centered dashboard for upcoming organization activities.
 * Integrates an embedded Google Calendar iframe that aggregates schedule feeds from multiple 
 * unit branches (Troop, Pack, Crew, US Holidays) with custom brand-color mapping.
 * 
 * @module UpcomingEvents
 * @requires React
 * @requires @theme/Heading
 */

import Heading from "@theme/Heading";

/**
 * Renders an iframe-based aggregated Google Calendar matching layout container constraints.
 * 
 * @component
 * @param {Object} props - Component properties (currently unmapped).
 * @returns {React.JSX.Element} A layout section displaying interactive event schedules.
 */
export default function UpcomingEvents({}) {
  return (
    <div className="container">
      <Heading as="h1" className="text--center">
        Upcoming Events
      </Heading>
      <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FIndiana%2FIndianapolis&showPrint=0&showTitle=0&showTz=0&src=NW1yb3JjYWtkMTA2a3U1YjNjYTNvamRmaDBjM3I3c3RAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZDR2NHFiaXE3anYxZDQxOWRhaGh2dWJhNGVxZDhya3BAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=cDN1cDBlbWsxOWFkOXFrdG1rOW84dWNuN3ZmMjBnOTdAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=cmdkYmNwYWcwazg0b3FtbWs3bWF0bTRmYzUwdW4zcmVAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23006b3f&color=%23d6cebd&color=%23003f87&color=%23ce1126&color=%23fcd116"
        style={{ border: 0 }} 
        width="100%" 
        height="600" 
        frameBorder="0" 
        scrolling="no"
      ></iframe>
    </div>
  );
}
