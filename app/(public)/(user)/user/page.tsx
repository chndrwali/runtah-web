import { HydrateClient } from "@/trpc/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User",
  description: "",
};

export default async function Page() {
  return <HydrateClient>User</HydrateClient>;
}
