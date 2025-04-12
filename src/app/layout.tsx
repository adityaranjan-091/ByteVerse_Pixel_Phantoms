"use client";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import "swiper/css";
import "swiper/css/pagination";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider

// export const metadata = {
//   title: "SustainBite",
//   description: "Food rescue platform",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SessionProvider>{children}</SessionProvider>{" "}
        {/* Wrap children with SessionProvider */}
      </body>
    </html>
  );
}
