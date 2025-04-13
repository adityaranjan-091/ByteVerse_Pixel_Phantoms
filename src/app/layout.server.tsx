import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SustainBite',
  description: 'Food rescue platform',
  icons: {
    icon: '/Logo.jpg', // or '/favicon.png', '/favicon.svg'
  },
};

export default function ServerLayout({ children }: { children: React.ReactNode }) {
  return children;
}