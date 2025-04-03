export const formatDate = (dateString) => {
    if (!dateString) return "Tarix bilinmir";
    try {
        const date = new Date(dateString);
        // Use Intl.DateTimeFormat for robust, localized date formatting
        return new Intl.DateTimeFormat("az-AZ", { // Use Azerbaijani locale
            day: "2-digit",  // 23 (adds leading zero if needed)
            month: "2-digit", // 03 (adds leading zero if needed)
            year: "numeric", // 2025
        }).format(date); // Output will be like 23.03.2025 based on az-AZ locale default separator
        // If you strictly want slashes:
        // return new Intl.DateTimeFormat("en-GB", { // Use a locale that defaults to slashes or format manually
        //   day: "2-digit", month: "2-digit", year: "numeric",
        // }).format(date);
        // Or format manually:
        // const day = String(date.getDate()).padStart(2, '0');
        // const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        // const year = date.getFullYear();
        // return `${day}/${month}/${year}`;

    } catch (error) {
        console.error("Error formatting date:", error);
        // Fallback to manual formatting if Intl fails
        try {
            const d = new Date(dateString);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                return `${day}/${month}/${year}`;
            }
        } catch {}
        return dateString; // Ultimate fallback
    }
};
