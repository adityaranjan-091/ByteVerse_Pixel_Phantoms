import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SustainBite',
  description: 'Food rescue platform',
  icons: {
    icon: '/Logo.jpg',
  },
};

export default function ServerLayout({ children }: { children: React.ReactNode }) {
  return children;
}