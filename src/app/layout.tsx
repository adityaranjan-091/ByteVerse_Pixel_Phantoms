"use client";

import "./globals.css";
import "leaflet/dist/leaflet.css";
import "swiper/css";
import "swiper/css/pagination";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const noHeaderFooterPaths = ["/login", "/signup"];
  const shouldShowHeaderFooter = !noHeaderFooterPaths.includes(pathname);

  return (
    <html lang="en">
      <body className="antialiased">
        <SessionProvider>
          {shouldShowHeaderFooter && <Header />}
          {children}
          {shouldShowHeaderFooter && <Footer />}
        </SessionProvider>
      </body>
    </html>
  );
}