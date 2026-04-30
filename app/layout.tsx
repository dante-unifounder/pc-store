import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'TechPC Store — Armá tu PC ideal con IA',
  description:
    'Encontrá los mejores componentes de PC con asesoramiento de inteligencia artificial. Gaming, workstation, diseño y más. Stock actualizado en tiempo real.',
  keywords: ['computadoras', 'PC gamer', 'componentes PC', 'armado de PC', 'CPU', 'GPU', 'RAM'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
