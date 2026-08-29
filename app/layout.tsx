import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const sans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const mono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'CrossBorderOS — Malaysia Readiness',
  description: 'From expansion goal to launch-ready. Evidence-backed market entry operations for companies expanding across borders.',
  openGraph: {
    title: 'CrossBorderOS',
    description: 'From expansion goal to launch-ready.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'CrossBorderOS expansion pathway across ASEAN' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CrossBorderOS',
    description: 'From expansion goal to launch-ready.',
    images: ['/og.png'],
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
