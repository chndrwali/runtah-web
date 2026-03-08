import { NavItem } from "@/types";

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
    title: "Beranda",
    url: "/user",
    icon: "home",
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
    url: "/user/redeempt",
    icon: "point",
    isActive: false,
    items: [],
  },
];
