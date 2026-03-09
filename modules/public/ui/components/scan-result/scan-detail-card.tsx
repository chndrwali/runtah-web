import { BadgeCheck, Gift, MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScanDetailCardProps {
  aiCategory: string;
  aiAccuracy: number;
  pointsEarned: number | null;
  finalWeight: number | null;
}

export function ScanDetailCard({
  aiCategory,
  aiAccuracy,
  pointsEarned,
  finalWeight,
}: ScanDetailCardProps) {
  const displayPoints = pointsEarned || Math.floor((finalWeight || 0.1) * 100);

  return (
    <div className="lg:w-[60%]">
      <div className="bg-card text-card-foreground rounded-4xl p-8 lg:p-10 shadow-sm border border-border h-full flex flex-col">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-4xl lg:text-5xl font-black text-foreground leading-tight mb-4 capitalize">
              {aiCategory}
            </h3>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-bold text-sm">
              <BadgeCheck className="size-5" />
              Akurasi: {aiAccuracy.toFixed(1)}%
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
          Tergolong sebagai kategori sampah <strong>{aiCategory}</strong>.
          Pastikan untuk memilah dengan benar agar nilai daur ulangnya tinggi.
        </p>

        {/* Reward Info Block */}
        <div className="bg-muted rounded-2xl p-6 border border-border mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
              <Gift className="size-6" />
            </div>
            <div>
              <p className="text-muted-foreground font-medium">
                Estimasi Reward
              </p>
              <p className="text-2xl font-black text-foreground">
                +{displayPoints} Poin
                <span className="text-base font-normal text-muted-foreground">
                  {" "}
                  / {finalWeight}kg
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="grow"></div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button className="h-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-primary/20">
            <MapPin className="size-5" />
            <span>Cari Drop-off Terdekat</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto bg-card border-2 border-primary text-primary hover:bg-primary/5 hover:text-primary font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
          >
            <Truck className="size-5" />
            <span>Request Pick-up</span>
          </Button>
        </div>
        <p className="text-center mt-6 text-muted-foreground text-xs">
          Dengan menekan tombol di atas, Anda menyetujui syarat dan ketentuan
          layanan Robah.
        </p>
      </div>
    </div>
  );
}
