'use client'

import React, {useState, useCallback} from 'react';
import {FaRegCreditCard} from "react-icons/fa";

// Simple SVG Icons (can be replaced with an icon library like Heroicons or FontAwesome)
const CopyIcon = ({className = "w-4 h-4"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className={className}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75c-.621 0-1.125-.504-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876V5.25a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V3c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125v1.125c0 .621.504 1.125 1.125 1.125h1.5c.621 0 1.125.504 1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h.75a2.25 2.25 0 0 1 2.25 2.25v9.75c0 .621-.504 1.125-1.125 1.125h-3.375Z"/>
    </svg>
);

const CheckIcon = ({className = "w-4 h-4"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
    </svg>
);


const FooterBankNumber = ({bank}) => {
    const [isCopied, setIsCopied] = useState(false);
    const [copyError, setCopyError] = useState(false); // Optional: For error state

    const copyToClipboard = useCallback(async () => {
        if (!navigator.clipboard) {
            console.error("Clipboard API not available");
            setCopyError(true); // Indicate error
            // Optionally reset error state after a delay
            setTimeout(() => setCopyError(false), 2000);
            return;
        }

        try {
            await navigator.clipboard.writeText(bank.cardCode.replace(/\s+/g, ''));
            setIsCopied(true);
            setCopyError(false); // Clear any previous error
            console.log("Bank number copied to clipboard:", bank.cardCode);

            // Reset the copied state after a short delay (e.g., 2 seconds)
            const timer = setTimeout(() => {
                setIsCopied(false);
            }, 2000);

            // Cleanup timer if component unmounts or copy is clicked again
            return () => clearTimeout(timer);

        } catch (err) {
            console.error('Failed to copy text: ', err);
            setCopyError(true);
            // Optionally reset error state after a delay
            setTimeout(() => setCopyError(false), 2000);
            setIsCopied(false); // Ensure copied state is false on error
        }
    }, [bank.cardCode]); // Dependency array includes 'number'

    const defaultTooltip = "Bank nömrəsini kopyala";
    const copiedTooltip = "Kopyalandı!";
    const errorTooltip = "Kopyalama xətası!"; // Optional error tooltip

    let currentTooltip = defaultTooltip;
    if (isCopied) {
        currentTooltip = copiedTooltip;
    } else if (copyError) {
        currentTooltip = errorTooltip;
    }


    return (

        <>

            <div
                className="bg-gray-700/60 p-3 flex justify-between items-center rounded-lg border border-gray-600/50 shadow-sm"> {/* Kart bloku stili */}
                <div className="flex items-center mb-1.5"> {/* Bank adı + icon */}
                    <FaRegCreditCard
                        className="mr-2 text-green-400 text-opacity-80"/> {/* İcon react-icons-dan import edilməlidir */}
                    <span className="font-medium text-gray-200 text-xs">{bank.bankName}:</span>
                </div>
                {/* Nömrənin göstərilməsi (TƏHLÜKƏSİZLİK RİSKİ!) */}
                <div className="relative group"> {/* Add relative positioning for potential absolute tooltip */}
                    <button
                        onClick={copyToClipboard}
                        // Use Tailwind classes for styling the button
                        className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-md
                    bg-gray-700/80 hover:bg-gray-600/90 focus:bg-gray-600/90
                    text-gray-300 hover:text-white focus:text-white
                    font-mono text-xs tracking-wider select-all
                    cursor-pointer transition-all duration-150 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500
                    ${copyError ? 'ring-2 ring-red-500' : ''} // Visual indication of error
                `}
                        // Use aria-label for accessibility, announces purpose beyond visual text
                        aria-label={isCopied ? "Nömrə kopyalandı" : "Bank nömrəsini kopyala"}
                        title={currentTooltip} // Tooltip for mouse users
                    >
                        {/* The bank number */}
                        <span>{bank.cardCode}</span>

                        {/* Conditional Icon */}
                        <span className="inline-block w-4 h-4 transition-opacity duration-150">
                    {isCopied ? (
                        <CheckIcon className="w-4 h-4 text-green-400"/>
                    ) : (
                        <CopyIcon
                            className="w-4 h-4 text-gray-400 group-hover:text-gray-200 group-focus:text-gray-200"/>
                    )}
                </span>
                    </button>

                    {/* Optional: More advanced tooltip/feedback mechanism can be added here */}
                    {/* Example:
             {(isCopied || copyError) && (
                <span className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded text-white ${isCopied ? 'bg-green-600' : 'bg-red-600'} whitespace-nowrap`}>
                   {isCopied ? "Kopyalandı!" : "Xəta!"}
                </span>
             )}
             */}
                </div>
            </div>
        </>


    );
};

export default FooterBankNumber;
