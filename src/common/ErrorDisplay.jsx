import React from 'react';
import { AlertCircle, RefreshCw } from "lucide-react";

const ErrorDisplay = ({ error, onRetry }) => (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center" role="alert">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-red-900 mb-2">Connection Issue</h3>
        <p className="text-red-700 mb-4">{error}</p>
        <button
            onClick={onRetry}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition-colors"
            aria-label="Retry loading data"
        >
            <RefreshCw className="h-4 w-4 inline-block mr-2" aria-hidden="true" />
            Retry
        </button>
    </div>
);

export default ErrorDisplay;
