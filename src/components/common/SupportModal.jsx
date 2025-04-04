"use client";

import React, { Fragment } from 'react'; // Import Fragment for Transition
import { Dialog, Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion'; // Keep for panel animation if desired
import { X } from 'lucide-react';
import ModalBankCardItem from './ModalBankCardItem';

const SupportModal = ({ isOpen, onClose, bankData = [] }) => {

    // Headless UI's Dialog handles Escape key and outside click closing automatically
    // by calling the function passed to its `onClose` prop.
    // So, the manual useEffect hooks for Escape and outside click are no longer needed.

    return (
        // Use Headless UI Transition for managing mount/unmount and overlay animation
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                {/* Overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
                </Transition.Child>

                {/* Modal Panel Container (for centering) */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        {/* Modal Panel Animation & Content */}
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="w-full max-w-lg transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all flex flex-col"
                                // No need for fixed, top, left, transform here - handled by flex centering container above
                            >
                                {/* Modal Header */}
                                <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-200 flex-shrink-0">
                                    {/* Use Dialog.Title for accessibility */}
                                    <Dialog.Title
                                        as="h2"
                                        id="support-modal-title" // Keep ID for aria-labelledby if needed elsewhere
                                        className="text-lg font-semibold leading-6 text-gray-900"
                                    >
                                        Bank Hesablarımız
                                    </Dialog.Title>
                                    <button
                                        onClick={onClose}
                                        className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-400 transition-colors"
                                        aria-label="Bağla"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Modal Body (Scrollable) */}
                                <div className="p-4 sm:px-5 sm:py-4 space-y-2 overflow-y-auto max-h-[65vh] sm:max-h-[70vh]"> {/* Adjusted padding/max-height */}
                                    {bankData.length > 0 ? (
                                        bankData.map((bank) => (
                                            <ModalBankCardItem key={bank.id || bank.cardCode} bank={bank} />
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-500 py-4">Bank məlumatı tapılmadı.</p>
                                    )}
                                </div>

                                {/* Optional Footer */}
                                {/* <div className="p-4 bg-gray-50 border-t border-gray-200 text-right flex-shrink-0">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                                        onClick={onClose}
                                    >
                                        Bağla
                                    </button>
                                </div> */}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default SupportModal;
