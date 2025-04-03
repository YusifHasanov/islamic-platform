// components/videos/ModernSearchComponent.jsx (or wherever you place it)
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react"; // Import icons

const ModernSearchComponent = ({ initialSearchValue }) => {
    // Use initialSearchValue to sync with URL on load
    const [searchValue, setSearchValue] = useState(initialSearchValue ?? "");
    const router = useRouter();
    const searchParams = useSearchParams();

    // Update state if initialSearchValue changes (e.g., browser back/forward)
    useEffect(() => {
        setSearchValue(initialSearchValue ?? "");
    }, [initialSearchValue]);

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const clearSearch = (updateUrl = true) => {
        setSearchValue("");
        if (updateUrl) {
            const currentParams = new URLSearchParams(searchParams);
            currentParams.delete("search");
            // Also reset page number if pagination exists
            currentParams.delete("page"); // Assuming page param is 'page'
            const path = `?${currentParams.toString()}`;
            router.push(path, { scroll: false });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedSearch = searchValue.trim();
        const currentParams = new URLSearchParams(searchParams);

        if (trimmedSearch) {
            currentParams.set("search", trimmedSearch);
        } else {
            // If submitting an empty search, remove the parameter
            currentParams.delete("search");
        }
        // Reset page number on new search
        currentParams.delete("page"); // Assuming page param is 'page'

        const path = `?${currentParams.toString()}`;
        router.push(path, { scroll: false });
    };

    return (
        // Using relative positioning for icons within the input
        <form onSubmit={handleSubmit} className="relative w-full md:w-72 lg:w-80"> {/* Control width */}
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
                // Use type="search" for potential browser benefits (like clear button on some)
                name="search"
                id="videos-search"
                value={searchValue}
                onChange={handleInputChange}
                placeholder="Axtarış..." // Simple placeholder
                // Modern styling: padding for icons, border, focus states
                className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-10 text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm sm:leading-6 shadow-sm"
            />
            {/* Clear button - only shows when there is text */}
            {searchValue && (
                <button
                    type="button"
                    onClick={() => clearSearch(true)} // Pass true to update URL immediately
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    aria-label="Axtarışı təmizlə"
                >
                    <X className="h-5 w-5" aria-hidden="true" />
                </button>
            )}
        </form>
    );
};

export default ModernSearchComponent;
