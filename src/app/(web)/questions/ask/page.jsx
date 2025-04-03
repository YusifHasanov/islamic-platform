// app/questions/ask/page.jsx (or relevant path in your structure)
'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import HttpClient from '@/util/HttpClient'; // Assuming HttpClient is correctly set up
import {ChevronLeft, Send, Loader2, CheckCircle, AlertTriangle, HelpCircle} from 'lucide-react';
import {useRouter} from "next/navigation";

export default function AskQuestionPage() {
    const [questionText, setQuestionText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' }); // 'success', 'error', or null
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!questionText.trim()) {
            setSubmitStatus({ type: 'error', message: 'Zəhmət olmasa, sualınızı daxil edin.' });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' }); // Clear previous status

        try {
            // --- API Call Placeholder ---
            // Replace '/questions/submit' with your actual API endpoint
            // Adjust the payload { question: questionText } as needed by your backend
            const response = await HttpClient.post('/questions/submit', { question: questionText });

            if (!response.ok) {
                // Try to get error message from response, otherwise use generic one
                let errorMessage = 'Sual göndərilərkən xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch (parseError) {
                    // Ignore if response body is not JSON or empty
                }
                throw new Error(errorMessage);
            }

            // Assuming success if response.ok is true
            // Optionally, you could parse response.json() if the backend sends data back
            setSubmitStatus({ type: 'success', message: 'Sualınız uğurla göndərildi! Tezliklə nəzərdən keçiriləcək.' });
            setQuestionText(''); // Clear the form on success

        } catch (error) {
            console.error("Error submitting question:", error);
            setSubmitStatus({ type: 'error', message: error.message || 'Gözlənilməyən xəta baş verdi.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

                {/* Back Link */}
                <div className="mb-8">
                    <Link href="/questions" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-800">
                        <ChevronLeft className="h-5 w-5 mr-1" />
                        Suallar Siyahısına Qayıt
                    </Link>
                </div>

                {/* Page Header */}
                <div className="text-center mb-10">
                    <HelpCircle size={48} className="text-emerald-600 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Yeni Sual Verin</h1>
                    <p className="mt-3 text-base text-gray-600">
                        Cavabını tapa bilmədiyiniz bir sualınız var? Aşağıdakı formu doldurun.
                    </p>
                </div>

                {/* Submission Status Message */}
                {submitStatus.type && (
                    <div className={`mb-6 p-4 rounded-md border ${
                        submitStatus.type === 'success'
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-red-50 border-red-200 text-red-800'
                    }`}>
                        <div className="flex items-center">
                            {submitStatus.type === 'success' ? (
                                <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                            ) : (
                                <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                            )}
                            <p className="text-sm font-medium">{submitStatus.message}</p>
                        </div>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-100">
                    <div className="mb-6">
                        <label htmlFor="questionText" className="block text-sm font-medium text-gray-800 mb-2">
                            Sualınız <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="questionText"
                            name="questionText"
                            rows={6}
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                            placeholder="Sualınızı buraya ətraflı yazın..."
                            required
                            className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        />
                        <p className="mt-2 text-xs text-gray-500">Zəhmət olmasa, sualınızı aydın və konkret ifadə edin.</p>
                    </div>

                    {/* Optional: Add fields for Name/Email if needed
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                             <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-2">Adınız (optional)</label>
                             <input type="text" id="name" name="name" className="block w-full px-4 py-3 border border-gray-300 rounded-md ..." disabled={isSubmitting} />
                        </div>
                         <div>
                             <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">Email (optional)</label>
                             <input type="email" id="email" name="email" className="block w-full px-4 py-3 border border-gray-300 rounded-md ..." disabled={isSubmitting} />
                        </div>
                    </div>
                     */}

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting || !questionText.trim()}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isSubmitting ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <Send className="h-5 w-5" />
                            )}
                            {isSubmitting ? 'Göndərilir...' : 'Sualı Göndər'}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
