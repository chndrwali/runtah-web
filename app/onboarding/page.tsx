import { getSession } from "@/hooks/get-session";
import { redirect } from "next/navigation";
import { OnboardingForm } from "@/modules/auth/ui/form/onboarding-form";
import { caller } from "@/trpc/server";

export const metadata = {
  title: "Onboarding",
  description: "Lengkapi profil Anda untuk mulai menggunakan LockSlot",
  robots: { index: false, follow: false },
};

export default async function OnboardingPage() {
  const session = await getSession();

  if (!session) redirect("/login");

  const user = await caller.auth.checkOnboarding({ id: session.user.id });

  if (user?.onboarded) {
    redirect("/onboarding/redirect");
  }

  return <OnboardingForm initialName={user?.name || ""} />;
}
