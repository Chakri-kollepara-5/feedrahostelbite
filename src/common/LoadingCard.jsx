import React from 'react';

const LoadingCard = () => (
    <div className="bg-white rounded-2xl shadow-sm border p-6 animate-pulse" role="status" aria-label="Loading content">
        <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
        <div className="h-4 bg-gray-200 rounded w-full mb-3" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
        <div className="h-10 bg-gray-200 rounded" />
        <span className="sr-only">Loading...</span>
    </div>
);

export default LoadingCard;
