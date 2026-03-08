"use client";

import Image from "next/image";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

export const TrashTypesSection = () => {
  const containerRef = useGsapReveal<HTMLElement>({ stagger: 0.15 });

  return (
    <section ref={containerRef} className="py-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          {/* Left Content: Text */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground gsap-reveal">
              Kenali 12 Kategori Sampah
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full gsap-reveal"></div>
            <p className="text-lg text-muted-foreground leading-relaxed gsap-reveal">
              Model AI Runtah dilatih secara khusus untuk mendeteksi dan
              mengklasifikasikan hingga 12 jenis sampah yang berbeda. Mulai dari
              sampah plastik, kertas, organik, hingga limbah elektronik.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed gsap-reveal">
              Dengan akurasi yang tinggi, kami memastikan setiap sampah yang
              Anda setor masuk ke tempat pengolahan yang tepat, mengurangi
              risiko pencemaran lingkungan.
            </p>
          </div>

          {/* Right Content: Image */}
          <div className="w-full md:w-1/2 relative flex justify-center gsap-reveal">
            <div className="relative w-full max-w-lg p-4 bg-white dark:bg-card rounded-2xl shadow-xl border border-border">
              <Image
                src="/img/featured/12-types-of-trash.webp"
                alt="12 Jenis Sampah yang Didukung"
                width={600}
                height={400}
                className="w-full h-auto rounded-xl object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
