// components/contact/BankCardCopy.jsx
'use client';

import React, { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react'; // İkonlar

const BankCardCopy = ({bank}) => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = useCallback(() => {
        navigator.clipboard.writeText(bank.cardCode.replace(/\s/g, '')) // Boşluqları silərək kopyala
            .then(() => {
                setIsCopied(true);
                // 2 saniyə sonra "Kopyalandı" statusunu sıfırla
                setTimeout(() => setIsCopied(false), 2000);
            })
            .catch(err => {
                console.error('Kopyalama xətası: ', err);
                // Burada istifadəçiyə xəta mesajı göstərə bilərsiniz
            });
    }, [bank.cardCode]);

    return (
        <div className="flex items-center justify-between gap-1 p-1 px-2 bg-gray-100/70 rounded-lg border border-gray-200">
            <div>
                <p className="text-sm font-medium text-gray-800">{bank.bankName}</p>
                <p className={`text-sm font-mono tracking-wider ${isCopied ? "text-green-700" : "text-gray-600"} select-all`}>
                    {bank.cardCode} {/* Nömrəni boşluqlarla göstər */}
                </p>
            </div>
            <button
                onClick={copyToClipboard}
                className={`p-2 rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-400 ${
                    isCopied
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
                title={isCopied ? "Kopyalandı!" : "Nömrəni kopyala"}
                aria-label={isCopied ? "Bank nömrəsi kopyalandı" : "Bank nömrəsini kopyala"}
            >
                {isCopied ? (
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                ) : (
                    <Copy className="h-4 w-4" strokeWidth={2} />
                )}
            </button>
        </div>
    );
};

export default BankCardCopy;
