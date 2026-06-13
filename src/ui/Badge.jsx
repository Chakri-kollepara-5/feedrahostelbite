import React from "react";

const Badge = ({
    className = "",
    variant = "default", // default, secondary, outline, success, warning, error
    children,
    ...props
}) => {
    const baseStyles =
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider border shadow-sm transition-all duration-150";

    const variants = {
        default: "bg-gradient-to-r from-[#b1f284] to-[#9FE870] text-[#0D2B1B] border-[#85cd58]/40",
        secondary: "bg-white/80 backdrop-blur-sm text-[#0D2B1B] border-gray-200",
        outline: "bg-transparent text-[#0D2B1B] border-current",
        success: "bg-gradient-to-r from-emerald-400 to-emerald-500 text-white border-emerald-600/20",
        warning: "bg-gradient-to-r from-amber-300 to-amber-400 text-[#0D2B1B] border-amber-500/20",
        error: "bg-gradient-to-r from-rose-400 to-rose-500 text-white border-rose-600/20",
        info: "bg-gradient-to-r from-sky-400 to-sky-500 text-white border-sky-600/20",
    };

    return (
        <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
            {children}
        </div>
    );
};

export default Badge;
