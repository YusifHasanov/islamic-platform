"use client";

import React, { useState, useCallback } from 'react';
import { FaRegCreditCard } from "react-icons/fa"; // Or your preferred icon library

// Simple SVG Icons (as placeholders or use Lucide/Heroicons)
const CopyIcon = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75c-.621 0-1.125-.504-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876V5.25a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V3c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125v1.125c0 .621.504 1.125 1.125 1.125h1.5c.621 0 1.125.504 1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h.75a2.25 2.25 0 0 1 2.25 2.25v9.75c0 .621-.504 1.125-1.125 1.125h-3.375Z"/>
    </svg>
);

const CheckIcon = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
    </svg>
);

const ModalBankCardItem = ({ bank }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [copyError, setCopyError] = useState(false);

    const copyToClipboard = useCallback(async () => {
        if (!navigator.clipboard) {
            console.error("Clipboard API not available");
            setCopyError(true);
            setTimeout(() => setCopyError(false), 2000);
            return;
        }
        try {
            await navigator.clipboard.writeText(bank.cardCode.replace(/\s+/g, ''));
            setIsCopied(true);
            setCopyError(false);
            const timer = setTimeout(() => setIsCopied(false), 2000);
            return () => clearTimeout(timer);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            setCopyError(true);
            setTimeout(() => setCopyError(false), 2000);
            setIsCopied(false);
        }
    }, [bank.cardCode]);

    const tooltipText = copyError ? "Xəta!" : (isCopied ? "Kopyalandı!" : "Kopyala");

    return (
        <div className="py-3 px-2 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 last:border-b-0">
            {/* Bank Info */}
            <div className="flex items-center mb-2 sm:mb-0">
                <FaRegCreditCard className="mr-2.5 text-emerald-600 flex-shrink-0" size={18}/>
                <div>
                    <span className="font-semibold text-sm text-gray-800 block">{bank.bankName}</span>
                    <span className="font-mono text-xs text-gray-500 tracking-wider block select-all">
                        {bank.cardCode}
                    </span>
                </div>
            </div>

            {/* Copy Button */}
            <button
                onClick={copyToClipboard}
                title={tooltipText}
                className={`
                    mt-1 sm:mt-0 flex-shrink-0 ml-auto sm:ml-4 flex items-center gap-1.5 px-2.5 py-1 rounded-md border
                    text-xs transition-all duration-150 ease-in-out group relative
                    focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-400
                    ${isCopied
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                    : `bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-800 ${copyError ? 'border-red-400 text-red-600' : ''}`
                }
                `}
                aria-label={isCopied ? `${bank.bankName} nömrəsi kopyalandı` : `${bank.bankName} nömrəsini kopyala`}
            >
                <span>{isCopied ? "Kopyalandı" : "Kopyala"}</span>
                <span className="inline-block w-4 h-4">
                    {isCopied ? (
                        <CheckIcon className="w-4 h-4 text-emerald-600"/>
                    ) : (
                        <CopyIcon className={`w-4 h-4 ${copyError ? 'text-red-500' : 'text-gray-400 group-hover:text-gray-600'}`}/>
                    )}
                </span>
                {/* Optional simple tooltip display on hover/focus */}
                {/* <span className="absolute hidden group-hover:block group-focus:block -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 text-xs bg-gray-700 text-white rounded whitespace-nowrap z-10">
                     {tooltipText}
                 </span> */}
            </button>
        </div>
    );
};

export default ModalBankCardItem;
