import Image from "next/image";

export const HeroSection = () => {
  return (
    <section id="hero" className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
        {/* Left Content */}
        <div className="max-w-2xl">
          <h1 className="text-5xl lg:text-7xl font-extrabold text-foreground leading-[1.1] mb-6">
            Bandung Bersih, <br />
            <span className="text-primary">Mulai dari Genggamanmu</span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground mb-10 leading-relaxed">
            Wujudkan kota yang lebih hijau dengan klasifikasi sampah berbasis
            AI. Kenali jenis sampahmu secara instan dan berkontribusi langsung
            untuk bumi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-primary text-primary-foreground text-lg font-bold rounded-2xl hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all transform hover:-translate-y-1">
              Mulai Langkah Hijaumu
            </button>
          </div>
        </div>
        {/* Right Content: Illustration */}
        <div className="mt-16 lg:mt-0 relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-lg">
            {/* Placeholder for 3D Illustration */}
            <div className="aspect-square bg-primary/20 rounded-full absolute -top-10 -right-10 w-64 h-64 blur-3xl opacity-50"></div>
            <Image
              src="/img/hero.webp"
              className="absolute scale-[45%] top-1/3 right-[12%] translate-x-1/2 md:top-[40%] md:scale-50 lg:scale-[65%]"
              alt="Robot"
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
