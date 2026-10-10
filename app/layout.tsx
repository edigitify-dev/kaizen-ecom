import type { Metadata, Viewport } from "next";
import { Anton, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import SearchOverlay from "@/components/layout/SearchOverlay";

const display = Anton({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const serif = Cormorant_Garamond({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-serif", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = { title: "KAIZEN — Not made to blend.", description: "Streetwear for the ones who move differently. Crafted with purpose, worn without rules." };
export const viewport: Viewport = { themeColor: "#090909" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${sans.variable}`}>
      <body>
        <Providers>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ivory focus:px-4 focus:py-2 focus:text-obsidian">Skip to content</a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
          <div className="grain" aria-hidden />
        </Providers>
      </body>
    </html>
  );
}
