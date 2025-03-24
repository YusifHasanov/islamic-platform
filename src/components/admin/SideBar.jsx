import React, {useState} from 'react';
import Link from "next/link";


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
                <path
                    d="M2 10a8 8 0 1 1 16 0A8 8 0 0 1 2 10Zm8-3a1 1 0 0 0 0 2 1 1 0 0 1 1 1v3a1 1 0 0 0 2 0v-3a3 3 0 0 0-3-3Zm0 9a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"/>
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
                <path
                    d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                <path
                    d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
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
                <path
                    d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
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
                <path
                    d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
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
                <path d="M10 2a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8Zm0 14a6 6 0 1 1 6-6 6.007 6.007 0 0 1-6 6Z"/>
                <path d="M11 10h2a1 1 0 0 0 0-2h-2V7a1 1 0 0 0-2 0v1H7a1 1 0 0 0 0 2h2v1a1 1 0 0 0 2 0v-1Z"/>
            </svg>
        ),
    },
    {
        href: "/admin/book",
        label: "Kitablar",
        icon: (
            <svg
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path
                    d="M11 1a1 1 0 0 0-2 0v2.058A7.962 7.962 0 0 0 6.343 4.93L4.929 3.515a1 1 0 0 0-1.414 1.414L4.93 6.343A7.963 7.963 0 0 0 3.058 9H1a1 1 0 0 0 0 2h2.058a7.964 7.964 0 0 0 1.872 2.657L3.515 15.07a1 1 0 1 0 1.414 1.414l1.414-1.414A7.962 7.962 0 0 0 9 16.942V19a1 1 0 0 0 2 0v-2.058a7.964 7.964 0 0 0 2.657-1.872l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414A7.963 7.963 0 0 0 16.942 11H19a1 1 0 0 0 0-2h-2.058a7.962 7.962 0 0 0-1.872-2.657L15.07 4.93a1 1 0 1 0-1.414-1.414L12.242 4.93A7.962 7.962 0 0 0 11 3.058V1Zm-1 14a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5Z"/>
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
                fill="#000000">
                <g>
                    <path
                        d="M15.255,0c5.424,0,10.764,2.498,10.764,8.473c0,5.51-6.314,7.629-7.67,9.62c-1.018,1.481-0.678,3.562-3.475,3.562   c-1.822,0-2.712-1.482-2.712-2.838c0-5.046,7.414-6.188,7.414-10.343c0-2.287-1.522-3.643-4.066-3.643   c-5.424,0-3.306,5.592-7.414,5.592c-1.483,0-2.756-0.89-2.756-2.584C5.339,3.683,10.084,0,15.255,0z M15.044,24.406   c1.904,0,3.475,1.566,3.475,3.476c0,1.91-1.568,3.476-3.475,3.476c-1.907,0-3.476-1.564-3.476-3.476   C11.568,25.973,13.137,24.406,15.044,24.406z"/>
                </g>
            </svg>
        ),
    }
];

function Sidebar({children}) {
    // Track dropdown state
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [revalidateDisabled, setRevalidateDisabled] = useState(false);

    const revalidate = () => {
        setRevalidateDisabled(true);
        const secret = process.env.NEXT_PUBLIC_REVALIDATE_SECRET;
        const paths = [
            '/articles',
            '/videos',
            '/',
            '/videos/**',
            '/articles/**'
        ];

        Promise.all(
            paths.map(path =>
                fetch(`/api/revalidate?path=${encodeURIComponent(path)}&secret=${secret}`)
                    .then(() => console.log(`Revalidated ${path} successfully.`))
                    .catch(err => console.error(`Failed to revalidate ${path}.`, err))
            )
        )
            .then(() => console.log('All revalidation calls finished.'))
            .catch(err => console.error('Some revalidation calls failed.', err))
            .finally(() => setRevalidateDisabled(false));

    }


    return (
        <>
            <nav
                className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            {/* Sidebar toggle button (mobile) */}
                            <button
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100
                           focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700
                           dark:focus:ring-gray-600"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0
                       010 1.5H2.75A.75.75 0 012 4.75zm0
                       10.5a.75.75 0 01.75-.75h7.5a.75.75 0
                       010 1.5h-7.5a.75.75 0 01-.75-.75zM2
                       10a.75.75 0 01.75-.75h14.5a.75.75 0
                       010 1.5H2.75A.75.75 0 012 10z"
                                    />
                                </svg>
                            </button>
                            <Link href="/" className="flex ms-2 md:me-24">
                                <img
                                    src="/esm_logo.png"
                                    className="h-8 me-3"
                                    alt="Esm Logo"
                                />
                                <span
                                    className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Ehlisunne Medresesi Admin
                </span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <div>
                                    {/* Toggle dropdown on click */}
                                    <button
                                        type="button"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="flex text-sm bg-gray-800 rounded-full
                               focus:ring-4 focus:ring-gray-300
                               dark:focus:ring-gray-600"
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                            alt="user photo"
                                        />
                                    </button>
                                </div>
                                {/* Conditionally render the dropdown */}
                                {isDropdownOpen && (
                                    <div
                                        className="z-50 my-4 text-base list-none bg-white
                               divide-y divide-gray-100 rounded shadow
                               dark:bg-gray-700 dark:divide-gray-600
                               absolute top-14 right-4"
                                    >
                                        <div className="px-4 py-3" role="none">
                                            <p className="text-sm text-gray-900 dark:text-white"
                                                    role="none">
                                                neill
                                            </p>
                                            <p
                                                className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                                                role="none"
                                            >
                                                neil.sims@flowbite.com
                                            </p>
                                        </div>
                                        <ul className="py-1" role="none">
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700
                                     hover:bg-gray-100 dark:text-gray-300
                                     dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem"
                                                >
                                                    Dashboard
                                                </a>
                                            </li>
                                            <li>
                                                <button disabled={revalidateDisabled}
                                                        onClick={revalidate}
                                                        className="text-sm ml-4 text-gray-900 dark:text-white"
                                                        role="none">
                                                    Revalidate all Menus
                                                </button>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700
                                     hover:bg-gray-100 dark:text-gray-300
                                     dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem"
                                                >
                                                    Earnings
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700
                                     hover:bg-gray-100 dark:text-gray-300
                                     dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem"
                                                >
                                                    Sign out
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside
                aria-label="Sidebar"
                id="logo-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen bg-white border-r
                   border-gray-200 dark:bg-gray-800"
            >
                <div className="px-3 py-4 overflow-y-auto">
                    <ul className="space-y-2">
                        {sidebarItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    className="flex items-center p-2 text-gray-900
                             rounded-lg dark:text-white hover:bg-gray-100
                             dark:hover:bg-gray-700 group"
                                >
                                    {item.icon}
                                    <span className="ml-3">{item.label}</span>
                                    {item.badge && (
                                        <span
                                            className="ml-auto inline-flex items-center justify-center px-2 py-1
                                 text-sm font-medium text-gray-800 bg-gray-100
                                 rounded-full dark:bg-gray-700 dark:text-gray-300"
                                        >
                      {item.badge}
                    </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed
                        rounded-lg dark:border-gray-700 mt-14"
                >
                    {children}
                </div>
            </div>
        </>
    );
}

export default Sidebar;


