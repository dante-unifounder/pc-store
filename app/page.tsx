import ChatWidget from '@/components/ChatWidget';
import OpenChatButton from '@/components/OpenChatButton';

const categories = [
  { icon: '⚡', label: 'Procesadores', sub: 'Intel & AMD', color: 'from-blue-500/20 to-blue-600/10' },
  { icon: '🎮', label: 'Tarjetas de Video', sub: 'NVIDIA & AMD', color: 'from-green-500/20 to-green-600/10' },
  { icon: '💾', label: 'Memoria RAM', sub: 'DDR4 & DDR5', color: 'from-purple-500/20 to-purple-600/10' },
  { icon: '💿', label: 'Almacenamiento', sub: 'NVMe · SSD · HDD', color: 'from-yellow-500/20 to-yellow-600/10' },
  { icon: '🔌', label: 'Placas Base', sub: 'Intel & AMD', color: 'from-red-500/20 to-red-600/10' },
  { icon: '⚡', label: 'Fuentes de Poder', sub: '80+ Gold & Platinum', color: 'from-orange-500/20 to-orange-600/10' },
  { icon: '🖥️', label: 'Gabinetes', sub: 'ATX · Micro-ATX · ITX', color: 'from-cyan-500/20 to-cyan-600/10' },
  { icon: '❄️', label: 'Refrigeración', sub: 'Aire & Líquida', color: 'from-indigo-500/20 to-indigo-600/10' },
];

const steps = [
  { num: '01', title: 'Contanós para qué usás la PC', desc: 'Gaming, diseño, edición de video, trabajo... PCBot adapta cada recomendación a tu uso real.', icon: '💬' },
  { num: '02', title: 'Decinos tu presupuesto', desc: 'PCBot solo recomienda lo que tenemos en stock y dentro de tu presupuesto. Sin sorpresas.', icon: '💰' },
  { num: '03', title: 'Recibís tu build completa', desc: 'Lista de componentes compatibles, precios exactos y total. Listo para comprar.', icon: '✅' },
];

const features = [
  { icon: '🤖', title: 'Asesor IA 24/7', desc: 'PCBot te ayuda a armar tu PC en minutos, any time, any day.' },
  { icon: '📦', title: 'Stock en tiempo real', desc: 'Solo ves productos con disponibilidad real. Sin esperas ni decepciones.' },
  { icon: '🔧', title: 'Compatibilidad garantizada', desc: 'El asesor verifica que CPU, placa, RAM y fuente sean 100% compatibles.' },
  { icon: '💸', title: 'Mejor precio-calidad', desc: 'Optimizamos cada peso de tu presupuesto con los mejores componentes disponibles.' },
  { icon: '🚀', title: 'Envíos rápidos', desc: 'Despacho en 24hs para componentes con stock. Seguimiento en tiempo real.' },
  { icon: '🛡️', title: 'Garantía oficial', desc: 'Todos los productos con garantía de fábrica. Soporte post-venta incluido.' },
];

