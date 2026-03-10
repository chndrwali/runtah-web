import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { TRPCReactProvider } from "@/trpc/client";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DM_Sans, Lora, IBM_Plex_Mono } from "next/font/google";
import config from "@/lib/config-env";

const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(config.env.nextPublicUrl),
  title: {
    default: "Robah - Bandung Bersih, Mulai dari Genggamanmu",
    template: "%s | Robah",
  },
  description:
    "Wujudkan kota yang lebih hijau dengan klasifikasi sampah berbasis AI. Dapatkan poin dari setiap sampah yang kamu daur ulang.",
  keywords: [
    "Robah",
    "Daur Ulang",
    "Klasifikasi Sampah AI",
    "Sampah Bandung",
    "Poin Sampah",
    "Lingkungan",
    "Go Green",
    "Bank Sampah",
    "Waste Classification",
    "Recycle Reward",
    "AI Waste Sorting",
    "Pengelolaan Sampah",
    "Peta Bank Sampah",
  ],
  authors: [{ name: "Robah Team" }],
  creator: "Robah Team",
  publisher: "Robah",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: config.env.nextPublicUrl,
    title: "Robah - Bandung Bersih, Mulai dari Genggamanmu",
    description:
      "Wujudkan kota yang lebih hijau dengan klasifikasi sampah berbasis AI. Dapatkan poin dari setiap sampah yang kamu daur ulang.",
    siteName: "Robah",
    images: [
      {
        url: "/img/illustration.gif",
        width: 800,
        height: 600,
        alt: "Robah Illustration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robah - Bandung Bersih, Mulai dari Genggamanmu",
    description:
      "Wujudkan kota yang lebih hijau dengan klasifikasi sampah berbasis AI.",
    images: ["/img/illustration.gif"],
  },
  alternates: {
    canonical: config.env.nextPublicUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
      >
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={true}
            disableTransitionOnChange
          >
            <TooltipProvider>
              <NextSSRPlugin
                routerConfig={extractRouterConfig(ourFileRouter)}
              />
              {children}
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
