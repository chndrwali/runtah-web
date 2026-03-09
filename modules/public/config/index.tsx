import { SearchItem } from "@/modules/admin/ui/config/search-config";
import { NavItem } from "@/types";
import {
  Focus,
  Gift,
  History,
  LayoutDashboard,
  MapIcon,
  UserCircle,
} from "lucide-react";

export const navPublics = [
  {
    name: "Beranda",
    link: "/",
  },
  {
    name: "Tentang",
    link: "/about",
  },
];

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/user",
    icon: "dashboard",
    isActive: false,
    shortcut: ["d", "d"],
    items: [],
  },
  {
    title: "Scan AI",
    url: "/user/ai",
    icon: "scan",
    isActive: false,
    items: [],
  },
  {
    title: "Peta Drop-off",
    url: "/user/maps",
    icon: "map",
    isActive: false,
    items: [],
  },
  {
    title: "Riwayat",
    url: "/user/history",
    icon: "history",
    isActive: false,
    items: [],
  },
  {
    title: "Tukar Poin",
    url: "/user/points",
    icon: "point",
    isActive: false,
    items: [],
  },
];

export const searchItems: SearchItem[] = [
  // Pages
  {
    title: "Dashboard",
    url: "/user",
    group: "Pages",
    icon: LayoutDashboard,
    shortcut: ["d", "d"],
  },
  {
    title: "Scan AI",
    url: "/user/ai",
    group: "Pages",
    icon: Focus,
  },
  {
    title: "Peta Drop-off",
    url: "/user/maps",
    group: "Pages",
    icon: MapIcon,
    shortcut: ["p", "p"],
  },
  {
    title: "Riwayat",
    url: "/user/history",
    group: "Pages",
    icon: History,
    shortcut: ["r", "r"],
  },
  {
    title: "Tukar Poin",
    url: "/user/points",
    group: "Pages",
    icon: Gift,
    shortcut: ["t", "t"],
  },

  // Portfolio Tabs
  {
    title: "Profil",
    url: "/user/profile",
    group: "Settings",
    icon: UserCircle,
  },
];
