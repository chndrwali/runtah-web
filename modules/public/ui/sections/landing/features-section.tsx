import { Focus, Gift, MapPin } from "lucide-react";

export const FeaturesSection = () => {
  return (
    <section className="py-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            id="cara-kerja"
            className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
          >
            Cara Kerja Runtah
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </div>
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-card p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-3xl mb-6">
              <Focus className="size-6" />
            </div>
            <h3 className="text-xl font-bold text-card-foreground mb-3">
              Scan AI
            </h3>
            <p className="text-muted-foreground">
              Arahkan kamera ke sampahmu dan biarkan AI kami mengidentifikasi 12
              kategori sampah secara akurat.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-card p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-3xl mb-6">
              <MapPin className="size-6" />
            </div>
            <h3 className="text-xl font-bold text-card-foreground mb-3">
              Cari Drop-off
            </h3>
            <p className="text-muted-foreground">
              Temukan titik pembuangan dan pusat daur ulang terdekat di seluruh
              penjuru kota Bandung dengan peta interaktif.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-card p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-3xl mb-6">
              <Gift className="size-6" />
            </div>
            <h3 className="text-xl font-bold text-card-foreground mb-3">
              Tukar Poin
            </h3>
            <p className="text-muted-foreground">
              Kumpulkan poin dari setiap sampah yang kamu setor dan tukarkan
              dengan voucher belanja atau produk lokal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
