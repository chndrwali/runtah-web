"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  ZoomControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default icons if falling back
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface WasteBank {
  id: string;
  name: string;
  lat: number;
  lng: number;
  distance: number; // km
  address: string;
  isOpen: boolean;
}

interface MapClientProps {
  userPosition: [number, number];
  wasteBanks: WasteBank[];
  activeBankId?: string | null;
}

// Custom hook to center map when position changes or bank selected
function MapCenterer({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 14, { duration: 1.5 });
  }, [position, map]);
  return null;
}

export default function MapClient({
  userPosition,
  wasteBanks,
  activeBankId,
}: MapClientProps) {
  // Custom Icon for User
  const userIcon = L.divIcon({
    className: "custom-leaflet-icon",
    html: `
      <div class="group cursor-pointer">
        <div class="flex items-center gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded shadow-lg border border-slate-200/50 dark:border-slate-800/50 absolute -translate-x-1/2 -mt-8 whitespace-nowrap">
            <div class="size-2 rounded-full bg-blue-500"></div>
            <span class="text-[10px] font-bold text-slate-800 dark:text-slate-200">Lokasi Anda</span>
        </div>
        <div class="size-4 bg-blue-500/40 rounded-full border-2 border-blue-500 group-hover:scale-110 transition-transform absolute -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });

  // Function to generate bank icon
  const createBankIcon = (bank: WasteBank, isActive: boolean) => {
    return L.divIcon({
      className: "custom-leaflet-icon",
      html: `
        <div class="relative flex flex-col items-center group -ml-[0.5px]">
          ${
            isActive
              ? `
            <div class="bg-white dark:bg-slate-900 border border-primary px-3 py-1.5 rounded-lg shadow-lg mb-1 flex items-center gap-2 absolute bottom-full whitespace-nowrap transform -translate-x-1/2 left-1/2 z-50">
              <div class="size-2 rounded-full bg-primary animate-pulse"></div>
              <span class="text-[10px] font-bold whitespace-nowrap text-slate-800 dark:text-slate-200">${bank.name}</span>
            </div>
          `
              : ""
          }
          <div class="size-6 bg-primary rounded-full border-4 ${isActive ? "border-white dark:border-slate-900" : "border-white/50 dark:border-slate-900/50"} shadow-xl flex items-center justify-center absolute -translate-x-1/2 -translate-y-1/2 z-40 transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}">
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-4.126-6.835"/><path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 7.196 9.5 3.1 10.598"/><path d="m9.344 5.811 1.093-1.812A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/><path d="m13.378 9.633 4.096-1.098 1.097 4.096"/></svg>
          </div>
          <div class="w-0.5 h-4 bg-primary absolute top-0 -translate-x-1/2 z-30 opacity-80"></div>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
    });
  };

  const centerPos = activeBankId
    ? ([
        wasteBanks.find((b) => b.id === activeBankId)?.lat || userPosition[0],
        wasteBanks.find((b) => b.id === activeBankId)?.lng || userPosition[1],
      ] as [number, number])
    : userPosition;

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden relative border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-50 dark:bg-slate-950">
      <MapContainer
        center={centerPos}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full z-10"
        zoomControl={false}
      >
        {/* Abstract/Minimal map layer using CartoDB Positron for cleaner look */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          className="map-tiles dark:invert dark:hue-rotate-180 dark:brightness-75"
        />

        <ZoomControl position="bottomright" />
        <MapCenterer position={centerPos} />

        <Marker position={userPosition} icon={userIcon} />

        {wasteBanks.map((bank) => (
          <Marker
            key={bank.id}
            position={[bank.lat, bank.lng]}
            icon={createBankIcon(bank, activeBankId === bank.id)}
            zIndexOffset={activeBankId === bank.id ? 1000 : 0}
          ></Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute top-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-4 py-2 rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-800/50 z-20 pointer-events-none">
        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-primary"></div>
            <span>PUSAT DROP-OFF</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-blue-500"></div>
            <span>LOKASI ANDA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
