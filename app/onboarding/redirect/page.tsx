import { getSession } from "@/hooks/get-session";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  if (!session) redirect("/login");

  const user = await caller.auth.checkOnboarding({ id: session.user.id });

  if (!user) redirect("/login");

  if (user.role === "admin") redirect("/admin");

  if (!user.onboarded) {
    redirect("/onboarding");
  }

  redirect("/user");
}
