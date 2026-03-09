"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import PageContainer from "@/components/custom/page-container";
import { MapSidebar, WasteBank } from "../components/maps/map-sidebar";
import { Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

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

// 15 Realistic Hardcoded Bandung Waste Banks/TPST Points
const BANDUNG_WASTE_BANKS: WasteBank[] = [
  {
    id: "bank-1",
    name: "Bank Sampah Bersinar (BSB)",
    lat: -6.9587,
    lng: 107.6331,
    distance: 3.2,
    address: "Jl. Terusan Bojongsoang, Baleendah",
    isOpen: true,
    types: ["Plastik", "Kertas", "Logam", "Kaca"],
  },
  {
    id: "bank-2",
    name: "TPS Sabuga (ITB)",
    lat: -6.8876,
    lng: 107.6091,
    distance: 1.5,
    address: "Area Sabuga, Lebak Siliwangi",
    isOpen: true,
    types: ["Semua"],
  },
  {
    id: "bank-3",
    name: "Bank Sampah Induk (BSI) Kota Bandung",
    lat: -6.9248,
    lng: 107.6329,
    distance: 2.1,
    address: "Jl. Babakan Surabaya, Kiaracondong",
    isOpen: true,
    types: ["Plastik", "Kertas", "Logam"],
  },
  {
    id: "bank-4",
    name: "TPST Babakan Siliwangi",
    lat: -6.8837,
    lng: 107.6063,
    distance: 1.8,
    address: "Jl. Siliwangi, Cipaganti",
    isOpen: true,
    types: ["Organik", "Kertas"],
  },
  {
    id: "bank-5",
    name: "TPS Tegallega",
    lat: -6.9362,
    lng: 107.6033,
    distance: 4.5,
    address: "Taman Konservasi Tegallega, Astana Anyar",
    isOpen: true,
    types: ["Semua"],
  },
  {
    id: "bank-6",
    name: "Bank Sampah Kertabumi",
    lat: -6.9113,
    lng: 107.6341,
    distance: 3.0,
    address: "Gedung Pusat Da'wah, Jl. Kertabumi",
    isOpen: true,
    types: ["Plastik", "Kertas"],
  },
  {
    id: "bank-7",
    name: "TPS Ciroyom",
    lat: -6.9133,
    lng: 107.5855,
    distance: 5.2,
    address: "Pasar Ciroyom, Andir",
    isOpen: false,
    types: ["Semua"],
  },
  {
    id: "bank-8",
    name: "Unit Dago Resik",
    lat: -6.8833,
    lng: 107.6156,
    distance: 2.5,
    address: "Jl. Dago No. 112, Coblong",
    isOpen: true,
    types: ["Plastik", "Logam", "Kaca"],
  },
  {
    id: "bank-9",
    name: "Bank Sampah Hijau Lestari",
    lat: -6.9171,
    lng: 107.6369,
    distance: 2.9,
    address: "Jl. Supratman, Cihapit",
    isOpen: true,
    types: ["Plastik", "Kertas"],
  },
  {
    id: "bank-10",
    name: "TPST Panjunan",
    lat: -6.9252,
    lng: 107.5968,
    distance: 3.8,
    address: "Jl. Panjunan, Astana Anyar",
    isOpen: true,
    types: ["Organik", "Semua"],
  },
  {
    id: "bank-11",
    name: "TPS Gedebage (Pusat)",
    lat: -6.9427,
    lng: 107.6896,
    distance: 8.5,
    address: "Pasar Induk Gedebage",
    isOpen: true,
    types: ["Semua"],
  },
  {
    id: "bank-12",
    name: "Pusat Daur Ulang Antapani",
    lat: -6.9198,
    lng: 107.6568,
    distance: 5.1,
    address: "Kecamatan Antapani",
    isOpen: false,
    types: ["Plastik", "Kertas", "Logam"],
  },
  {
    id: "bank-13",
    name: "Bank Sampah Sukaluyu",
    lat: -6.8924,
    lng: 107.6253,
    distance: 2.3,
    address: "Jl. Sukaluyu Raya, Cibeunying",
    isOpen: true,
    types: ["Plastik", "Logam"],
  },
  {
    id: "bank-14",
    name: "Bank Sampah Melati Bersih",
    lat: -6.8643,
    lng: 107.5936,
    distance: 6.0,
    address: "Sukasari, Bandung Utara",
    isOpen: true,
    types: ["Plastik"],
  },
  {
    id: "bank-15",
    name: "TPS Cikutra",
    lat: -6.8931,
    lng: 107.6394,
    distance: 3.5,
    address: "Cikutra Barat, Cibeunying Kaler",
    isOpen: true,
    types: ["Semua"],
  },
];

const DEFAULT_CENTER: [number, number] = [-6.914744, 107.60981]; // Bandung defaults

export const MapsSection = () => {
  const trpc = useTRPC();
  const { data: userData } = useQuery(trpc.auth.getCoordinates.queryOptions());

  const [activeBankId, setActiveBankId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const debouncedSearch = useDebounce(searchQuery, 300);

  const userPosition: [number, number] =
    userData?.lat && userData?.lng
      ? [userData.lat, userData.lng]
      : DEFAULT_CENTER;

  // Filter logic based on debounced search and active category
  const filteredBanks = useMemo(() => {
    return BANDUNG_WASTE_BANKS.filter((bank) => {
      // Search matching (name or address)
      const matchesSearch =
        bank.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        bank.address.toLowerCase().includes(debouncedSearch.toLowerCase());

      // Category matching
      const matchesCategory =
        activeCategory === "Semua" ||
        bank.types.includes(activeCategory) ||
        bank.types.includes("Semua"); // 'Semua' banks accept everything

      return matchesSearch && matchesCategory;
    });
  }, [debouncedSearch, activeCategory]);

  return (
    <PageContainer
      pageTitle="Cari Bank Sampah Terdekat"
      pageDescription=""
      scrollable={false}
    >
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden -mx-4 -mb-4 md:-mx-6 md:-mb-6 border-t border-slate-200 dark:border-slate-800">
        <MapSidebar
          wasteBanks={filteredBanks}
          activeBankId={activeBankId}
          onSelectBank={setActiveBankId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <div className="flex-1 w-full bg-slate-50 dark:bg-slate-950 relative min-h-[50vh] lg:min-h-0">
          <MapClient
            userPosition={userPosition}
            wasteBanks={filteredBanks}
            activeBankId={activeBankId}
          />
        </div>
      </div>
    </PageContainer>
  );
};
