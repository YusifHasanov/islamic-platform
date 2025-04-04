// components/contact/ContactForm.jsx
'use client';

import React, {useState} from 'react';
// useFormState və useFormStatus artıq lazım deyil
import {Send, Loader2, AlertCircle, CheckCircle} from 'lucide-react';
// API endpoint üçün base URL (yolu öz layihənizə uyğunlaşdırın)
import {BASE_URL} from "@/util/Const";
import HttpClient from "@/util/HttpClient";
// HttpClient lazım olarsa import edin, ya da birbaşa fetch istifadə edin
// import HttpClient from '@/util/HttpClient';

// Əsas Form Komponenti
export default function ContactForm() {
    // Form məlumatlarını saxlamaq üçün state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        phone: '',
        message: ''
    });
    // Göndərmə statusunu (loading) saxlamaq üçün state
    const [isLoading, setIsLoading] = useState(false);
    // Göndərmə nəticəsini (uğur/xəta) saxlamaq üçün state
    const [submitStatus, setSubmitStatus] = useState({status: null, message: ''}); // { status: 'success'/'error', message: '...' }

    // Input dəyişikliklərini idarə edən funksiya
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    // Form göndərmə funksiyası
    const handleSubmit = async (event) => {
        event.preventDefault(); // Standart form göndərməsinin qarşısını alır
        setIsLoading(true); // Yüklənmə statusunu aktiv edir
        setSubmitStatus({status: null, message: ''}); // Əvvəlki statusu təmizləyir

        // --- Client tərəfli sadə validasiya ---
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setSubmitStatus({status: 'error', message: 'Zəhmət olmasa, bütün tələb olunan sahələri doldurun.'});
            setIsLoading(false); // Yüklənməni dayandırır
            return; // Funksiyanı dayandırır
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setSubmitStatus({status: 'error', message: 'Zəhmət olmasa, düzgün e-poçt ünvanı daxil edin.'});
            setIsLoading(false);
            return;
        }
        // --- Validasiya sonu ---

        try {
            // API endpointinə fetch ilə sorğu göndəririk
            const response = await HttpClient.post("/contact", formData)

            if (response.ok) {
                // Uğurlu cavab halında
                setSubmitStatus({status: 'success', message: 'Mesajınız uğurla göndərildi!'});
                // Formu təmizləyirik
                setFormData({name: '', email: '', subject: '', phone: '', message: ''});
            } else {
                // Xəta halında cavabdan mesajı almağa çalışırıq
                let errorMessage = 'Mesaj göndərilərkən xəta baş verdi.';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch (e) { /* Cavabı parse etmək mümkün olmadıqda */
                }
                console.error("Client Side Submit: API Error Status:", response.status, errorMessage);
                setSubmitStatus({status: 'error', message: errorMessage});
            }
        } catch (error) {
            // Şəbəkə və ya fetch xətası halında
            console.error("Client Side Submit: Network/Fetch Error:", error);
            setSubmitStatus({status: 'error', message: 'Şəbəkə xətası baş verdi. Zəhmət olmasa, yenidən cəhd edin.'});
        } finally {
            // İstər uğurlu, istər xəta olsun, sonda yüklənməni dayandırırıq
            setIsLoading(false);
        }
    };

    return (
        // Form action olaraq birbaşa handleSubmit funksiyasını istifadə edir
        // ref artıq lazım deyil
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* Uğur/Xəta Mesajlarının Göstərilməsi */}
            {submitStatus.message && ( // submitStatus.message varsa, bu bloku göstər
                <div
                    className={`p-4 rounded-md border flex items-center gap-3 text-sm transition-opacity duration-300 ${
                        submitStatus.status === 'success' // submitStatus.status-a görə stil seçimi
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-red-50 border-red-200 text-red-800'
                    }`}
                    role={submitStatus.status === 'error' ? 'alert' : 'status'}
                >
                    {submitStatus.status === 'success' ? ( // submitStatus.status-a görə ikon seçimi
                        <CheckCircle className="h-5 w-5 flex-shrink-0"/>
                    ) : (
                        <AlertCircle className="h-5 w-5 flex-shrink-0"/>
                    )}
                    {/* submitStatus.message-dən gələn mesaj mətni */}
                    <span>{submitStatus.message}</span>
                </div>
            )}

            {/* Form Sahələri */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Adınız
                        Soyadınız <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Adınızı və soyadınızı daxil edin"
                        required
                        value={formData.name} // State-ə bağlanır
                        onChange={handleChange} // Dəyişiklikləri state-ə yazır
                        className="block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition duration-150 ease-in-out"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-poçt Ünvanı <span
                        className="text-red-500">*</span></label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email@nümunə.com"
                        required
                        value={formData.email} // State-ə bağlanır
                        onChange={handleChange} // Dəyişiklikləri state-ə yazır
                        className="block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition duration-150 ease-in-out"
                    />
                </div>
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Mövzu <span
                        className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="subject"
                        id="subject"
                        placeholder="Mesajınızın mövzusu"
                        required
                        value={formData.subject} // State-ə bağlanır
                        onChange={handleChange} // Dəyişiklikləri state-ə yazır
                        className="block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition duration-150 ease-in-out"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon
                        (Könüllü)</label>
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder="+994 XX XXX XX XX"
                        value={formData.phone} // State-ə bağlanır
                        onChange={handleChange} // Dəyişiklikləri state-ə yazır
                        className="block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition duration-150 ease-in-out"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mesajınız <span
                    className="text-red-500">*</span></label>
                <textarea
                    name="message"
                    id="message"
                    rows="5"
                    placeholder="Sualınızı və ya təklifinizi bura yazın..."
                    required
                    value={formData.message} // State-ə bağlanır
                    onChange={handleChange} // Dəyişiklikləri state-ə yazır
                    className="block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition duration-150 ease-in-out resize-y"
                ></textarea>
            </div>

            <div className="pt-2 text-center md:text-left">
                {/* Submit Düyməsi */}
                <button
                    type="submit"
                    disabled={isLoading} // isLoading state-inə görə deaktiv edilir
                    // className={`
                    //   inline-flex items-center justify-center gap-2 px-8 py-3
                    //   text-base font-semibold text-white
                    //   bg-gradient-to-r from-emerald-500 to-emerald-700
                    //   rounded-lg shadow-md
                    //   transition-all duration-200 ease-in-out
                    //   hover:shadow-lg hover:from-emerald-600 hover:to-emerald-700
                    //   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500
                    //   disabled:opacity-60 disabled:cursor-not-allowed
                    //   transform hover:-translate-y-0.5
                    // `}

                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition-all duration-150 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0"

                >
                    {isLoading ? ( // isLoading state-inə görə məzmun dəyişir
                        <>
                            <Loader2 className="h-5 w-5 animate-spin"/>
                            Göndərilir...
                        </>
                    ) : (
                        <>
                            <Send className="h-5 w-5"/>
                            Mesajı Göndər
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
