"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"

/**
 * Theme Switcher Component - Toggle between light and dark mode
 *
 * This is an optional component that can be added to the navbar
 */
export function ThemeSwitcher() {
    const [theme, setTheme] = React.useState(() => {
        // Initialize from localStorage if available, default to system preference
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme")
            if (savedTheme) return savedTheme
            return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        }
        return "light"
    })

    // Apply theme class to document element
    React.useEffect(() => {
        const root = document.documentElement

        if (theme === "dark") {
            root.classList.add("dark")
        } else {
            root.classList.remove("dark")
        }

        // Save preference to localStorage
        localStorage.setItem("theme", theme)
    }, [theme])

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-md p-2 text-white hover:bg-green-800 transition-colors"
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
            {theme === "light" ? (
                <Moon className="h-5 w-5" />
            ) : (
                <Sun className="h-5 w-5" />
            )}
        </button>
    )
}
