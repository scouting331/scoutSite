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
import BrowserOnly from "@docusaurus/BrowserOnly";
import troop_icon from "/img/map-marker/troop-marker.png";
import cub_icon from "/img/map-marker/cub-marker.png";
import Heading from "@theme/Heading";

/**
 * Generates the map canvas engine, pins geolocation coordinate items, and configurations 
 * custom PNG image sizes for mapping markers. Runs explicitly in client context.
 * 
 * @component
 * @private
 * @requires leaflet - Required inside execution context for SSR mitigation.
 * @requires react-leaflet - Required inside execution context for SSR mitigation.
 * @returns {React.JSX.Element} Leaflet container node engine matching the assigned dimensions.
 */
function Map() {
  const L = require("leaflet");
  const { MapContainer, TileLayer, Marker, Popup } = require("react-leaflet");
  require("leaflet/dist/leaflet.css");

  const troopIcon = new L.Icon({
    iconUrl: troop_icon,
    iconSize: [46, 70], // width, height in pixels
    iconAnchor: [23, 70], // point of icon that corresponds to marker's location
    popupAnchor: [0, -70], // point from which popup should open relative to iconAnchor
  });

  const cubIcon = new L.Icon({
    iconUrl: cub_icon,
    iconSize: [46, 70], // width, height in pixels
    iconAnchor: [23, 70], // point of icon that corresponds to marker's location
    popupAnchor: [0, -70], // point from which popup should open relative to iconAnchor
  });

  return (
    <MapContainer
      center={[39.83398, -86.38716]}
      zoom={14}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[39.84048, -86.387]} icon={troopIcon}>
        <Popup>
          <Heading as="h4">American Legion Post 331</Heading>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=American+Legion+Post+331+636+E+Main+St,+Brownsburg,+IN+46112,+United+States"
            target="_blank"
            rel="noopener noreferrer">
              Get Directions
          </a>
        </Popup>
      </Marker>
      <Marker position={[39.82795329321996, -86.38975014166927]} icon={cubIcon}>
        <Popup>
          <Heading as="h4">Eagle Elementary School</Heading>
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=Eagle+Elementary+School+555+Sycamore+St,+Brownsburg,+IN+46112-1879,+United+States"
            target="_blank"
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
    <BrowserOnly fallback={<div>Loading Map...</div>}>
      {() => <Map />}
    </BrowserOnly>
  );
}
