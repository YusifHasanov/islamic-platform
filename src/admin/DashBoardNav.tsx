import React, { useEffect, memo } from 'react'
import { FaHome } from 'react-icons/fa'
import { useTheme } from 'next-themes';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import Link from 'next/link';
import { useRouter } from 'next/router';
const DashBoardNav = () => {
    useEffect(() => console.log("dashboard rendered", []))
    const { theme, setTheme } = useTheme()
    const { pathname } = useRouter();
    console.log(pathname)
    const dashboardRoutes = [
        {
            path: "/",
            name: "Dashboard",
            icon: <FaHome />,
            current: pathname === '/admin/dashboard'
        },
        {
            path: "/videos",
            name: "Videos",
            icon: <FaHome />,
            current: pathname.includes('/videos')
        },
        {
            path: "/articles",
            name: "Articles",
            icon: <FaHome />,
            current: pathname.includes('/articles')
        },
        {
            path: "/books",
            name: "Books",
            icon: <FaHome />,
            current: pathname.includes('/books')
        },
        {
            path: "/categories",
            name: "Categories",
            icon: <FaHome />,
            current: pathname.includes('/categories')
        },
    ]
    return (
        <>
            <button data-hs-overlay="#docs-sidebar" aria-controls="docs-sidebar" aria-label="Toggle navigation" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="docs-sidebar" className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[60] w-64 bg-white border-r border-gray-200 overflow-y-auto scrollbar-y sm:block sm:translate-x-0 sm:right-auto sm:bottom-0 dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700">

                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <div className='flex justify-between items-center border-b-2 pb-2 mb-2'>
                        <Link href="/" className='  flex items-center justify-between  px-2 py-1 text-sm font-medium text-left text-gray-700 bg-white rounded-lg dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700'>
                            <FaHome className=' text-2xl' />
                        </Link>
                        <button
                            onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark') }}
                            type="button"
                            className="rounded-full bg-gray-300 dark:bg-gray-700 p-1 text-gray-800 dark:text-gray-300 hover:text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800"
                        >

                            <span className='flex items-center justify-center p-1   '>
                                {
                                    theme !== "dark" ? <BsSunFill /> : <BsMoonFill />
                                }
                            </span>
                        </button>
                    </div>
                    <ul className="space-y-2 font-medium">
                        {
                            dashboardRoutes.map((route, index) => (
                                <li style={{ marginTop: "15px" }} key={route.name}>
                                    <Link href={`/admin/dashboard${route.path}`} className={`flex items-center p-2 ${route.current ? "dark:bg-gray-900 bg-gray-200" : ""} text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-900 dark:bg-gray-700 bg-gray-100`}>
                                        {route.icon}
                                        <span className="ml-3">{route.name}</span>
                                    </Link>

                                </li>
                            ))
                        }

                    </ul>
                </div>
            </aside>
        </>
    )
}

export default memo(DashBoardNav)

