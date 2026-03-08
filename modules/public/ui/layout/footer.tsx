import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-[#1a2e22] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8">
          <div className="mb-4 md:mb-0">
            <span className="text-2xl font-extrabold tracking-tight">
              Runtah
            </span>
          </div>
          <div className="text-sm font-medium opacity-80">
            © 2026 Runtah Bdg. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0 flex space-x-6 opacity-60">
            <Link className="hover:text-brand transition-colors" href="#">
              Instagram
            </Link>
            <Link className="hover:text-brand transition-colors" href="#">
              Twitter
            </Link>
            <Link className="hover:text-brand transition-colors" href="#">
              Kontak
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
