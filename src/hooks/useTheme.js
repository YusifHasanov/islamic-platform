"use client"

import { useState, useEffect, useCallback } from "react"

const useTheme = () => {
  // Initialize state with a default value, useEffect will correct it
  const [theme, setThemeState] = useState('system');

  // Function to apply theme to the document and potentially save preference
  const applyTheme = useCallback((chosenTheme) => {
    let effectiveTheme = chosenTheme;
    if (chosenTheme === 'system') {
      localStorage.removeItem("color-theme");
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
    } else {
      localStorage.setItem("color-theme", chosenTheme);
      effectiveTheme = chosenTheme;
    }

    // Apply the class to the document element
    if (effectiveTheme === 'dark') {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
     // Update the state
     // Important: We update the state based on the *chosen* theme (light/dark/system),
     // not the *effective* theme (light/dark), so the UI reflects the user's choice.
    setThemeState(chosenTheme);

  }, []);

  // Effect to set initial theme and listen for system changes
  useEffect(() => {
    const storedTheme = localStorage.getItem("color-theme");
    const initialTheme = storedTheme ? storedTheme : 'system';
    applyTheme(initialTheme); // Apply the initial theme and update state

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Handler for system theme changes
    const handleSystemChange = (e) => {
      // Only apply system change if the current setting is 'system'
      if (localStorage.getItem("color-theme") === null) {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);

    // Cleanup listener on component unmount
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [applyTheme]); // Depend on applyTheme

  // Return the current theme state and the function to change it
  // Note: the returned 'setTheme' function is actually our 'applyTheme'
  return [theme, applyTheme];
}

export default useTheme

