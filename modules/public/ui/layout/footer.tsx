"use client";

import Link from "next/link";
import Image from "next/image";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

export const Footer = () => {
  const containerRef = useGsapReveal<HTMLElement>({
    stagger: 0.15,
    y: 30,
    duration: 0.8,
  });

  return (
    <footer
      ref={containerRef}
      className="bg-dark-teal text-primary-foreground py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand & Description */}
          <div className="md:col-span-2 space-y-4 gsap-reveal">
            <Link href="/" className="inline-flex items-center space-x-2">
              <Image
                alt="Logo"
                src="/img/logo/favicon-32x32.png"
                className="h-6 w-6"
                width={32}
                height={32}
              />
              <span className="text-2xl font-extrabold tracking-tight">
                Runtah
              </span>
            </Link>
            <p className="text-primary-foreground/80 max-w-md leading-relaxed text-sm lg:text-base">
              Wujudkan kota Bandung yang lebih bersih dan hijau melalui
              klasifikasi sampah berbasis AI yang cerdas. Mari wujudkan
              lingkungan yang lebih sehat untuk masa depan.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 gsap-reveal">
            <h4 className="text-lg font-bold">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="#cara-kerja"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Cara Kerja
                </Link>
              </li>
              <li>
                <Link
                  href="#fitur"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Fitur
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="space-y-4 gsap-reveal">
            <h4 className="text-lg font-bold">Sosial Media</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link
                  href="https://instagram.com/chndrwali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://twitter.com/chndrwali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Twitter X
                </Link>
              </li>
              <li>
                <Link
                  href="https://facebook.com/chndrwali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Facebook
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-primary-foreground/20 pt-8 text-sm text-primary-foreground/70 gsap-reveal">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
            <p>
              &copy; {new Date().getFullYear()} Runtah Bdg. Hak Cipta Dilindungi
              Undang-Undang.
            </p>
            <p>
              Dibuat oleh{" "}
              <Link
                href="https://chndrwali.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary-foreground transition-colors"
              >
                Candra Wali Sanjaya
              </Link>
            </p>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="#"
              className="hover:text-primary-foreground transition-colors"
            >
              Kebijakan Privasi
            </Link>
            <Link
              href="#"
              className="hover:text-primary-foreground transition-colors"
            >
              Syarat & Layanan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
