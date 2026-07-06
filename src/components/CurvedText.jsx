import React from 'react';

export default function CurvedText() {
  const text = "SURPLUS FOOD RESCUE • LIVE SHARING SYSTEM • ZERO WASTE • ";
  
  return (
    <div className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center pointer-events-none select-none">
      {/* Center glowing indicator */}
      <div className="absolute w-2 h-2 bg-[#9FE870] rounded-full shadow-[0_0_12px_#9FE870] animate-pulse"></div>

      {/* Rotating SVG */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full animate-[spin_16s_linear_infinite]"
      >
        <defs>
          <path
            id="curvedTextPath"
            d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
          />
        </defs>
        <text className="fill-white/80 dark:fill-white/80 font-black font-mono text-[6.5px] uppercase tracking-[1.5px]">
          <textPath href="#curvedTextPath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
