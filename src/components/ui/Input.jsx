import React from "react";

const Input = React.forwardRef(({ className = "", error, ...props }, ref) => {
    return (
        <div className="w-full">
            <input
                className={`flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${error ? "border-red-500 focus-visible:ring-red-500" : ""
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
