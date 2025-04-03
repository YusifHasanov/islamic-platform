// app/contact/page.jsx
import React from 'react';
import Image from 'next/image';
import {Phone, Heart} from 'lucide-react'; // Mail və MapPin silindi, Heart əlavə edildi

// Yeni BankCardCopy komponentini import edirik
import BankCardCopy from '@/components/contact/BankCardCopy';
// Client Form komponentini import edirik
import ContactForm from "@/components/contact/ContactForm";
import {bankData, phones} from "@/util/Const";

// --- Səhifə Komponenti (Server Component) ---
export default function ContactPage() {

    // Dəstək üçün bank kartı məlumatları (burada və ya .env faylında saxlayın);

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Başlıq Bölməsi (dəyişiklik yoxdur) */}
            <div className="relative w-full h-[350px] md:h-[400px]">
                <Image
                    src="https://images.unsplash.com/photo-1713013727106-bfa2a9bdddc1?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Əlaqə Fon Şəkli"
                    layout="fill"
                    objectFit="cover"
                    quality={80}
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"/>
                <div className="absolute inset-0 flex items-end pb-16 md:pb-24">
                    <div className="container mx-auto px-4 md:px-8 lg:px-16 text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-md">Əlaqə</h1>
                        <p className="text-lg md:text-xl max-w-3xl text-gray-200 drop-shadow-sm">
                            Suallarınız, təklifləriniz və ya əməkdaşlıq üçün bizimlə əlaqə saxlayın. Komandamız sizə
                            yardım etməyə hazırdır.
                        </p>
                    </div>
                </div>
            </div>

            {/* Məzmun Bölməsi */}
            <div className="container mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start ">

                    {/* --- DƏYİŞDİRİLMİŞ SOL SÜTUN --- */}
                    <div className="lg:col-span-1 space-y-8  bg-white p-8 rounded-lg shadow-md border border-gray-100">

                        {/* Telefon Bölməsi */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b pb-3">Əlaqə Vasitəsi</h2>
                            <div className="flex items-start gap-4">
                                <Phone className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0"/>
                                <div>
                                    <h3 className="font-medium text-gray-800">Telefon</h3>
                                    {/* Real telefon nömrəniz ilə əvəz edin */}
                                    <div className="flex flex-col items-start">
                                        {
                                            phones.map((phone, index) => (
                                                <a key={index} href={`tel:${phone.replace(/\s/g, '')}`}
                                                   className="text-gray-600 hover:text-emerald-700">
                                                    {phone}
                                                </a>
                                            ))
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Dəstək Olun Bölməsi */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b pb-3 flex items-center gap-2">
                                Dəstək Olun
                            </h2>
                            <p className="text-sm text-gray-600 mb-5">
                                Fəaliyyətimizə dəstək olmaq üçün aşağıdakı bank hesablarından istifadə edə bilərsiniz.
                                Allah razı olsun!
                            </p>
                            <div className="space-y-3">
                                {bankData.map((bank, index) => (
                                    <BankCardCopy key={index} bank={bank}/>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* --- SOL SÜTUN SONU --- */}


                    {/* Əlaqə Forması Bölməsi (dəyişiklik yoxdur) */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md border border-gray-100">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b pb-3">Mesaj Göndərin</h2>
                        <ContactForm/>
                    </div>
                </div>
            </div>
        </div>
    );
}
