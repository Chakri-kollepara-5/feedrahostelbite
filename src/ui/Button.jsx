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
        "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

    const variants = {
        primary:
            "bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md focus:ring-primary-500 border border-transparent",
        secondary:
            "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm focus:ring-gray-200",
        outline:
            "bg-transparent text-gray-700 border border-gray-200 hover:bg-gray-50 focus:ring-gray-200",
        ghost:
            "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-200",
        danger:
            "bg-red-600 text-white hover:bg-red-700 shadow-sm focus:ring-red-500",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
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
