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

import Heading from "@theme/Heading";                        // Structural theme heading component enforcing standard semantic HTML tags

/**
 * Renders an iframe-based aggregated Google Calendar matching layout container constraints.
 * 
 * @component
 * @param {Object} props - Component properties (currently unmapped).
 * @returns {React.JSX.Element} A layout section displaying interactive event schedules.
 */
export default function UpcomingEvents({}) {
  return (
    // Outer responsive grid framework container centering the layout section block horizontally
    <div className="container">
      {/* Centered primary header title using the swappable Infima alignment utility class */}
      <Heading as="h1" className="text--center">
        Upcoming Events
      </Heading>
      
      {/* 
        Embedded Google Calendar Component
        Aggregates multiple underlying .ics data feeds into a unified display window.
        
        URL Parameter Breakdown:
        - height=600 / height="600": Establishes locked viewport height allocations in pixels
        - wkst=1: Mandates that the calendar grid weeks begin explicitly on Monday
        - ctz=America%2FIndiana%2FIndianapolis: Locks timezone coordinates to Eastern Time (US)
        - showPrint=0 / showTitle=0 / showTz=0: Cleans UI clutter by disabling print, titles, and timezone text
        
        Feed Sources (`src` hashes):
        - NW1...7sta: Troop 303 Schedule
        - en.usa#holiday: Standard United States Public Holidays
        - d4v...8rkp: Troop 331 Schedule
        - p3u...g97a: Cub Scout Pack 303 Schedule
        - rgd...3rea: Venturing Crew 303 Schedule
        
        Brand Hex Color Palette Maps (`color` codes):
        - %23006b3f: Scouts BSA Olive Green (#006b3f)
        - %23d6cebd: Scouting America Tan (#d6cebd)
        - %23003f87: Cub Scouts Blue (#003f87)
        - %23ce1126: Holiday / Alert Red (#ce1126)
        - %23fcd116: Cub Scouts Gold (#fcd116)
      */}
      <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FIndiana%2FIndianapolis&showPrint=0&showTitle=0&showTz=0&src=NW1yb3JjYWtkMTA2a3U1YjNjYTNvamRmaDBjM3I3c3RAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZDR2NHFiaXE3anYxZDQxOWRhaGh2dWJhNGVxZDhya3BAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=cDN1cDBlbWsxOWFkOXFrdG1rOW84dWNuN3ZmMjBnOTdAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=cmdkYmNwYWcwazg0b3FtbWs3bWF0bTRmYzUwdW4zcmVAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23006b3f&color=%23d6cebd&color=%23003f87&color=%23ce1126&color=%23fcd116"
        style={{ border: 0 }}                               // Inline React style override removing default browser iframe boarders
        width="100%"                                        // Fluid width filling the entire horizontal row boundary box
        height="600" 
        frameBorder="0"                                     // Legacy layout attribute compatibility lock for older browsers
        scrolling="no"                                      // Suppresses double scrolling bars to preserve parent page scrolling flows
      ></iframe>
    </div>
  );
}

