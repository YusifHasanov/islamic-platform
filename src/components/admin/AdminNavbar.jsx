'use client'

import { useState, useEffect, useRef } from 'react'
import Link from "next/link"
import { Sun, Moon, Laptop, LogOut, User, Settings, LayoutDashboard, RefreshCw } from 'lucide-react' // Added more icons
import HttpClient from '@/util/HttpClient';
import { Select } from "@/components/ui/select"; // optional if you prefer Radix

const AdminNavbar = ({
  theme,
  onThemeChange,
  isMobileSidebarOpen,
  onMobileSidebarToggle,
  onLogout // Add logout handler prop
}) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const themeDropdownRef = useRef(null); // Ref for theme dropdown
  const themeButtonRef = useRef(null);   // Ref for theme button
  const userDropdownRef = useRef(null);  // Ref for user dropdown
  const userButtonRef = useRef(null);    // Ref for user button
  const [isRefreshing, setIsRefreshing] = useState(false); // Refresh state for API call simulation
  const [refreshDropdownOpen, setRefreshDropdownOpen] = useState(false);
  const refreshButtonRef = useRef(null);
  const refreshDropdownRef = useRef(null);

  // Dummy user data (replace with actual data later)
  const user = { name: "Admin User", email: "admin@example.com" };

  const handleThemeButtonClick = (e) => {
      // e.stopPropagation(); // Stop propagation might not be needed with ref check
      setThemeDropdownOpen(prev => !prev); // Toggle correctly
      setUserDropdownOpen(false);
  };

  const handleUserButtonClick = (e) => {
      // e.stopPropagation();
      setUserDropdownOpen(prev => !prev); // Toggle correctly
      setThemeDropdownOpen(false);
  };

  const handleThemeSelection = (newTheme) => {
    onThemeChange(newTheme);
    setThemeDropdownOpen(false);
  };

  const handleRefreshClick = async () => {
    if (isRefreshing) return;

    console.log("API Call Triggered (Refresh Button)");
    setIsRefreshing(true);

    try {

      fetch(`${process.env.NEXT_PUBLIC_BASE_URL_YTB}/Youtube/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        alert("Successfully Updated Successfully");
        console.log(data);

      })
      .catch(error => {
        console.error("API Call Failed:", error);
      })
      .finally(() => {
        setIsRefreshing(false);
      })
      // --- --- --- --- --- --- --- --- --- ---
    } catch (error) {
      console.error("API Call Failed:", error);
      // Kullanıcıya hata mesajı gösterilebilir
    } finally {
      setIsRefreshing(false);
    }
  };

  const handlePagesRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    try {
      // replace with real endpoint
      fetch(`/api/revalidate-all?secret=${process.env.NEXT_PUBLIC_REVALIDATE_SECRET}`)
      .then(() => alert("Successfully Refreshing Pages"))
      .catch((err) => console.error("Failed to revalidate /articles page."))
    } catch (error) {
      console.error('Pages API Call Failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Corrected useEffect for handling clicks outside
  useEffect(() => {
      const handleClickOutside = (event) => {
          // Close theme dropdown if click is outside button and dropdown
          if (
              themeDropdownOpen &&
              themeButtonRef.current &&
              !themeButtonRef.current.contains(event.target) &&
              themeDropdownRef.current &&
              !themeDropdownRef.current.contains(event.target)
          ) {
              setThemeDropdownOpen(false);
          }
          // Close user dropdown if click is outside button and dropdown
          if (
              userDropdownOpen &&
              userButtonRef.current &&
              !userButtonRef.current.contains(event.target) &&
              userDropdownRef.current &&
              !userDropdownRef.current.contains(event.target)
          ) {
              setUserDropdownOpen(false);
          }
          // Close refresh dropdown if click outside
          if (
              refreshDropdownOpen &&
              refreshButtonRef.current &&
              !refreshButtonRef.current.contains(event.target) &&
              refreshDropdownRef.current &&
              !refreshDropdownRef.current.contains(event.target)
          ) {
              setRefreshDropdownOpen(false);
          }
      };

      document.addEventListener('mousedown', handleClickOutside); // Use mousedown to catch before click potentially triggers other actions
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, [themeDropdownOpen, userDropdownOpen, refreshDropdownOpen]); // Re-run if dropdown states change

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            {/* Mobile Sidebar Toggle */}
            <button
              aria-controls="logo-sidebar"
              type="button"
              onClick={onMobileSidebarToggle}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              {isMobileSidebarOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" /></svg>
              )}
            </button>
            {/* Logo and Title */}
            <Link href="/admin" className="flex ms-2 md:me-24 items-center">
              <img src="/esm_logo.png" className="h-8 me-3" alt="Esm Logo" />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Admin Panel
              </span>
            </Link>
          </div>

          {/* Right Side Icons: Refresh Button, Theme Switcher + User Menu */}
          <div className="flex items-center space-x-3">
            {/* Refresh Dropdown */}
            <div className="relative">
              <button
                ref={refreshButtonRef}
                type="button"
                onClick={() => {
                  setRefreshDropdownOpen(open => !open);
                  setUserDropdownOpen(false);
                  setThemeDropdownOpen(false);
                }}
                disabled={isRefreshing}
                className={`p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 ${isRefreshing ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                <span className="sr-only">Refresh Options</span>
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
              {refreshDropdownOpen && (
                <div
                  ref={refreshDropdownRef}
                  className="absolute top-full right-0 z-50 mt-2 w-40 bg-white rounded-lg shadow dark:bg-gray-700"
                >
                  <ul>
                    <li>
                      <button
                        onClick={() => { handleRefreshClick(); setRefreshDropdownOpen(false); }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >Videos</button>
                    </li>
                    <li>
                      <button
                        onClick={() => { handlePagesRefresh(); setRefreshDropdownOpen(false); }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >Pages</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Theme Switcher Dropdown */}
            <div className="relative">
              {/* Add ref to the button */}
              <button
                ref={themeButtonRef}
                type="button"
                onClick={handleThemeButtonClick}
                className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
              >
                <span className="sr-only">Change theme</span>
                {theme === 'light' && <Sun className="w-5 h-5" />}
                {theme === 'dark' && <Moon className="w-5 h-5" />}
                {theme === 'system' && <Laptop className="w-5 h-5" />}
              </button>
              {themeDropdownOpen && (
                // Add ref to the dropdown div
                <div
                   ref={themeDropdownRef}
                   // onClick={(e) => e.stopPropagation()} // Stop propagation might not be needed anymore
                   className="absolute top-full right-0 z-50 my-2 w-36 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul className="py-2" role="menu">
                    <li>
                      <button
                        onClick={() => handleThemeSelection('light')}
                        className={`flex items-center w-full px-4 py-2 text-sm ${theme === 'light' ? 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200'} hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white`}
                        role="menuitem"
                      >
                        <Sun className="w-4 h-4 me-2" /> Light
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleThemeSelection('dark')}
                        className={`flex items-center w-full px-4 py-2 text-sm ${theme === 'dark' ? 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200'} hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white`}
                        role="menuitem"
                      >
                        <Moon className="w-4 h-4 me-2" /> Dark
                      </button>
                    </li>
                     <li>
                      <button
                        onClick={() => handleThemeSelection('system')}
                        className={`flex items-center w-full px-4 py-2 text-sm ${theme === 'system' ? 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200'} hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white`}
                        role="menuitem"
                      >
                        <Laptop className="w-4 h-4 me-2" /> System
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* User Menu Dropdown */}
            <div className="relative flex items-center">
               {/* Add ref to the button */}
              <button
                ref={userButtonRef}
                type="button"
                onClick={handleUserButtonClick}
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open user menu</span>
                {/* Replace with actual user avatar if available */}
                <User className="w-8 h-8 rounded-full text-white p-1" />
                {/* <img
                  className="w-8 h-8 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="user photo"
                /> */}
              </button>
              {userDropdownOpen && (
                // Add ref to the dropdown div
                <div
                  ref={userDropdownRef}
                  // onClick={(e) => e.stopPropagation()}
                  className="absolute top-full right-0 z-50 my-2 min-w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">{user.name}</span>
                    <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{user.email}</span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <Link href="/admin" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                         <LayoutDashboard className="w-4 h-4 me-2"/> Dashboard
                      </Link>
                    </li>
                     <li>
                      <Link href="/admin/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                         <Settings className="w-4 h-4 me-2"/> Settings
                      </Link>
                    </li>
                    {/* Add other user menu items here */}
                  </ul>
                  <div className="py-1">
                    <button
                      onClick={onLogout} // Call the passed logout handler
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      <LogOut className="w-4 h-4 me-2"/> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
