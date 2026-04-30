'use client';

/**
 * A client-side button that opens the PCBot chat widget from anywhere on the page.
 * It dispatches a custom DOM event that ChatWidget listens to.
 */
export default function OpenChatButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('open-pcbot'))}
      className={className}
    >
      {children}
    </button>
  );
}
