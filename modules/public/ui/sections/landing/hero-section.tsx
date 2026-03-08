"use client";

import Image from "next/image";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

export const HeroSection = () => {
  const containerRef = useGsapReveal<HTMLElement>({
    stagger: 0.15,
    y: 30,
    duration: 1,
    ease: "back.out(1.5)",
  });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
        {/* Left Content */}
        <div className="max-w-2xl">
          <h1 className="text-5xl lg:text-7xl font-extrabold text-foreground leading-[1.1] mb-6 gsap-reveal">
            Bandung Bersih, <br />
            <span className="text-primary">Mulai dari Genggamanmu</span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground mb-10 leading-relaxed gsap-reveal">
            Wujudkan kota yang lebih hijau dengan klasifikasi sampah berbasis
            AI. Kenali jenis sampahmu secara instan dan berkontribusi langsung
            untuk bumi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 gsap-reveal">
            <button className="px-8 py-4 bg-primary text-primary-foreground text-lg font-bold rounded-2xl hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all transform hover:-translate-y-1">
              Mulai Langkah Hijaumu
            </button>
          </div>
        </div>
        {/* Right Content: Illustration */}
        <div className="mt-16 lg:mt-0 relative flex justify-center lg:justify-end gsap-reveal">
          <div className="relative w-full max-w-lg">
            {/* Placeholder for 3D Illustration */}
            <div className="aspect-square bg-primary/20 rounded-full absolute -top-10 -right-10 w-64 h-64 blur-3xl opacity-50"></div>
            <Image
              src="/img/hero.webp"
              className="absolute w-28 top-1/3 right-0 translate-x-1/3 sm:w-36 md:w-48 md:top-[40%] md:-right-4 lg:w-56 xl:w-60 lg:-right-8 z-20 drop-shadow-2xl"
              alt="Robot"
              width={300}
              height={300}
            />
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-[85%] h-auto rounded-xl shadow-xl"
            >
              <source src="/video/hero.webm" type="video/webm" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};
