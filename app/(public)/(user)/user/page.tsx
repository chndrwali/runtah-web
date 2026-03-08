import { HydrateClient } from "@/trpc/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beranda | Robah",
  description: "Dashboard manajemen sampah Robah",
};

export default async function Page() {
  return (
    <HydrateClient>
      <div className="p-8 max-w-7xl mx-auto space-y-8"></div>
    </HydrateClient>
  );
}
