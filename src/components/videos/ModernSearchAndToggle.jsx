// components/videos/ModernSearchAndToggle.jsx (or wherever you place it)
import Link from "next/link";
import ModernSearchComponent from "./ModernSearchComponent"; // Import the revamped search component

// Component to handle toggles and search integration
const ModernSearchAndToggle = ({ playlistId, search, videoId, content }) => {

    // Function to create href for toggle links, preserving relevant params
    const createToggleHref = (newContentValue) => {
        const currentParams = new URLSearchParams(); // Start fresh to avoid stale params

        // Preserve existing relevant IDs or search terms
        if (playlistId != null) currentParams.set("playlistId", playlistId);
        if (videoId != null) currentParams.set("videoId", videoId);
        if (search != null) currentParams.set("search", search); // Preserve search term when toggling content

        // Set the new content value
        currentParams.set("content", newContentValue.trim());

        // Reset page number when toggling content type
        currentParams.delete("page"); // Assuming page param is 'page'

        return `?${currentParams.toString()}`;
    };

    // Toggle button definitions
    const toggleButtons = [
        { label: "Playlistlər", value: "playlists" },
        { label: "Videolar", value: "videos" },
        { label: "Shortlar", value: "shorts" },
    ];

    const currentContent = content || "playlists"; // Default to playlists if content is null/undefined

    return (
        // Use flex container, control spacing and alignment
        // Added bg-gray-50 and padding for visual separation, adjust if needed based on parent container
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">

            {/* Toggle Buttons Group */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2" role="group" aria-label="Content Type Toggle">
                {toggleButtons.map((btn) => {
                    const isActive = currentContent === btn.value;
                    return (
                        <Link
                            key={btn.value}
                            scroll={false} // Preserve scroll position
                            href={createToggleHref(btn.value)}
                            // Modern segmented control styling
                            className={`
                 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-emerald-500
                 ${isActive
                                ? "bg-emerald-600 text-white shadow-sm" // Active state
                                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100" // Inactive state
                            }
               `}
                            aria-pressed={isActive} // Accessibility for toggle state
                        >
                            {btn.label}
                        </Link>
                    );
                })}
            </div>

            {/* Search Component Area */}
            <div className="flex justify-center md:justify-end">
                {/* Pass the current search value from URL params */}
                <ModernSearchComponent initialSearchValue={search} />
            </div>

        </div>
    );
};

export default ModernSearchAndToggle;
