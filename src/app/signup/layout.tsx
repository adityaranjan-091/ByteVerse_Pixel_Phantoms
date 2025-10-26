import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup - SustainBite",
  description: "Create a new SustainBite account.",
};

export default function SignupLayout({
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
