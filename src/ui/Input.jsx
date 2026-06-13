import React from "react";

const Input = React.forwardRef(({ className = "", error, ...props }, ref) => {
    return (
        <div className="w-full">
            <input
                className={`flex h-12 w-full rounded-full border border-gray-200 bg-white px-5 py-2 text-sm text-[#0D2B1B] placeholder:text-[#0D2B1B]/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#9FE870]/30 focus-visible:border-[#9FE870] focus-visible:shadow-[0_0_20px_rgba(159,232,112,0.25)] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${error ? "border-red-500 focus-visible:ring-red-300 focus-visible:shadow-[0_0_20px_rgba(239,68,68,0.25)]" : ""
                    } ${className}`}
                ref={ref}
                {...props}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
});

Input.displayName = "Input";

export default Input;
