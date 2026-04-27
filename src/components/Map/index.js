import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

function Map() {
  const L = require('leaflet');
  const { MapContainer, TileLayer, Marker, Popup } = require('react-leaflet');
  require('leaflet/dist/leaflet.css');

  const troopIcon = new L.Icon ({
    iconUrl: '/img/map-marker/troop-marker.png',
    iconRetinaUrl: '/img/map-marker/troop-marker.png',
    iconSize: [23, 35], // width, height in pixels
    iconAnchor: [17, 35], // point of icon that corresponds to marker's location
    popupAnchor: [0, -35], // point from which popup should open relative to iconAnchor
  });

  const cubIcon = new L.Icon ({
    iconUrl: '/img/map-marker/cub-marker.png',
    iconRetinaUrl: '/img/map-marker/cub-marker.png',
    iconSize: [23, 35], // width, height in pixels
    iconAnchor: [17, 35], // point of icon that corresponds to marker's location
    popupAnchor: [0, -35], // point from which popup should open relative to iconAnchor
  });
  
  return (
    <MapContainer center={[39.83398, -86.38716]} zoom={14} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[39.84048, -86.387]} icon={troopIcon}>
        <Popup>American Legion Post 331<br />Troop 303<br />Troop 331<br />Crew 303</Popup>
      </Marker>
      <Marker position={[39.82795329321996, -86.38975014166927]} icon={cubIcon}>
        <Popup>Eagle Elementary School<br />Pack 303</Popup>
      </Marker>
    </MapContainer>
  );
}

export default function MapWrapper() {
  return (
    <BrowserOnly fallback={<div>Loading Map...</div>}>
      {() => <Map />}
    </BrowserOnly>
  );
}