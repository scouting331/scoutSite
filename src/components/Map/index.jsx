/**
 * @file index.jsx
 * @description Renders an interactive OpenStreetMap engine using Leaflet.
 * Displays custom-icon location markers for Scouting units with automated Google Maps directions.
 * Wraps implementation in a client-side layout shell to prevent node SSR build errors.
 * 
 * @module MapWrapper
 * @requires React
 * @requires @docusaurus/BrowserOnly
 * @requires @theme/Heading
 * @requires leaflet
 * @requires react-leaflet
 */

import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";        // Docusaurus isolation utility that prevents code from executing on Node.js servers
import troop_icon from "/img/map-marker/troop-marker.png"; // Custom map pin illustration graphic path for Boy/Girl Troops
import cub_icon from "/img/map-marker/cub-marker.png";     // Custom map pin illustration graphic path for Cub Scout Packs
import Heading from "@theme/Heading";                        // Structural theme heading component enforcing standard semantic HTML tags

/**
 * Generates the map canvas engine, pins geolocation coordinate items, and configures 
 * custom PNG image sizes for mapping markers. Runs explicitly in client context.
 * 
 * @component
 * @private
 * @requires leaflet - Required inside execution context for SSR mitigation.
 * @requires react-leaflet - Required inside execution context for SSR mitigation.
 * @returns {React.JSX.Element} Leaflet container node engine matching the assigned dimensions.
 */
function Map() {
  // CRITICAL: Require mapping dependencies inline inside this client-only context.
  // Standard top-level ES6 imports would crash Node.js at build time because Leaflet demands a browser 'window' object.
  const L = require("leaflet");
  const { MapContainer, TileLayer, Marker, Popup } = require("react-leaflet");
  require("leaflet/dist/leaflet.css");                     // Imports Leaflet's mandatory core structural CSS layout rules

  // Configures sizing matrices for the dynamic Troop map marker vector pin graphics
  const troopIcon = new L.Icon({
    iconUrl: troop_icon,
    iconSize: [46, 70],      // Width and height bounding dimensions of the target icon file in pixels
    iconAnchor: [23, 70],    // The specific pixel location node [X, Y] aligned directly over the geographic coordinate point
    popupAnchor: [0, -70],   // Coordinate offset calculation determining where information cards pop open relative to the anchor
  });

  // Configures sizing matrices for the dynamic Cub Scout map marker vector pin graphics
  const cubIcon = new L.Icon({
    iconUrl: cub_icon,
    iconSize: [46, 70], 
    iconAnchor: [23, 70], 
    popupAnchor: [0, -70], 
  });

  return (
    // Base layout node initializing map canvas center view calculations and default resolution tracking zoom multipliers
    <MapContainer
      center={[39.83398, -86.38716]}                        // Global coordinate map grid center locking onto Brownsburg, IN
      zoom={14}                                             // Initial tracking altitude magnification level (street scale)
      style={{ height: "400px", width: "100%" }}            // Canvas size footprint constraint assignments
    >
      {/* Fetches and renders OpenStreetMap's geographical background terrain illustration tiles dataset */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* --- MARKER 1: American Legion Post 331 (Troop Meeting Site) --- */}
      <Marker position={[39.840723187779375, -86.38687161128375]} icon={troopIcon}>
        <Popup>                                             {/* Floating display tooltip card opening on user interaction paths */}
          <Heading as="h4">American Legion Post 331</Heading>
          {/* Universal high-contrast direction routing query mapping string targeting native tracking apps */}
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=American+Legion+Post+331+636+E+Main+St,+Brownsburg,+IN+46112,+United+States"
            target="_blank"                                 // Spawns links within completely clean browser subwindows
            rel="noopener noreferrer">                      // Security parameters masking data leakage transfers across foreign servers
              Get Directions
          </a>
        </Popup>
      </Marker>
      
      {/* --- MARKER 2: Eagle Elementary School (Pack Meeting Site) --- */}
      <Marker position={[39.82795329321996, -86.38975014166927]} icon={cubIcon}>
        <Popup>
          <Heading as="h4">Eagle Elementary School</Heading>
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=Eagle+Elementary+School+555+Sycamore+St,+Brownsburg,+IN+46112-1879,+United+States"
            target="_blank: text"
            rel="noopener noreferrer">
              Get Directions
          </a>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

/**
 * Main module exporter wrapping the Map subcomponent inside a client safe guard.
 * Prevents window canvas missing errors from breaking automated deployment pipelines.
 * 
 * @component
 * @returns {React.JSX.Element} A fallback element container or the instantiated live client map frame.
 */
export default function MapWrapper() {
  return (
    // Replaces the element during build steps with a static text block until browser engines activate execution pipelines
    <BrowserOnly fallback={<div>Loading Map...</div>}>
      {/* Lazy-mounts the complete map framework only inside active web browser clients */}
      {() => <Map />}
    </BrowserOnly>
  );
}
