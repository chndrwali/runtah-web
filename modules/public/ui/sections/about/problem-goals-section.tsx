"use client";

import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { Target, AlertTriangle } from "lucide-react";

export const ProblemGoalsSection = () => {
  const containerRef = useGsapReveal<HTMLElement>({
    stagger: 0.15,
    y: 30,
    duration: 0.8,
  });

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Filosofi */}
      <div className="text-center max-w-4xl mx-auto mb-24 gsap-reveal">
        <h1 className="text-5xl lg:text-7xl font-extrabold text-foreground mb-6">
          Filosofi <span className="text-primary">Robah</span>
        </h1>
        <p className="text-xl lg:text-2xl text-primary leading-relaxed font-semibold italic mb-6">
          &quot;Robah berarti Berubah atau Mengubah dalam kosa kata bahasa
          Sunda.&quot;
        </p>
        <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          Makna ini selaras dengan <i>core loop</i> aplikasi kami: Mengubah
          kebiasaan buruk menjadi aksi lingkungan yang nyata, mengubah tumpukan
          sampah menjadi poin yang bermanfaat, serta mengubah barang bekas
          menjadi sebuah berkah.
        </p>
      </div>

      {/* Overview */}
      <div className="text-center max-w-3xl mx-auto mb-20 gsap-reveal">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-6">
          Visi Kami untuk Bandung
        </h2>
        <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-8"></div>
        <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
          Di balik Robah, terdapat dedikasi untuk menciptakan lingkungan yang
          lebih bersih serta mempermudah masyarakat dalam berpartisipasi menjaga
          kelestarian bumi melalui pemilahan sampah yang tepat.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
        {/* Problems */}
        <div className="bg-red-50 dark:bg-red-500/10 p-8 lg:p-10 rounded-3xl border border-red-100 dark:border-red-500/20 gsap-reveal">
          <div className="w-14 h-14 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mb-6">
            <AlertTriangle className="size-7" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Masalah</h2>
          <p className="text-muted-foreground leading-relaxed">
            Isu persampahan di kota Bandung sering kali menjadi problematika
            yang pelik, di mana krisis TPA Sarimukti menjadi pengingat nyata. Di
            sisi lain, antusiasme warga untuk memilah sampah pada dasarnya cukup
            tinggi, namun sering kali terkendala oleh sulitnya akses informasi
            ke Bank Sampah terdekat serta rasa enggan untuk mengantarkannya
            secara mandiri.
          </p>
        </div>

        {/* Goals */}
        <div className="bg-primary/5 dark:bg-primary/10 p-8 lg:p-10 rounded-3xl border border-primary/20 gsap-reveal">
          <div className="w-14 h-14 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mb-6">
            <Target className="size-7" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Tujuan</h2>
          <p className="text-muted-foreground leading-relaxed">
            Hadir sebagai jembatan inovatif yang menghubungkan rumah tangga
            secara langsung dengan pengelola Bank Sampah lokal. Melalui web ini,
            warga dapat mengklasifikasikan jenis sampahnya menggunakan AI, lalu
            mengajukan permintaan penjemputan (<i>pickup</i>) dengan praktis,
            tanpa harus keluar rumah.
          </p>
        </div>
      </div>
    </section>
  );
};
