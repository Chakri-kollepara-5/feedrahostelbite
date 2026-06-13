import React from "react";
import { Loader2 } from "lucide-react";

const Button = ({
    className = "",
    variant = "primary", // primary, secondary, outline, ghost, danger
    size = "md", // sm, md, lg
    isLoading = false,
    disabled = false,
    children,
    ...props
}) => {
    const baseStyles =
        "inline-flex items-center justify-center rounded-full font-black uppercase tracking-wider transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0";

    const variants = {
        primary:
            "bg-gradient-to-b from-[#16462d] to-[#0D2B1B] text-[#9FE870] border border-[#0A2215] shadow-[0_4px_0_0_#05120b,0_8px_16px_rgba(13,43,27,0.15)] hover:from-[#1d5c3b] hover:to-[#123e25] hover:translate-y-[-1px] hover:shadow-[0_5px_0_0_#05120b,0_12px_20px_rgba(13,43,27,0.22)] active:translate-y-[3px] active:shadow-[0_1px_0_0_#05120b,0_4px_8px_rgba(13,43,27,0.1)]",
        secondary:
            "bg-gradient-to-b from-[#b7f58b] to-[#9FE870] text-[#0D2B1B] border border-[#84cf57] shadow-[0_4px_0_0_#75b949,0_8px_16px_rgba(159,232,112,0.15)] hover:from-[#c5f89f] hover:to-[#8fe05d] hover:translate-y-[-1px] hover:shadow-[0_5px_0_0_#75b949,0_12px_20px_rgba(159,232,112,0.22)] active:translate-y-[3px] active:shadow-[0_1px_0_0_#75b949,0_4px_8px_rgba(159,232,112,0.1)]",
        outline:
            "bg-gradient-to-b from-white to-[#f1f5f9] text-[#0D2B1B] border border-[#cbd5e1] shadow-[0_4px_0_0_#cbd5e1,0_8px_16px_rgba(0,0,0,0.06)] hover:from-[#f8fafc] hover:to-[#e2e8f0] hover:translate-y-[-1px] hover:shadow-[0_5px_0_0_#cbd5e1,0_12px_20px_rgba(0,0,0,0.08)] active:translate-y-[3px] active:shadow-[0_1px_0_0_#cbd5e1,0_4px_8px_rgba(0,0,0,0.04)]",
        ghost:
            "bg-transparent text-[#0D2B1B] hover:bg-[#9FE870]/20 hover:scale-[1.02] active:scale-[0.98]",
        danger:
            "bg-gradient-to-b from-red-400 to-red-500 text-white border border-red-600 shadow-[0_4px_0_0_#991b1b,0_8px_16px_rgba(239,68,68,0.15)] hover:from-red-500 hover:to-red-600 hover:translate-y-[-1px] hover:shadow-[0_5px_0_0_#991b1b,0_12px_20px_rgba(239,68,68,0.22)] active:translate-y-[3px] active:shadow-[0_1px_0_0_#991b1b,0_4px_8px_rgba(239,68,68,0.1)]",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3.5 text-base",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
};

export default Button;
