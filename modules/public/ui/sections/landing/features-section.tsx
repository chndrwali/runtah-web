export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Cara Kerja Runtah
          </h2>
          <div className="h-1 w-20 bg-brand mx-auto rounded-full"></div>
        </div>
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-theme shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-brand-soft rounded-full flex items-center justify-center text-3xl mb-6">
              📸
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Scan AI</h3>
            <p className="text-brand-earthy">
              Arahkan kamera ke sampahmu dan biarkan AI kami mengidentifikasi 12
              kategori sampah secara akurat.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-white p-8 rounded-theme shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-brand-soft rounded-full flex items-center justify-center text-3xl mb-6">
              📍
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Cari Drop-off
            </h3>
            <p className="text-brand-earthy">
              Temukan titik pembuangan dan pusat daur ulang terdekat di seluruh
              penjuru kota Bandung dengan peta interaktif.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-white p-8 rounded-theme shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-brand-soft rounded-full flex items-center justify-center text-3xl mb-6">
              🎁
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Tukar Poin
            </h3>
            <p className="text-brand-earthy">
              Kumpulkan poin dari setiap sampah yang kamu setor dan tukarkan
              dengan voucher belanja atau produk lokal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
