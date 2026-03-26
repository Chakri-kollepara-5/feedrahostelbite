import React from "react";

const Badge = ({
    className = "",
    variant = "default", // default, secondary, outline, success, warning, error
    children,
    ...props
}) => {
    const baseStyles =
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        default: "bg-primary-100 text-primary-800 border border-transparent",
        secondary: "bg-gray-100 text-gray-800 border border-transparent",
        outline: "text-gray-800 border border-gray-200",
        success: "bg-green-100 text-green-800 border border-transparent",
        warning: "bg-yellow-50 text-yellow-800 border border-yellow-200",
        error: "bg-red-100 text-red-800 border border-transparent",
        info: "bg-blue-50 text-blue-700 border border-blue-100",
    };

    return (
        <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
            {children}
        </div>
    );
};

export default Badge;
