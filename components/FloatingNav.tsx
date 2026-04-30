'use client';

/* SVG icons for the floating nav */
const CpuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
  </svg>
);

const GpuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="6" width="22" height="12" rx="2" />
    <circle cx="8" cy="12" r="2" /><circle cx="16" cy="12" r="2" />
    <line x1="6" y1="18" x2="6" y2="21" /><line x1="18" y1="18" x2="18" y2="21" />
  </svg>
);

const RamIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="1" />
    <line x1="7" y1="4" x2="7" y2="20" /><line x1="11" y1="4" x2="11" y2="20" />
    <line x1="15" y1="4" x2="15" y2="20" />
    <rect x="1" y="8" width="2" height="8" rx="1" /><rect x="21" y="8" width="2" height="8" rx="1" />
  </svg>
);

const DriveIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="12" rx="10" ry="6" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <circle cx="16.5" cy="12" r="1" />
  </svg>
);

const BuildIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const navItems = [
  { icon: <CpuIcon />, label: 'Procesadores' },
  { icon: <GpuIcon />, label: 'Tarjetas de Video' },
  { icon: <RamIcon />, label: 'Memoria RAM' },
  { icon: <DriveIcon />, label: 'Almacenamiento' },
  { icon: <BuildIcon />, label: 'Armar PC' },
];

export default function FloatingNav() {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] hidden md:flex items-center gap-2 p-2 glass-nav rounded-2xl shadow-2xl">
      <div className="flex items-center gap-1 pr-4 border-r border-[#333333]">
        {navItems.map((item) => (
          <button
            key={item.label}
            title={item.label}
            className="p-3 hover:bg-[#222222] rounded-xl transition-all text-[#888888] hover:text-white"
          >
            {item.icon}
          </button>
        ))}
      </div>
      <button
        onClick={() => window.dispatchEvent(new CustomEvent('open-pcbot'))}
        className="px-6 py-3 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold text-sm tracking-wide uppercase rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/30"
      >
        Chatear con PCBot
      </button>
    </div>
  );
}
