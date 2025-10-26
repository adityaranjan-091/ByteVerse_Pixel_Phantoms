import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - SustainBite",
  description: "Login to your SustainBite account.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
    </section>
  );
}
