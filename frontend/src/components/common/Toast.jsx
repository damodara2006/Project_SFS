import React, { useEffect } from 'react';
import { FiCheckCircle, FiXCircle, FiInfo } from 'react-icons/fi';

const Toast = ({ message, type, onClose }) => {
    if (!message) return null;

    const baseClasses = "fixed bottom-5 right-5 p-4 rounded-lg shadow-xl text-white z-50 flex items-center transition-opacity duration-300";
    let styleClasses = "";
    let Icon = FiInfo;

    switch (type) {
        case 'success':
            styleClasses = "bg-green-500";
            Icon = FiCheckCircle;
            break;
        case 'error':
            styleClasses = "bg-red-500";
            Icon = FiXCircle;
            break;
        default:
            styleClasses = "bg-indigo-600";
            Icon = FiInfo;
    }

    // Auto-hide the toast after 3 seconds
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [message, onClose]);

    return (
        <div className={`${baseClasses} ${styleClasses}`} onClick={onClose}>
            <Icon className="w-5 h-5 mr-2" />
            <span>{message}</span>
        </div>
    );
};

export default Toast;
