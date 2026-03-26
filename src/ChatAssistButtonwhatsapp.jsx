import { useState } from "react";

export default function ChatAssistButton() {
  const phone = "918885628836";
  const [hover, setHover] = useState(false);

  const openWhatsApp = () => {
    const url = `https://wa.me/${phone}?text=Hello%20I%20need%20help`;
    window.open(url, "_blank");
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Modern Slide-in message bubble */}
      {hover && (
        <div className="mb-2 py-2 px-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg animate-fade-in">
          Chat with us on WhatsApp
        </div>
      )}

      {/* Online indicator dot */}
      <div className="absolute bottom-16 right-6 w-3 h-3 bg-green-500 rounded-full shadow-md animate-pulse"></div>

      {/* Main chat button */}
      <button
        onClick={openWhatsApp}
        className="
          bg-green-500 text-white
          p-4 rounded-full shadow-lg
          transition-all duration-300
          hover:bg-green-600 hover:scale-110
          flex items-center justify-center
        "
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='30'
          height='30'
          fill='currentColor'
          viewBox='0 0 16 16'
        >
          <path d='M13.601 2.326A7.854 7.854 0 0 0 8.004 0C3.584 0 .01 3.584.01 8.004c0 1.41.368 2.792 1.06 4.016L0 16l4.088-1.06a7.965 7.965 0 0 0 3.916 1.06h.004c4.42 0 8.004-3.584 8.004-8.004a7.95 7.95 0 0 0-2.411-5.67zM8.004 14.6a6.56 6.56 0 0 1-3.356-.92l-.24-.144-2.424.628.648-2.36-.16-.244a6.52 6.52 0 0 1-1.004-3.476c0-3.62 2.948-6.568 6.568-6.568a6.54 6.54 0 0 1 4.636 1.924 6.49 6.49 0 0 1 1.928 4.632c0 3.62-2.948 6.568-6.568 6.568zm3.63-4.935c-.198-.099-1.174-.578-1.356-.646-.182-.066-.314-.099-.446.099-.132.198-.512.646-.628.778-.116.132-.232.148-.43.05-.198-.099-.837-.309-1.595-.99-.59-.525-.99-1.176-1.106-1.374-.116-.198-.012-.304.087-.403.089-.088.198-.232.297-.347.099-.116.132-.198.198-.33.066-.132.033-.248-.017-.347-.05-.099-.446-1.07-.618-1.464-.162-.389-.327-.335-.446-.341-.116-.006-.248-.007-.38-.007a.73.73 0 0 0-.529.248c-.182.198-.694.678-.694 1.654 0 .975.71 1.916.81 2.046.099.132 1.4 2.138 3.39 3.001.474.205.842.328 1.129.42.474.15.904.129 1.245.078.38-.057 1.174-.48 1.34-.945.165-.464.165-.863.116-.945-.05-.082-.182-.132-.38-.231z' />
        </svg>
      </button>
    </div>
  );
}
