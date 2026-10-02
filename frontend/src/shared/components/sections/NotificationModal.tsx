import React from 'react';

interface NotificationModalProps {
    isOpen: boolean;
    type?: 'success' | 'error';
    message: string;
    onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ 
    isOpen, 
    type = 'success', 
    message, 
    onClose 
}) => {
    if (!isOpen) return null;

    const isSuccess = type === 'success';
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
            <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-2xl transition-all dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                
                {/* Icon Section */}
                <div className="flex items-center space-x-4">
                    <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                        isSuccess ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
                    }`}>
                        {isSuccess ? (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        )}
                    </div>

                    {/* Message Content */}
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                            {isSuccess ? 'Success!' : 'Notice / Error'}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                            {message}
                        </p>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className={`inline-flex justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 ${
                            isSuccess 
                                ? 'bg-emerald-600 hover:bg-emerald-500 focus:ring-emerald-500' 
                                : 'bg-rose-600 hover:bg-rose-500 focus:ring-rose-500'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                    >
                        Okay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;