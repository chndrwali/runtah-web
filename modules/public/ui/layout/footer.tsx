import Link from "next/link";
import { Leaf } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand & Description */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center space-x-2">
              <Leaf className="h-6 w-6" />
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
          <div className="space-y-4">
            <h4 className="text-lg font-bold">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link
                  href="#"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Cara Kerja
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Pusat Bantuan
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold">Sosial Media</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link
                  href="#"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Twitter X
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Facebook
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-primary-foreground/20 pt-8 text-sm text-primary-foreground/70">
          <p>© 2026 Runtah Bdg. Hak Cipta Dilindungi Undang-Undang.</p>
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
