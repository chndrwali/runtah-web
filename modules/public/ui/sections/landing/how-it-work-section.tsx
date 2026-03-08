"use client";

import Image from "next/image";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

interface HowItWorkBodyProps {
  feature: {
    image: string;
    title: string;
    desc: string;
  };
  index: number;
}

const HowItWorkBody = ({ feature, index }: HowItWorkBodyProps) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-4 md:px-12 gsap-reveal">
      <div className="flex flex-wrap justify-between">
        <Image
          className="w-full h-[200px] rounded-xl"
          src={feature.image}
          alt={feature.title}
          width={300}
          height={300}
        />
        <div className="w-full mt-2 lg:mt-6">
          <h3 className="text-xl font-bold mb-2 md:text-2xl">
            {index + 1}. {feature.title}
          </h3>
          <p className="font-medium text-muted-foreground">{feature.desc}</p>
        </div>
      </div>
    </div>
  );
};

const data = [
  {
    image: "/img/steps/step-1.webp",
    title: "Pilih Gambar",
    desc: "Pilih gambar sampah yang ingin diklasifikasikan.",
  },
  {
    image: "/img/steps/step-2.webp",
    title: "Klasifikasikan",
    desc: "Model Machine Learning akan mengklasifikasikan sampah yang dipilih berdasarkan 12 jenis sampah.",
  },
  {
    image: "/img/steps/step-3.webp",
    title: "Hasil Klasifikasi",
    desc: "Hasil klasifikasi akan ditampilkan berupa jenis dan kategori sampah, serta persentase kecocokan.",
  },
];

export const HowItWorkSection = () => {
  const containerRef = useGsapReveal<HTMLElement>({
    stagger: 0.2,
    y: 30,
    x: 20,
    duration: 1,
    ease: "power4.out",
  });

  return (
    <section id="cara-kerja" ref={containerRef} className="py-10">
      <div className="container">
        <div className="flex flex-wrap justify-center gsap-reveal">
          <div className="text-center flex flex-col">
            <h2 className="text-2xl font-bold text-center w-full md:text-3xl lg:text-4xl">
              Bagaimana Cara Menggunakan AI Klasifikasi Sampah?
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6"></div>
          </div>

          <p className="w-full text-muted-foreground font-medium text-center mb-10 lg:leading-relaxed lg:w-2/3 lg:text-lg">
            Dengan AI, klasifikasi sampah menjadi lebih mudah dan cepat. Cukup
            mengambil gambar sampahmu, dan AI akan mengidentifikasi jenis sampah
            dengan akurat.
          </p>
        </div>
        <div className="flex flex-wrap gap-y-10 lg:gap-y-2">
          {data.map((feature, index) => (
            <HowItWorkBody key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
