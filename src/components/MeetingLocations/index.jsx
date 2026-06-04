/**
 * @file index.jsx
 * @description Renders a responsive dashboard layout displaying scouting unit meeting schedules and locations.
 * Combines stylized text breakdown data cards with a live client side interactive map canvas frame.
 * 
 * @module MeetingLocations
 * @requires React
 * @requires @site/static/img/pack-icon.png
 * @requires @site/static/img/troop-icon.png
 * @requires @site/src/components/MapWrapper
 */

import React from "react";
import PackPng from "@site/static/img/pack-icon.png";
import TroopsPng from "@site/static/img/troop-icon.png";
import MapWrapper from "@site/src/components/Map";

/**
 * Renders an informational split layout section for organization meeting details and maps.
 * 
 * @component
 * @returns {React.JSX.Element} A flexible grid housing scheduling panels and maps.
 */
export default function MeetingLocations() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', margin: '2rem 0' }}>
      
      {/* Left Side: Clean Visual Information Cards */}
      <div style={{ flex: '1 1 450px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* Card 1: Pack 303 */}
        <div style={{ padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--ifm-toc-border-color)', backgroundColor: 'var(--ifm-background-color)', boxShadow: 'var(--global-box-shadow)' }}>
          <h3 style={{ color: 'var(--scouting-america-blue)', marginTop: 0, marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'flex-end', gap: '0.75rem' }}>
            <img src={PackPng} alt="Pack Icon" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
            <span style={{ lineHeight: '1.1' }}>Cub Scout Pack 303 <span style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)', fontWeight: 'normal' }}>(Grades K-5)</span></span>
          </h3>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}><strong>When:</strong> Tuesdays (School Year) | <strong>6:45 PM – 7:45 PM</strong></p>
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--ifm-color-emphasis-700)' }}>
            📍 <strong>Eagle Elementary School</strong><br />
            555 Sycamore St, Brownsburg, IN 46112
          </p>
        </div>

        {/* Card 2: Troops 303 & 331 */}
        <div style={{ padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--ifm-toc-border-color)', backgroundColor: 'var(--ifm-background-color)', boxShadow: 'var(--global-box-shadow)' }}>
          <h3 style={{ color: 'var(--scouts-bsa-olive)', marginTop: 0, marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'flex-end', gap: '0.75rem' }}>
            <img src={TroopsPng} alt="Troop Icon" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
            <span style={{ lineHeight: '1.1' }}> Troops 303 (Boys) & 331 (Girls) <span style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)', fontWeight: 'normal' }}>(Ages 11-17)</span></span>
          </h3>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}><strong>When:</strong> Every Tuesday (Year-Round) | <strong>6:30 PM – 8:00 PM</strong></p>
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--ifm-color-emphasis-700)' }}>
            📍 <strong>American Legion Post 331</strong><br />
            636 E Main St, Brownsburg, IN 46112
          </p>
        </div>

      </div>

      {/* Right Side: Interactive Map */}
      <div style={{ flex: '1 1 350px', minHeight: '300px', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--global-box-shadow)' }}>
        <MapWrapper />
      </div>

    </div>
  );
}
