/**
 * @file index.jsx
 * @description Renders a responsive dashboard layout displaying scouting unit meeting schedules and locations.
 * Combines stylized text breakdown data cards with a live client side interactive map canvas frame.
 * 
 * @module MeetingLocations
 * @requires React
 * @requires @site/static/img/logos/pack-icon.png
 * @requires @site/static/img/logos/troop-icon.png
 * @requires @site/src/components/MapWrapper
 */

import React from "react";
import PackPng from "@site/static/img/logos/pack-icon.png";  // Local asset compilation path for the Cub Scout branding icon
import TroopsPng from "@site/static/img/logos/troop-icon.png"; // Local asset compilation path for the Scouts BSA branding icon
import MapWrapper from "@site/src/components/Map";          // Imports the client-side safe isolated interactive map canvas frame

/**
 * Renders an informational split layout section for organization meeting details and maps.
 * 
 * @component
 * @returns {React.JSX.Element} A flexible grid housing scheduling panels and maps.
 */
export default function MeetingLocations() {
  return (
    // Top-level Flexbox grid dashboard layout workspace bounding container
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', margin: '2rem 0' }}>
      
      {/* -------------------------------------------------------------------
          LEFT SIDE: Clean Visual Information Cards Panel
          ------------------------------------------------------------------- */}
      {/* Allocates a flexible base width of 450px; stacks information cards into a tight vertical layout */}
      <div style={{ flex: '1 1 450px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* --- CARD 1: Cub Scout Pack 303 Schedule Info Block --- */}
        <div style={{ padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--ifm-toc-border-color)', backgroundColor: 'var(--ifm-background-color)', boxShadow: 'var(--global-box-shadow)' }}>
          {/* Section heading displaying branding colors, using inline flex layout properties to align vector icon graphics */}
          <h3 style={{ color: 'var(--scouting-america-blue)', marginTop: 0, marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'flex-end', gap: '0.75rem' }}>
            <img src={PackPng} alt="Pack Icon" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
            <span style={{ lineHeight: '1.1' }}>Cub Scout Pack 303 <span style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)', fontWeight: 'normal' }}>(Grades K-5)</span></span>
          </h3>
          {/* Weekly calendar schedule entry parameters block */}
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}><strong>When:</strong> Tuesdays (School Year) | <strong>6:45 PM – 7:45 PM</strong></p>
          {/* Geographic baseline physical location description typography parameter lines */}
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--ifm-color-emphasis-700)' }}>
            📍 <strong>Eagle Elementary School</strong><br />
            555 Sycamore St, Brownsburg, IN 46112
          </p>
        </div>

        {/* --- CARD 2: Troops 303 & 331 Schedule Info Block --- */}
        <div style={{ padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--ifm-toc-border-color)', backgroundColor: 'var(--ifm-background-color)', boxShadow: 'var(--global-box-shadow)' }}>
          {/* Section heading displaying Scouts BSA olive branding theme colors across localized layouts */}
          <h3 style={{ color: 'var(--scouts-bsa-olive)', marginTop: 0, marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'flex-end', gap: '0.75rem' }}>
            <img src={TroopsPng} alt="Troop Icon" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
            <span style={{ lineHeight: '1.1' }}> Troops 303 (Boys) & 331 (Girls) <span style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)', fontWeight: 'normal' }}>(Ages 11-17)</span></span>
          </h3>
          {/* Year-round calendar schedule entry parameters block */}
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}><strong>When:</strong> Every Tuesday (Year-Round) | <strong>6:30 PM – 8:00 PM</strong></p>
          {/* Geographic baseline physical location description typography parameter lines */}
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--ifm-color-emphasis-700)' }}>
            📍 <strong>American Legion Post 331</strong><br />
            636 E Main St, Brownsburg, IN 46112
          </p>
        </div>

      </div>

      {/* -------------------------------------------------------------------
          RIGHT SIDE: Client-Safe Interactive Map Canvas Component
          ------------------------------------------------------------------- */}
      {/* Allocates a flexible base width of 350px; clips map dimensions inside uniform borders and shadows */}
      <div style={{ flex: '1 1 350px', minHeight: '300px', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--global-box-shadow)' }}>
        <MapWrapper />                      {/* Instantiates the live client-facing geolocation map mapping workspace frame */}
      </div>

    </div>
  );
}
