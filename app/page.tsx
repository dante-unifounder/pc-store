import ChatWidget from '@/components/ChatWidget';
import OpenChatButton from '@/components/OpenChatButton';
import FloatingNav from '@/components/FloatingNav';

/* ── Gallery items ── */
const gallery = [
  {
    name: 'PROCESADORES',
    sub: 'Intel Core 14th Gen & AMD Ryzen 7000',
    img: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'TARJETAS DE VIDEO',
    sub: 'NVIDIA RTX 40 Series & AMD Radeon RX 7000',
    img: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'MEMORIA RAM',
    sub: 'DDR5 6000–6400 MHz & DDR4 3600 MHz',
    img: 'https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'ALMACENAMIENTO',
    sub: 'NVMe PCIe 4.0 · SSD SATA · HDD',
    img: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?q=80&w=1200&auto=format&fit=crop',
  },
];

/* ── Steps ── */
const steps = [
  {
    num: '01',
    title: 'Contanós tu uso',
    desc: 'Gaming, diseño, edición de video, trabajo de oficina — PCBot adapta cada sugerencia a tu caso real.',
  },
  {
    num: '02',
    title: 'Decinos tu presupuesto',
    desc: 'PCBot filtra el inventario en tiempo real y solo te muestra lo que está en stock y dentro de tu rango.',
  },
  {
    num: '03',
    title: 'Recibís tu build completa',
    desc: 'Componentes compatibles, precios exactos, y el total. Listo para comprar, sin sorpresas.',
  },
];

/* ── Arrow icon ── */
const ArrowUpRight = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
  </svg>
);

