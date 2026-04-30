import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TechPC Store — Armá tu PC ideal con IA',
  description:
    'El asesor inteligente que te arma la PC perfecta según tu presupuesto. Stock actualizado, compatibilidad garantizada. Gaming, workstation, oficina y más.',
  keywords: ['computadoras', 'PC gamer', 'componentes PC', 'armado de PC', 'CPU', 'GPU', 'RAM', 'asesor IA'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
