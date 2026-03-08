"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon in leaflet with Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface LocationPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
  defaultPosition?: [number, number];
}

function LocationMarker({
  onLocationSelect,
  position,
  setPosition,
}: LocationPickerProps & {
  position: L.LatLng | null;
  setPosition: (pos: L.LatLng) => void;
}) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position === null ? null : <Marker position={position} icon={icon} />;
}

export default function LocationPicker({
  onLocationSelect,
  defaultPosition = [-6.914744, 107.60981], // Default to Bandung center
}: LocationPickerProps) {
  const [position, setPosition] = useState<L.LatLng | null>(
    defaultPosition ? L.latLng(defaultPosition[0], defaultPosition[1]) : null,
  );

  return (
    <div className="w-full h-48 rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 relative z-0">
      <MapContainer
        center={defaultPosition}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          onLocationSelect={onLocationSelect}
          position={position}
          setPosition={setPosition}
        />
      </MapContainer>
    </div>
  );
}
