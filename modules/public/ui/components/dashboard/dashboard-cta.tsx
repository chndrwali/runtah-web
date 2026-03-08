import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DashboardCTA() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-emerald-600 to-teal-500 p-8 md:p-12 text-white shadow-xl shadow-emerald-200 dark:shadow-none">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-md text-center md:text-left">
          <h3 className="text-3xl font-bold leading-tight">
            Punya sampah hari ini? Scan sekarang!
          </h3>
          <p className="mt-3 text-emerald-50 opacity-90">
            Ubah sampahmu menjadi poin berharga dengan teknologi AI Scanner kami
            yang cepat dan akurat.
          </p>
        </div>
        <Button
          asChild
          className="h-auto bg-white px-8 py-4 text-lg font-bold text-emerald-600 shadow-lg transition-all hover:scale-105 hover:bg-emerald-50 rounded-xl"
        >
          <Link href="/user/ai" className="flex items-center gap-3">
            <Camera className="size-6" />
            Buka AI Scanner
          </Link>
        </Button>
      </div>
      {/* Decorative shapes */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-900/20 rounded-full blur-3xl"></div>
    </div>
  );
}
