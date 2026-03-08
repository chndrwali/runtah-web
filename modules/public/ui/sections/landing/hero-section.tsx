import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="mx-auto px-4 sm:px-6 lg:px-8">
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
              alt="Smartphone and Recycling Bin Illustration"
              className="relative z-10 w-full h-auto drop-shadow-2xl rounded-2xl"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwcoMAbaN6DLI0hVeU8xfbZZYWAdPzhh-WymkwShByIxlrzVlDHf0JhLPHvdQOgGf3KOQ0MLu99UqeWg0WYPU3ppH6HJEysVQTP57e7Po0SQJrnaBpFiIynraS05cURob88PKwgtZFgpyJ5INhU6j5H0miWrG6PnIs5A1HfKotAl2sXcBvyLcpK6ukyvus0ksAqMoVlEQQ9othylWBYwocNCx40GuG0JdZEQDW7mIliSCwjgzPMjX_3rXpbsQwq5S4JT70-MD6Xtnm"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
