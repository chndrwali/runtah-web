"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import PageContainer from "@/components/custom/page-container";
import { MapSidebar, WasteBank } from "../components/maps/map-sidebar";
import { Loader2 } from "lucide-react";

// Dynamically import Leaflet MapClient with no SSR to avoid window is not defined errors
const MapClient = dynamic(() => import("../components/maps/map-client"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-100 dark:bg-slate-900 rounded-2xl flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800 text-slate-500">
      <Loader2 className="size-8 animate-spin mb-4 text-primary" />
      <span className="text-sm font-medium animate-pulse">Memuat Peta...</span>
    </div>
  ),
});

// Dummy Data
const DUMMY_BANKS: WasteBank[] = [
  {
    id: "bank-1",
    name: "Bank Sampah Indrawati",
    lat: -6.8906,
    lng: 107.6105,
    distance: 1.2,
    address: "Jl. Indrawati No. 45, Coblong",
    isOpen: true,
    types: ["Plastik", "Kertas"],
  },
  {
    id: "bank-2",
    name: "Unit Dago Resik",
    lat: -6.8833,
    lng: 107.6156,
    distance: 2.5,
    address: "Jl. Dago No. 112, Bandung",
    isOpen: true,
    types: ["Plastik", "Logam", "Kaca"],
  },
  {
    id: "bank-3",
    name: "Cibiru Asri Center",
    lat: -6.9312,
    lng: 107.7183,
    distance: 4.1,
    address: "Komplek Cibiru Asri Blok C",
    isOpen: false,
    types: ["Kertas", "Organik"],
  },
  {
    id: "bank-4",
    name: "Pusat Daur Ulang Ganesha",
    lat: -6.8924,
    lng: 107.6111,
    distance: 1.8,
    address: "Jl. Ganesha No. 10, LBH",
    isOpen: true,
    types: ["Semua"],
  },
];

const DEFAULT_CENTER: [number, number] = [-6.914744, 107.60981]; // Bandung defaults

export const MapsSection = () => {
  const trpc = useTRPC();
  const { data: userData, isLoading } = useQuery(
    trpc.auth.getCoordinates.queryOptions(),
  );

  const [activeBankId, setActiveBankId] = useState<string | null>(null);

  const userPosition: [number, number] =
    userData?.lat && userData?.lng
      ? [userData.lat, userData.lng]
      : DEFAULT_CENTER;

  // Real world implementation would compute distance between userPosition and bank
  // For now, we use the dummy distance

  return (
    <PageContainer
      pageTitle="Cari Bank Sampah Terdekat"
      pageDescription=""
      scrollable={false}
    >
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden -mx-4 -mb-4 md:-mx-6 md:-mb-6 border-t border-slate-200 dark:border-slate-800">
        <MapSidebar
          wasteBanks={DUMMY_BANKS}
          activeBankId={activeBankId}
          onSelectBank={setActiveBankId}
        />
        <div className="flex-1 p-0 lg:p-6 bg-slate-50 dark:bg-slate-950 relative min-h-[400px]">
          <MapClient
            userPosition={userPosition}
            wasteBanks={DUMMY_BANKS}
            activeBankId={activeBankId}
          />
        </div>
      </div>
    </PageContainer>
  );
};
