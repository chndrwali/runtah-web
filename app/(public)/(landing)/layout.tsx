import { Footer } from "@/modules/public/ui/layout/footer";
import { LandingNavbar } from "@/modules/public/ui/layout/navbar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full flex flex-1 flex-col min-h-screen px-5 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl">
        <LandingNavbar />
        <main className="grow py-[10vh]">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