/* ──────────────────────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#ebebeb] overflow-x-hidden">

      {/* ── Fixed Top Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-5 flex items-center justify-between text-sm font-medium tracking-tight">
        <div className="flex items-center gap-10">
          {/* Logo */}
          <a href="#" className="group flex items-center">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-black font-extrabold text-base transition-transform group-hover:rotate-12 select-none">
              T.
            </div>
          </a>
          {/* Links */}
          <ul className="hidden lg:flex items-center gap-8 text-[#888888]">
            {['Inicio', 'Categorías', 'Cómo funciona', 'FAQ'].map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase().replace(' ', '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
                  className="hover:text-white transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-6">
          <span className="hidden md:block text-[#888888] text-xs tracking-widest uppercase font-bold">
            Stock en tiempo real
          </span>
          <OpenChatButton className="px-5 py-2.5 bg-[#1a1a1a] hover:bg-white hover:text-black border border-[#333333] rounded-lg transition-all duration-300 text-sm font-medium">
            Armar mi PC →
          </OpenChatButton>
        </div>
      </nav>

      {/* ── Floating Bottom Nav ── */}
      <FloatingNav />

      {/* ════════════════════════════════════════════════════════ */}
      {/* HERO                                                     */}
      {/* ════════════════════════════════════════════════════════ */}
      <header className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a2e_0%,_#050505_65%)] opacity-70 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />

        {/* Main hero text */}
        <div className="relative z-10 text-center px-4">
          <h1 className="hero-text font-extrabold text-white">
            /techpc
          </h1>
          <p className="mt-6 text-[#888888] text-sm md:text-base tracking-[0.2em] uppercase font-bold">
            Asesor IA · Compatibilidad garantizada · Stock actualizado
          </p>
        </div>

        {/* Bottom-left: stat pill */}
        <div className="absolute bottom-12 left-8 md:left-12 flex items-center gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#22d3ee] rounded-full animate-pulse" />
              <span className="text-[#888888] text-xs font-bold uppercase tracking-widest">28 productos disponibles</span>
            </div>
            <span className="text-[#444444] text-xs">6 agotados — filtrados del asesor</span>
          </div>
        </div>

        {/* Bottom-right: CTA link */}
        <div className="absolute bottom-12 right-8 md:right-12 text-right">
          <OpenChatButton className="text-white font-semibold hover:text-[#6366f1] transition-colors border-b-2 border-white hover:border-[#6366f1] pb-1 text-sm">
            Hablar con PCBot →
          </OpenChatButton>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-30">
          <div className="w-px h-8 bg-white/40 animate-pulse" />
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════ */}
      {/* BENEFITS                                                 */}
      {/* ════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-2 h-2 rounded-full bg-[#6366f1] animate-pulse" />
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#666666] uppercase">
            Por qué TechPC es diferente
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-7xl font-medium leading-[1.05] tracking-tight text-white max-w-5xl mb-24">
          Tu PC armada por IA, con{' '}
          <span className="text-[#555555]">compatibilidad verificada</span>{' '}
          y stock real.
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Card 1 — Dark typography card */}
          <div className="bg-[#111111] rounded-[2.5rem] p-12 min-h-[520px] flex flex-col justify-between relative overflow-hidden group hover:bg-[#161616] transition-all duration-500 border border-[#1f1f1f]">
            <div className="absolute top-10 right-10 bg-[#1a1a1a] text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest text-[#888888] border border-[#333333]">
              Siempre en stock
            </div>
            <div className="mt-auto">
              <h3 className="text-5xl md:text-6xl font-semibold tracking-tighter mb-3 text-white leading-tight">
                Armá mejor.
              </h3>
              <h3 className="text-5xl md:text-6xl font-semibold tracking-tighter text-[#333333] group-hover:text-[#555555] transition-colors duration-500 leading-tight">
                Pagá menos.
              </h3>
              <p className="mt-8 text-[#666666] text-sm leading-relaxed max-w-xs">
                PCBot conoce cada componente del catálogo y arma la combinación óptima para tu uso y presupuesto — sin que tengas que investigar nada.
              </p>
            </div>
          </div>

          {/* Card 2 — Gradient with chat mockup */}
          <div className="bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4338ca] rounded-[2.5rem] p-8 md:p-12 min-h-[520px] flex items-center justify-center relative overflow-hidden group border border-indigo-500/20">
            {/* Chat mockup */}
            <div className="w-full max-w-sm transform group-hover:scale-[1.03] transition-transform duration-700 ease-out">
              {/* Chat window */}
              <div className="bg-[#0d0d14] rounded-2xl shadow-2xl overflow-hidden border border-white/10">
                {/* Header */}
                <div className="flex items-center gap-3 px-4 py-3 bg-[#6366f1]">
                  <span className="text-lg">🤖</span>
                  <div>
                    <p className="text-white font-bold text-xs leading-none">PCBot</p>
                    <p className="text-indigo-200 text-[10px]">Asesor en línea</p>
                  </div>
                  <span className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
                {/* Messages */}
                <div className="p-4 space-y-3">
                  <div className="bg-[#1a1a2e] rounded-xl rounded-tl-sm p-3 text-xs text-[#aaaaaa] leading-relaxed">
                    ¡Hola! ¿Para qué usarás tu PC y cuál es tu presupuesto en USD?
                  </div>
                  <div className="bg-[#6366f1] rounded-xl rounded-tr-sm p-3 text-xs text-white ml-auto max-w-[80%] leading-relaxed">
                    Gaming AAA + streaming, budget ~$1,500
                  </div>
                  <div className="bg-[#1a1a2e] rounded-xl rounded-tl-sm p-3 text-xs text-[#aaaaaa] leading-relaxed">
                    Perfecto! Te recomiendo:<br />
                    ⚡ <span className="text-white">i7-14700K</span> — $389.99<br />
                    🎮 <span className="text-white">RTX 4070</span> — $549.99<br />
                    💾 <span className="text-white">32GB DDR5</span> — $89.99<br />
                    <span className="text-[#6366f1] font-bold mt-1 block">Total: $1,459.93 ✓</span>
                  </div>
                </div>
                {/* Input bar */}
                <div className="px-4 pb-4">
                  <div className="bg-[#1a1a2e] rounded-xl px-3 py-2.5 text-[10px] text-[#555555] border border-[#333]/50">
                    Escribí tu mensaje...
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-white/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════ */}
      {/* CATEGORY GALLERY                                         */}
      {/* ════════════════════════════════════════════════════════ */}
      <section id="categorias" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex justify-between items-end mb-20 border-b border-[#1a1a1a] pb-10">
          <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-[#6366f1]">
            Catálogo
          </h2>
          <span className="hidden md:block text-[#444444] text-xs font-medium uppercase tracking-widest">
            Vol. 01 — 2026
          </span>
        </div>

        {/* Staggered 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-28">
          {gallery.map((item, i) => (
            <article
              key={item.name}
              className={`group cursor-default${i % 2 === 1 ? ' md:mt-24' : ''}`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#111111] rounded-sm">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="mt-8 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 group-hover:text-[#6366f1] transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-[#555555] text-[10px] font-bold uppercase tracking-[0.25em]">
                    {item.sub}
                  </p>
                </div>
                <OpenChatButton className="p-3 rounded-full border border-[#333333] group-hover:bg-[#6366f1] group-hover:border-transparent transition-all duration-300 text-[#888888] group-hover:text-white flex items-center justify-center">
                  <ArrowUpRight />
                </OpenChatButton>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════ */}
      {/* HOW IT WORKS                                             */}
      {/* ════════════════════════════════════════════════════════ */}
      <section id="como-funciona" className="py-32 px-6 md:px-12 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-2 rounded-full bg-[#22d3ee] animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#666666] uppercase">
              Simple. Rápido. Preciso.
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-medium leading-tight tracking-tight text-white max-w-3xl mb-20">
            Tres pasos para armar la PC que necesitás.
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="relative group">
                {/* Step number */}
                <span className="text-[10px] font-black tracking-[0.4em] text-[#333333] uppercase block mb-8">
                  {step.num}
                </span>
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-4 left-[calc(100%+16px)] w-8 border-t border-[#333333]" />
                )}
                <h3 className="text-2xl font-bold tracking-tight mb-4 text-white group-hover:text-[#6366f1] transition-colors">
                  {step.title}
                </h3>
                <p className="text-[#666666] text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════ */}
      {/* FAQ                                                      */}
      {/* ════════════════════════════════════════════════════════ */}
      <section id="faq" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-[#1a1a1a] pb-10">
          <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-[#6366f1]">
            Preguntas frecuentes
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-0">
          {[
            { q: '¿El asesor IA es gratuito?', a: 'Sí, PCBot es completamente gratuito. Solo pagás por los componentes que comprás.' },
            { q: '¿Cómo sé que los componentes son compatibles?', a: 'PCBot verifica socket, tipo de RAM y requisitos de energía antes de recomendarte algo.' },
            { q: '¿Puedo pedirle a PCBot que ajuste la build?', a: 'Podés pedirle que suba el presupuesto, cambie de marca o priorice ciertos componentes.' },
            { q: '¿Hacen envíos al interior?', a: 'Sí, enviamos a todo el país. El costo se calcula al momento del checkout.' },
          ].map((faq) => (
            <details
              key={faq.q}
              className="group border-b border-[#1a1a1a] py-8 cursor-pointer"
            >
              <summary className="flex items-center justify-between font-semibold text-white list-none text-lg tracking-tight">
                {faq.q}
                <span className="ml-4 shrink-0 text-[#6366f1] transition-transform group-open:rotate-45 text-2xl font-light">+</span>
              </summary>
              <p className="mt-4 text-[#666666] text-sm leading-relaxed max-w-prose">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════ */}
      {/* FOOTER / CTA                                             */}
      {/* ════════════════════════════════════════════════════════ */}
      <footer id="contacto" className="relative pt-40 pb-24 px-6 md:px-12 border-t border-[#111111]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16">

          {/* Left — CTA text */}
          <div className="flex-1">
            <h2 className="footer-display font-black tracking-tighter text-white mb-12 select-none leading-none">
              ARMÁ<br />TU PC.
            </h2>
            <div className="flex flex-col gap-6">
              <OpenChatButton className="text-2xl md:text-3xl font-semibold hover:text-[#6366f1] transition-all w-fit border-b-2 border-white/20 hover:border-[#6366f1] pb-2">
                Chatear con PCBot gratis →
              </OpenChatButton>
              <p className="text-[#444444] text-sm flex items-center gap-2">
                <span>📦</span> Stock actualizado en tiempo real
              </p>
            </div>
          </div>

          {/* Right — Social + extra links */}
          <div className="flex flex-col gap-6 md:mb-6">
            <div className="flex gap-3">
              {['IG', 'X', 'LI', 'WEB'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-12 h-12 border border-[#333333] rounded-full flex items-center justify-center text-[#888888] hover:bg-white hover:text-black transition-all hover:-translate-y-1 text-xs font-bold"
                >
                  {social}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-2 text-[#444444] text-sm">
              <a href="#" className="hover:text-[#888888] transition-colors">Términos de servicio</a>
              <a href="#" className="hover:text-[#888888] transition-colors">Política de privacidad</a>
              <a href="#" className="hover:text-[#888888] transition-colors">Garantías</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto mt-32 pt-8 border-t border-[#111111] flex flex-col md:flex-row justify-between text-[#333333] text-[10px] font-bold uppercase tracking-widest">
          <p>© 2026 TechPC Store. Todos los derechos reservados.</p>
          <p className="mt-4 md:mt-0">Powered by Gemini AI · Vercel · Next.js</p>
        </div>
      </footer>

      {/* ── Chat Widget (floating) ── */}
      <ChatWidget />
    </div>
  );
}
