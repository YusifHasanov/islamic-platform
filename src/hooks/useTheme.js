import { useEffect } from 'react';

const useTheme = () => {
    useEffect(() => {
        const setTheme = () => {
            if (
                localStorage.getItem('color-theme') === 'dark' ||
                (!('color-theme' in localStorage) &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches)
            ) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        };

        setTheme();

        // Optional: Add listener to watch for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', setTheme);

        // Clean up listener on component unmount
        return () => mediaQuery.removeEventListener('change', setTheme);
    }, []);
};

export default useTheme;