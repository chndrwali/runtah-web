"use client";

import Image from "next/image";
import Link from "next/link";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

const techStacks = [
  {
    name: "Next.js",
    src: "/img/techstack/nextjs.png",
    link: "https://nextjs.org/",
    desc: "React Framework",
  },
  {
    name: "React",
    src: "/img/techstack/react.webp",
    link: "https://react.dev/",
    desc: "UI Library",
  },
  {
    name: "Tailwind CSS",
    src: "/img/techstack/tailwindcss.webp",
    link: "https://tailwindcss.com/",
    desc: "Styling Framework",
  },
  {
    name: "VS Code",
    src: "/img/techstack/vscode.webp",
    link: "https://code.visualstudio.com/",
    desc: "Code Editor",
  },
  {
    name: "Figma",
    src: "/img/techstack/figma.webp",
    link: "https://www.figma.com/",
    desc: "UI/UX Design",
  },
  {
    name: "Git",
    src: "/img/techstack/git.webp",
    link: "https://git-scm.com/",
    desc: "Version Control",
  },
  {
    name: "GitHub",
    src: "/img/techstack/github.webp",
    link: "https://github.com/",
    desc: "Code Hosting",
  },
  {
    name: "NPM",
    src: "/img/techstack/npm.webp",
    link: "https://npmjs.com/",
    desc: "Package Manager",
  },
  {
    name: "Vercel",
    src: "/img/techstack/vercel.webp",
    link: "https://vercel.com/",
    desc: "Deployment",
  },

  {
    name: "Python",
    src: "/img/techstack/python.webp",
    link: "https://python.org/",
    desc: "Programming Language",
  },
  {
    name: "Google Colab",
    src: "/img/techstack/google-colab.webp",
    link: "https://colab.research.google.com/",
    desc: "Notebook Environment",
  },
  {
    name: "Kaggle",
    src: "/img/techstack/kaggle.webp",
    link: "https://kaggle.com/",
    desc: "Datasets & ML Community",
  },
  {
    name: "TensorFlow",
    src: "/img/techstack/tensorflow.webp",
    link: "https://tensorflow.org/",
    desc: "Machine Learning Framework",
  },
  {
    name: "Keras",
    src: "/img/techstack/keras.webp",
    link: "https://keras.io/",
    desc: "Deep Learning API",
  },
  {
    name: "TensorFlow.js",
    src: "/img/techstack/tensorflowjs.webp",
    link: "https://js.tensorflow.org/",
    desc: "ML in JavaScript",
  },

  {
    name: "Prisma",
    src: "/img/techstack/prisma.png",
    link: "https://prisma.io/",
    desc: "Next-Gen ORM",
  },
  {
    name: "tRPC",
    src: "/img/techstack/trpc.png",
    link: "https://trpc.io/",
    desc: "End-to-End Typesafe API",
  },
];

export const TechStackSection = () => {
  const containerRef = useGsapReveal<HTMLElement>({
    stagger: 0.1,
    y: 40,
    duration: 0.8,
    ease: "back.out(1.2)",
  });

  return (
    <section ref={containerRef} className="py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 gsap-reveal">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Teknologi di Balik Runtah
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kami menggunakan teknologi modern dan handal untuk memastikan
            platform berjalan dengan cepat, aman, dan pintar.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
          {techStacks.map((tech, index) => (
            <Link
              key={index}
              href={tech.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group gsap-reveal p-6 bg-card hover:bg-white dark:hover:bg-card border border-border shadow-sm hover:shadow-xl hover:border-primary/30 rounded-2xl flex flex-col items-center text-center transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20 mb-4 relative flex items-center justify-center p-2 rounded-full bg-slate-50 dark:bg-slate-800/50 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src={tech.src}
                  alt={tech.name}
                  width={64}
                  height={64}
                  className="object-contain w-full h-full drop-shadow-sm"
                />
              </div>
              <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {tech.name}
              </h3>
              <p className="text-xs text-muted-foreground">{tech.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
