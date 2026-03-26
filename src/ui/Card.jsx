import React from "react";

const Card = ({ className = "", children, ...props }) => {
    return (
        <div
            className={`bg-white rounded-2xl border border-gray-200 shadow-premium hover:shadow-premium-hover transition-shadow duration-300 ${className}`}
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
