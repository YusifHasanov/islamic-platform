// Next, let's create a self-contained TagFilter component
"use client"
import React from "react";
import { Tag } from "lucide-react";

const TagFilter = ({
                       allTags,
                       selectedTags,
                       onTagToggle,
                       loading = false
                   }) => {
    if (loading) {
        return (
            <div className="pt-1 flex flex-wrap gap-1.5 px-1 py-1">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-6 bg-gray-100 rounded-full w-16 animate-pulse"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="pt-1">
            <div className="flex flex-wrap gap-1.5 px-1 py-1">
                {allTags.length > 0 ? (
                    allTags.map((tag) => (
                        <button
                            key={tag.id}
                            onClick={() => onTagToggle(tag)}
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                                selectedTags.some(t => t.id === tag.id)
                                    ? "bg-blue-100 text-blue-800 border-blue-300 ring-blue-300 font-medium"
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 focus:ring-blue-400"
                            }`}
                            aria-pressed={selectedTags.some(t => t.id === tag.id)}
                        >
                            {tag.name}
                        </button>
                    ))
                ) : (
                    <p className="text-xs text-gray-400 italic px-1.5 py-1">Taq yoxdur.</p>
                )}
            </div>
        </div>
    );
};

export default TagFilter;
