"use client";

import React, { useState } from 'react';
import { HeartHandshake } from 'lucide-react'; // Example icon
import SupportModal from './SupportModal';
import {bankData} from "@/util/Const"; // Import the modal

// Assume bankData is fetched or passed as a prop here


const SupportButton = () => { // Accept bankData as prop, provide default/example
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            {/* The Trigger Button */}
            <button
                onClick={openModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition-all duration-150 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0"
            >
                <HeartHandshake size={18} /> {/* Example icon */}
                <span className="text-sm font-medium">Dəstək Ol</span>
            </button>

            {/* The Modal (conditionally rendered) */}
            <SupportModal
                isOpen={isModalOpen}
                onClose={closeModal}
                bankData={bankData}
            />
        </>
    );
};

export default SupportButton;
