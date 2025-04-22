"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Sun, Moon, Laptop } from 'lucide-react'
import AdminNavbar from "./AdminNavbar"
import AdminSidebarNav from "./AdminSidebarNav"
import useTheme from "@/hooks/useTheme"

const sidebarItems = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: (
      <svg
        className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M2 10a8 8 0 1 1 16 0A8 8 0 0 1 2 10Zm8-3a1 1 0 0 0 0 2 1 1 0 0 1 1 1v3a1 1 0 0 0 2 0v-3a3 3 0 0 0-3-3Zm0 9a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
      </svg>
    ),
  },
  {
    href: "/admin/articles",
    label: "Məqalələr",
    icon: (
      <svg
        className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 21"
      >
        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
      </svg>
    ),
  },
  {
    href: "/admin/categories",
    label: "Kateqoriyalar",
    icon: (
      <svg
        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 18 20"
      >
        <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
      </svg>
    ),
  },
  {
    href: "/admin/authors",
    label: "Müəlliflər",
    icon: (
      <svg
        className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 18"
      >
        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
      </svg>
    ),
  },
  {
    href: "/admin/tags",
    label: "Taglər",
    icon: (
      <svg
        className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 2a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8Zm0 14a6 6 0 1 1 6-6 6.007 6.007 0 0 1-6 6Z" />
        <path d="M11 10h2a1 1 0 0 0 0-2h-2V7a1 1 0 0 0-2 0v1H7a1 1 0 0 0 0 2h2v1a1 1 0 0 0 2 0v-1Z" />
      </svg>
    ),
  },
  {
    href: "/admin/books",
    label: "Kitablar",
    icon: (
      <svg
        className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M11 1a1 1 0 0 0-2 0v2.058A7.962 7.962 0 0 0 6.343 4.93L4.929 3.515a1 1 0 0 0-1.414 1.414L4.93 6.343A7.963 7.963 0 0 0 3.058 9H1a1 1 0 0 0 0 2h2.058a7.964 7.964 0 0 0 1.872 2.657L3.515 15.07a1 1 0 1 0 1.414 1.414l1.414-1.414A7.962 7.962 0 0 0 9 16.942V19a1 1 0 0 0 2 0v-2.058a7.964 7.964 0 0 0 2.657-1.872l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414A7.963 7.963 0 0 0 16.942 11H19a1 1 0 0 0 0-2h-2.058a7.962 7.962 0 0 0-1.872-2.657L15.07 4.93a1 1 0 1 0-1.414-1.414L12.242 4.93A7.962 7.962 0 0 0 11 3.058V1Zm-1 14a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5Z" />
      </svg>
    ),
  },
  {
    href: "/admin/questions",
    label: "Suallar",
    icon: (
      <svg
        className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 32 32"
      >
        <path d="M16 3C9.925 3 5 7.925 5 14c0 4.88 3.468 8.14 5.906 10.281.5.441.938.938 1.313 1.5.375.563.813 1.219 1.188 1.938.188.313.313.563.375.719.063.188.125.375.125.563 0 .75-.5 1.406-1.188 1.813-.688.438-1.5.688-2.438.688-1.5 0-2.813-.563-3.813-1.688S5 25.563 5 24c0-1.125.375-2.125 1.063-3.063S7.563 19.5 8.5 18.75c1.563-1.25 3.438-2.938 3.438-5.75 0-2.25-1.5-4-4-4-2.5 0-4 1.75-4 4 0 .75-.563 1.438-1.313 1.5-.063 0-.125 0-.188 0-1 0-1.813-.75-2-1.75C.25 11.813 4.25 6 10 6c6.075 0 10 4.925 10 11 0 4.88-3.468 8.14-5.906 10.281-.5.441-.938.938-1.313 1.5-.375.563-.813 1.219-1.188 1.938-.188.313-.313.563-.375.719-.063.188-.125.375-.125.563 0 .75.5 1.406 1.188 1.813.688.438 1.5.688 2.438.688 1.5 0 2.813-.563 3.813-1.688S21 25.563 21 24c0-1.125-.375-2.125-1.063-3.063s-1.5-.938-2.438-1.688c-1.563-1.25-3.438-2.938-3.438-5.75 0-2.25 1.5-4 4-4 2.5 0 4 1.75 4 4 0 .75.563 1.438 1.313 1.5.063 0 .125 0 .188 0 1 0 1.813-.75 2-1.75C25.75 11.813 21.75 6 16 6c-6.075 0-11 4.925-11 11 0 1.125.375 2.125 1.063 3.063S7.563 21.5 8.5 22.25c1.563 1.25 3.438 2.938 3.438 5.75 0 1 .438 1.813 1.188 2.438.75.625 1.688.938 2.813.938 1.375 0 2.563-.5 3.563-1.5S21 27.625 21 26.5c0-.563-.125-1.063-.313-1.563-.188-.5-.438-.938-.75-1.313-.313-.375-.625-.688-.938-.938-1.375-1.063-2.563-2.25-3.563-3.563C14.813 18.5 14 17.125 14 15.5c0-1.375.813-2.563 2.438-3.563S19.563 10.75 21 10c1.125-.625 2.125-1.375 3.063-2.313S25.5 6.063 26.25 5.5c1.25-1 1.875-2.375 1.875-4.125C28.125.563 27.563 0 26.813 0 26.125 0 25.5.188 24.938.563c-.563.375-1.125.813-1.688 1.313-.563.5-.938.875-1.125 1.125s-.375.5-.563.75c-1.125 1.375-2.438 2.625-4 3.75-1.563 1.125-3.188 1.875-5 2.25-.563.125-1.063.188-1.563.188z"/>
      </svg>
    ),
  },
  {
    href: "/admin/asked-questions",
    label: "Sorusulan Suallar",
    icon: (
      <svg
        className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 32 32"
      >
        <path d="M16 3C9.925 3 5 7.925 5 14c0 4.88 3.468 8.14 5.906 10.281.5.441.938.938 1.313 1.5.375.563.813 1.219 1.188 1.938.188.313.313.563.375.719.063.188.125.375.125.563 0 .75-.5 1.406-1.188 1.813-.688.438-1.5.688-2.438.688-1.5 0-2.813-.563-3.813-1.688S5 25.563 5 24c0-1.125.375-2.125 1.063-3.063S7.563 19.5 8.5 18.75c1.563-1.25 3.438-2.938 3.438-5.75 0-2.25-1.5-4-4-4-2.5 0-4 1.75-4 4 0 .75-.563 1.438-1.313 1.5-.063 0-.125 0-.188 0-1 0-1.813-.75-2-1.75C.25 11.813 4.25 6 10 6c6.075 0 10 4.925 10 11 0 4.88-3.468 8.14-5.906 10.281-.5.441-.938.938-1.313 1.5-.375.563-.813 1.219-1.188 1.938-.188.313-.313.563-.375.719-.063.188-.125.375-.125.563 0 .75.5 1.406 1.188 1.813.688.438 1.5.688 2.438.688 1.5 0 2.813-.563 3.813-1.688S21 25.563 21 24c0-1.125-.375-2.125-1.063-3.063s-1.5-.938-2.438-1.688c-1.563-1.25-3.438-2.938-3.438-5.75 0-2.25 1.5-4 4-4 2.5 0 4 1.75 4 4 0 .75.563 1.438 1.313 1.5.063 0 .125 0 .188 0 1 0 1.813-.75 2-1.75C25.75 11.813 21.75 6 16 6c-6.075 0-11 4.925-11 11 0 1.125.375 2.125 1.063 3.063S7.563 21.5 8.5 22.25c1.563 1.25 3.438 2.938 3.438 5.75 0 1 .438 1.813 1.188 2.438.75.625 1.688.938 2.813.938 1.375 0 2.563-.5 3.563-1.5S21 27.625 21 26.5c0-.563-.125-1.063-.313-1.563-.188-.5-.438-.938-.75-1.313-.313-.375-.625-.688-.938-.938-1.375-1.063-2.563-2.25-3.563-3.563C14.813 18.5 14 17.125 14 15.5c0-1.375.813-2.563 2.438-3.563S19.563 10.75 21 10c1.125-.625 2.125-1.375 3.063-2.313S25.5 6.063 26.25 5.5c1.25-1 1.875-2.375 1.875-4.125C28.125.563 27.563 0 26.813 0 26.125 0 25.5.188 24.938.563c-.563.375-1.125.813-1.688 1.313-.563.5-.938.875-1.125 1.125s-.375.5-.563.75c-1.125 1.375-2.438 2.625-4 3.75-1.563 1.125-3.188 1.875-5 2.25-.563.125-1.063.188-1.563.188z"/>
      </svg>
    ),
  },
]

