import { getSession } from "@/hooks/get-session";
import UserLayout from "@/modules/public/ui/layout";
import { redirect } from "next/navigation";

export default async function UserLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) redirect("/login");
  const isUser = session?.user.role === "user";

  if (!isUser) redirect("/admin");

  return <UserLayout>{children}</UserLayout>;
}
