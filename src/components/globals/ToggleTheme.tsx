import { useTheme } from 'next-themes'
import React, { useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa';

const ToggleTheme = () => {
    const { theme, setTheme } = useTheme()
    const [checked, setChecked] = useState(false);
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
        setChecked(prev => !prev)
    }
    return (
        <div className="relative inline-block mr-2 align-middle select-none transition duration-200 ease-in">
            <input
                type="checkbox"
                name="toggle"
                id="toggle"
                className="toggle-checkbox block w-14 h-8 rounded-full bg-white border-gray-400 dark:border-gray-800 border-4 dark:bg-gray-700 appearance-none cursor-pointer transition-colors duration-200 ease-in-out"
                checked={checked}
                onChange={toggleTheme}
            />
            <label
                htmlFor="toggle"
                className="toggle-label block overflow-hidden h-1 rounded-full bg-transparent cursor-pointer align-text-top transition-colors duration-200 ease-in-out"
            >
                <span className="sr-only">Toggle</span>
                <span
                    className={`${checked ? "translate-x-7" : "translate-x-2"} toggle-dot absolute top-2 block w-4 h-4 rounded-full bg-transparent shadow inset-y-0 left-0 transition-transform duration-200 ease-in-out`}
                >
                    {!checked ? (
                        <FaMoon className="w-4 h-4 text-yellow-500" />
                    ) : (
                        <FaSun className="w-4 h-4 text-yellow-500" />
                    )}
                </span>
            </label>
        </div>
    )
}

export default ToggleTheme