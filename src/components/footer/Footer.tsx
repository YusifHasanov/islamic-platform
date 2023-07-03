import Link from 'next/link'
import React, { memo } from 'react'
const listItems = [
    {
        title: "Haqqımmızda",
        link: "/about-us"

    }, {
        title: "Əlaqə",
        link: "/contact"
    }, {
        title: "Privacy Policy",
        link: "#"
    }

]
const Footer = () => {   
 
    return (

        <footer className="bg-gray-300  shadow dark:bg-gray-950">
            <div className="w-full   container mx-auto p-4 md:px-6 md:py-8">
                <div className="sm:flex   sm:items-center sm:justify-between">
                    <Link href="/" className="flex items-center  mb-4 sm:mb-0">
                        <img src="/assets/logo.webp" className="h-8 mr-3" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold text-gray-800   whitespace-nowrap dark:text-gray-400">Əhli Sünnə Mədrəsəsi</span>
                    </Link>
                    <ul className="flex flex-wrap  items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                        {
                            listItems.map(item => (
                                <li key={item.title}>
                                    <Link href={item.link} className="mr-4 hover:underline md:mr-6 ">{item.title}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">  <a target="_blank" href="https://github.com/YusifHasanov" className="hover:underline">Created by Yusif Hasanov</a>. All Rights Reserved.</span>
            </div>
        </footer>



    )
}
 
export default Footer