const faqs = [
  { q: '¿El asesor IA es gratuito?', a: 'Sí, PCBot es completamente gratuito. Solo pagás por los componentes que comprás.' },
  { q: '¿Qué pasa si un componente se agota después de que me lo recomendaron?', a: 'El inventario se actualiza en tiempo real. Si al momento de la compra hay stock, el pedido se procesa sin problemas.' },
  { q: '¿Puedo pedirle a PCBot que ajuste la build?', a: 'Por supuesto. Podés pedirle que suba/baje el presupuesto, cambie de marca o priorice ciertos componentes.' },
  { q: '¿Cómo sé que los componentes son compatibles entre sí?', a: 'PCBot verifica la compatibilidad de socket, tipo de RAM y requisitos de energía antes de darte una recomendación.' },
  { q: '¿Hacen envíos al interior?', a: 'Sí, enviamos a todo el país. Calculamos el costo de envío según tu ubicación al momento del checkout.' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#030712]/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2">
            <span className="text-2xl">🖥️</span>
            <span className="text-lg font-bold">Tech<span className="text-indigo-400">PC</span> Store</span>
          </a>
          <ul className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <li><a href="#como-funciona" className="hover:text-white transition-colors">Cómo funciona</a></li>
            <li><a href="#categorias" className="hover:text-white transition-colors">Categorías</a></li>
            <li><a href="#features" className="hover:text-white transition-colors">Beneficios</a></li>
            <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
          </ul>
          <a href="#como-funciona" className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/25">
            Armar mi PC →
          </a>
        </nav>
      </header>

      <section className="relative overflow-hidden pt-20 pb-32 px-6">
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Asesor IA con stock en tiempo real
          </div>
          <h1 className="mb-6 text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            Armá tu{' '}<span className="gradient-text">PC ideal</span><br />con ayuda de IA
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed">
            Describí para qué vas a usar la PC y tu presupuesto. Nuestro asesor inteligente te arma la configuración perfecta con los componentes que tenemos en stock.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <OpenChatButton className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 px-8 py-4 text-base font-bold text-white shadow-xl shadow-indigo-500/20 transition-all hover:scale-105">
              💬 Hablar con PCBot gratis
            </OpenChatButton>
            <a href="#categorias" className="w-full sm:w-auto rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 px-8 py-4 text-base font-semibold text-white transition-all hover:border-white/20">
              Ver componentes →
            </a>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/5 pt-12">
            {[{value:'+500',label:'Clientes satisfechos'},{value:'34',label:'Componentes en stock'},{value:'24hs',label:'Tiempo de despacho'}].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-extrabold gradient-text">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-400">Simple y rápido</p>
            <h2 className="text-4xl font-bold">¿Cómo funciona <span className="gradient-text">PCBot</span>?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="relative rounded-2xl border border-white/8 bg-white/3 p-8 card-hover">
                <span className="absolute -top-4 left-8 rounded-full border border-indigo-500/30 bg-[#030712] px-3 py-1 text-xs font-bold text-indigo-400">{step.num}</span>
                <div className="mb-4 text-4xl">{step.icon}</div>
                <h3 className="mb-2 text-lg font-bold text-white">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="categorias" className="px-6 py-24 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">Todo lo que necesitás</p>
            <h2 className="text-4xl font-bold">Nuestro <span className="gradient-text">catálogo</span></h2>
            <p className="mt-4 text-slate-400">Desde entry-level hasta ultra high-end. PCBot te ayuda a elegir lo mejor para tu caso.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div key={cat.label} className={`rounded-2xl border border-white/8 bg-gradient-to-br ${cat.color} p-5 card-hover cursor-default`}>
                <div className="mb-3 text-3xl">{cat.icon}</div>
                <h3 className="font-semibold text-white text-sm leading-tight">{cat.label}</h3>
                <p className="mt-1 text-xs text-slate-500">{cat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-400">Por qué elegirnos</p>
            <h2 className="text-4xl font-bold">La mejor experiencia para <span className="gradient-text">armar tu PC</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/8 bg-white/3 p-6 card-hover">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-2xl border border-indigo-500/20">{f.icon}</div>
                <h3 className="mb-2 font-bold text-white">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-6 my-8 overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 px-8 py-16 text-center shadow-2xl shadow-indigo-500/20">
        <h2 className="mb-4 text-3xl md:text-4xl font-extrabold text-white">¿Listo para armar tu PC?</h2>
        <p className="mb-8 text-indigo-100 text-lg">Hablá con PCBot ahora. Es gratis, inteligente y tiene el stock actualizado.</p>
        <OpenChatButton className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-bold text-indigo-700 shadow-lg transition-all hover:scale-105">
          <span>💬</span><span>Iniciar chat con PCBot</span>
        </OpenChatButton>
      </section>

      <section id="faq" className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold">Preguntas <span className="gradient-text">frecuentes</span></h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl border border-white/8 bg-white/3 px-6 py-5 cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-white list-none">
                  {faq.q}
                  <span className="ml-4 shrink-0 text-indigo-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🖥️</span>
              <span className="font-bold">Tech<span className="text-indigo-400">PC</span> Store</span>
            </div>
            <div className="flex gap-8 text-sm text-slate-500">
              <a href="#" className="hover:text-white transition-colors">Términos</a>
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Contacto</a>
              <a href="#" className="hover:text-white transition-colors">Garantías</a>
            </div>
            <p className="text-sm text-slate-600">© 2026 TechPC Store. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
