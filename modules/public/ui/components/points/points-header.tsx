import { PartyPopper } from "lucide-react";

interface PointsHeaderProps {
  totalPoints: number;
}

export function PointsHeader({ totalPoints }: PointsHeaderProps) {
  return (
    <header className="mb-8">
      <div className="relative overflow-hidden bg-primary rounded-3xl p-8 md:p-12 text-primary-foreground flex flex-col md:flex-row items-center justify-between shadow-lg shadow-primary/20">
        <div className="relative z-10 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Saldo Anda: {totalPoints.toLocaleString("id-ID")} Poin ⭐
          </h2>
          <p className="text-primary-foreground/80 opacity-90 text-lg">
            Terus kumpulkan poin dengan mendaur ulang sampahmu!
          </p>
        </div>
        <div className="relative z-10 mt-6 md:mt-0">
          <span className="text-8xl opacity-40">
            <PartyPopper className="size-24" />
          </span>
        </div>
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
      </div>
    </header>
  );
}
