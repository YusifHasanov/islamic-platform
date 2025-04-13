"use client"
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown,
    ChevronUp,
    ListFilter,
    X,
    RotateCcw,
} from "lucide-react";

/**
 * ReusableFilterSidebar - A component that provides filter functionality for both desktop and mobile
 *
 * @param {Object} props
 * @param {boolean} props.isMobile - Whether component is in mobile mode
 * @param {boolean} props.isVisible - For mobile mode, controls visibility of the sidebar
 * @param {Function} props.onCloseMobile - Function to call when closing the mobile sidebar
 * @param {Array} props.filterSections - Array of filter sections to display
 * @param {boolean} props.hasActiveFilters - Whether any filters are currently active
 * @param {Function} props.onClearAllFilters - Function to clear all filter selections
 * @param {string} props.className - Additional class names
 */
const ReusableFilterSidebar = ({
                                   isMobile = false,
                                   isVisible = true,
                                   onCloseMobile = () => {},
                                   filterSections = [],
                                   hasActiveFilters = false,
                                   onClearAllFilters = () => {},
                                   className = "",
                               }) => {
    const sidebarRef = useRef(null);

    // Handle click outside for mobile view
    useEffect(() => {
        if (!isMobile) return;

        const handleClickOutside = (event) => {
            const triggerButton = document.getElementById('mobile-filter-trigger');
            if (sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                (!triggerButton || !triggerButton.contains(event.target))) {
                onCloseMobile();
            }
        };

        if (isVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMobile, isVisible, onCloseMobile]);

    // If it's desktop and not visible, don't render anything
    if (!isMobile && !isVisible) return null;

    // Content of the sidebar
    const sidebarContent = (
        <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-200 flex-shrink-0">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <ListFilter className="h-5 w-5 text-emerald-600" />
                    Filtrlər
                </h3>
                <AnimatePresence>
                    {hasActiveFilters && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            onClick={onClearAllFilters}
                            className="text-xs font-medium text-emerald-600 hover:text-emerald-800 flex items-center gap-1 p-1 -m-1 rounded hover:bg-emerald-50 transition-colors"
                            aria-label="Bütün filtrləri sıfırla"
                        >
                            <RotateCcw size={14} /> Sıfırla
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            {/* Filter Sections Container */}
            <div className="flex-grow overflow-y-auto space-y-5 pr-1 custom-scrollbar -mr-1">
                {filterSections.map((section, index) => (
                    <FilterSection
                        key={index}
                        title={section.title}
                        icon={section.icon}
                        badgeCount={section.badgeCount}
                        badgeColor={section.badgeColor || "emerald"}
                        content={section.content}
                    />
                ))}
            </div>
        </div>
    );

    // For mobile view, we wrap in a modal & slide in animation
    if (isMobile) {
        return (
            <AnimatePresence>
                {isVisible && (
                    <>
                        {/* Backdrop overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                            onClick={onCloseMobile}
                        />

                        {/* Sidebar panel */}
                        <motion.div
                            ref={sidebarRef}
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                            className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-xl z-50 overflow-y-auto flex flex-col ${className}`}
                        >
                            <div className="p-5 flex-grow">
                                {sidebarContent}
                            </div>
                            <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-between">
                                <button
                                    onClick={onCloseMobile}
                                    className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-medium transition-colors"
                                >
                                    Bağla
                                </button>
                                <button
                                    onClick={onCloseMobile}
                                    className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm font-medium transition-colors"
                                >
                                    Göstər
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        );
    }

    // Desktop sidebar
    return (
        <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 ${className}`}>
            {sidebarContent}
        </div>
    );
};

/**
 * FilterSection - An expandable/collapsible filter section
 */
const FilterSection = ({
                           title,
                           icon,
                           badgeCount = 0,
                           badgeColor = "emerald",
                           content
                       }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const badgeColorClasses = {
        emerald: "bg-emerald-100 text-emerald-700",
        blue: "bg-blue-100 text-blue-700",
        amber: "bg-amber-100 text-amber-700",
        red: "bg-red-100 text-red-700",
        purple: "bg-purple-100 text-purple-700",
        gray: "bg-gray-100 text-gray-700",
    };

    const badgeClass = badgeColorClasses[badgeColor] || badgeColorClasses.emerald;

    return (
        <div>
            {/* Section Header Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full mb-2 text-left group p-1 -m-1 rounded hover:bg-gray-100 transition-colors"
                aria-expanded={isExpanded}
                aria-controls={`filter-section-${title.replace(/\s+/g, '-').toLowerCase()}`}
            >
                <div className="flex items-center gap-2">
                    {icon}
                    <h4 className="text-sm font-semibold text-gray-800 group-hover:text-emerald-600">
                        {title}
                    </h4>
                    {badgeCount > 0 && (
                        <span className={`inline-block ${badgeClass} text-xs font-semibold px-1.5 py-0.5 rounded-full ml-auto`}>
              {badgeCount}
            </span>
                    )}
                </div>
                {isExpanded ? (
                    <ChevronUp
                        size={18}
                        className="text-gray-400 group-hover:text-emerald-600 transition-transform duration-200"
                    />
                ) : (
                    <ChevronDown
                        size={18}
                        className="text-gray-400 group-hover:text-emerald-600 transition-transform duration-200"
                    />
                )}
            </button>

            {/* Section Content */}
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        id={`filter-section-${title.replace(/\s+/g, '-').toLowerCase()}`}
                        key={`filter-section-${title}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        {content}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Mobile filter trigger button component for convenience
export const MobileFilterTrigger = ({
                                        onClick,
                                        badgeCount = 0,
                                        label = "Filtrlər"
                                    }) => {
    return (
        <button
            id="mobile-filter-trigger"
            onClick={onClick}
            className="flex lg:hidden items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 w-full md:w-auto shadow-sm relative"
            aria-haspopup="true"
        >
            <ListFilter className="h-5 w-5" />
            <span>{label}</span>
            {badgeCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-emerald-600 rounded-full">
          {badgeCount}
        </span>
            )}
        </button>
    );
};

// ActiveFilters component to display the active filters above content
export const ActiveFilters = ({
                                  filters = [],
                                  onClearAll,
                              }) => {
    if (filters.length === 0) return null;

    return (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-gray-700 mr-2">Aktiv filtrlər:</span>

                {filters.map((filter, index) => (
                    <span
                        key={index}
                        className={`inline-flex items-center gap-1.5 pl-2.5 pr-1 py-0.5 rounded-full text-xs font-medium ${filter.bgClass} ${filter.textClass}`}
                    >
            {filter.icon && <span className="mr-1">{filter.icon}</span>}
                        {filter.label}
                        {filter.onRemove && (
                            <button
                                onClick={() => filter.onRemove(filter.value)}
                                className={`${filter.closeButtonClass} flex-shrink-0 ml-1`}
                                aria-label={`${filter.label} filtrini sil`}
                            >
                                <X size={14} />
                            </button>
                        )}
          </span>
                ))}

                <button
                    onClick={onClearAll}
                    className="ml-auto text-xs font-medium text-gray-500 hover:text-red-600 underline flex-shrink-0 self-center"
                >
                    Hamısını təmizlə
                </button>
            </div>
        </div>
    );
};

export default ReusableFilterSidebar;
