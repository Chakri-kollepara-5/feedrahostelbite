import React from "react";

const Card = ({ className = "", children, ...props }) => {
    return (
        <div
            className={`bg-white/95 rounded-3xl border border-[#0D2B1B]/10 shadow-[0_12px_30px_-5px_rgba(13,43,27,0.08),0_4px_12px_-2px_rgba(0,0,0,0.03)] hover:scale-[1.01] hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-15px_rgba(13,43,27,0.18),0_0_20px_rgba(159,232,112,0.12)] transition-all duration-300 backdrop-blur-sm ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

const CardHeader = ({ className = "", children, ...props }) => (
    <div className={`p-6 pb-2 ${className}`} {...props}>
        {children}
    </div>
);

const CardTitle = ({ className = "", children, ...props }) => (
    <h3 className={`text-lg font-semibold text-gray-900 leading-tight ${className}`} {...props}>
        {children}
    </h3>
);

const CardDescription = ({ className = "", children, ...props }) => (
    <p className={`text-sm text-gray-500 mt-1 ${className}`} {...props}>
        {children}
    </p>
);

const CardContent = ({ className = "", children, ...props }) => (
    <div className={`p-6 pt-2 ${className}`} {...props}>
        {children}
    </div>
);

const CardFooter = ({ className = "", children, ...props }) => (
    <div className={`p-6 pt-0 flex items-center ${className}`} {...props}>
        {children}
    </div>
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