// This component now acts as the main layout wrapper for the admin area
function AdminLayoutWrapper({ children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [theme, setTheme] = useTheme();
  const router = useRouter();

  const handleMobileSidebarToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleSidebarLinkClick = () => {
     setIsMobileSidebarOpen(false); // Close mobile sidebar when a link is clicked
  }

  const handleLogout = () => {
    console.log("Logout action triggered");
    localStorage.removeItem('isAdminLoggedIn');
    router.push('/admin/login');
  };

  // Revalidation logic remains unchanged for now
  const [revalidateDisabled, setRevalidateDisabled] = useState(false)
  const revalidate = () => {
    setRevalidateDisabled(true)
    const secret = process.env.NEXT_PUBLIC_REVALIDATE_SECRET
    const paths = ["/articles", "/videos", "/", "/videos/**", "/articles/**"]
    Promise.all(
      paths.map((path) =>
        fetch(`/api/revalidate?path=${encodeURIComponent(path)}&secret=${secret}`)
          .then(() => console.log(`Revalidated ${path} successfully.`))
          .catch((err) => console.error(`Failed to revalidate ${path}.`, err)),
      ),
    )
      .then(() => console.log("All revalidation calls finished."))
      .catch((err) => console.error("Some revalidation calls failed.", err))
      .finally(() => setRevalidateDisabled(false))
  }

  return (
    <>
      <AdminNavbar
        theme={theme}
        onThemeChange={setTheme}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onMobileSidebarToggle={handleMobileSidebarToggle}
        onLogout={handleLogout}
      />

      <AdminSidebarNav
          isMobileSidebarOpen={isMobileSidebarOpen}
          onLinkClick={handleSidebarLinkClick}
      />

      <main className="p-4 sm:ml-64 mt-16">
        {children}
      </main>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-900/50 dark:bg-gray-900/80 sm:hidden"
          onClick={handleMobileSidebarToggle}
        ></div>
      )}
    </>
  )
}

export default AdminLayoutWrapper;

