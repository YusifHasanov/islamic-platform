"use client"; // Keep if needed

import { Phone, HeartHandshake } from "lucide-react";
import SupportButton from "@/components/common/SupportButton";
import {phones} from "@/util/Const"; // Import icons

// Assume bankData and phones are passed as props or defined/fetched here




// Replace with your actual component name
const ContactAndSupportSidebar = () => {

    return (
        // Sidebar Container: Slightly refined styling
        <div className="lg:col-span-1 space-y-10 bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-100/80">

            {/* Telefon Bölməsi - Modernized */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-5 border-b border-gray-200 pb-3 flex items-center gap-2.5">
                    <Phone className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    Əlaqə Vasitəsi
                </h2>
                <div className="space-y-2.5"> {/* Spacing between phone numbers */}
                    {phones.map((phone, index) => (
                        <a
                            key={index}
                            href={`tel:${phone.replace(/\s/g, '')}`}
                            className="group flex items-center gap-2 p-2 rounded-md transition-colors duration-150 ease-in-out hover:bg-emerald-50/70"
                            aria-label={`Telefon nömrəsi: ${phone}`}
                        >
                            {/* Optional: Repeat phone icon for each line? Or use a different subtle icon */}
                            {/* <Phone size={16} className="text-gray-400 group-hover:text-emerald-600 flex-shrink-0"/> */}
                            <span className="text-sm font-medium text-gray-700 group-hover:text-emerald-700 tracking-wide">
                                {phone}
                            </span>
                            {/* Optional: Add a subtle indicator that it's clickable */}
                            {/* <ExternalLink size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto"/> */}
                        </a>
                    ))}
                </div>
                {/* Optional: Add note about availability times if applicable */}
                {/* <p className="text-xs text-gray-500 mt-3 italic">
                    Zənglər üçün iş saatları: 09:00 - 18:00
                 </p> */}
            </div>

            {/* Dəstək Olun Bölməsi - Integrated with Modal Button */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-5 border-b border-gray-200 pb-3 flex items-center gap-2.5">
                    <HeartHandshake size={20} className="text-emerald-600 flex-shrink-0" /> {/* Using appropriate icon */}
                    Dəstək Olun
                </h2>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed"> {/* Slightly more line height */}
                    Mədrəsəmizin fəaliyyətinə və İslam elmlərinin yayılmasına dəstək olmaq üçün bank hesablarımızdan istifadə edə bilərsiniz.
                    Allah etdiyiniz yardımları qəbul etsin!
                </p>
                {/* --- Integration Point --- */}
                {/* Render the SupportButton component, passing the bank data */}
                <SupportButton />
                {/* The previous mapping logic is now handled *inside* the SupportModal triggered by SupportButton */}
                {/*
                    <div className="space-y-3">
                        {bankData.map((bank, index) => (
                            <BankCardCopy key={index} bank={bank}/> // Removed
                        ))}
                    </div>
                 */}
            </div>
        </div>
    );
}

export default ContactAndSupportSidebar; // Export with your component name
