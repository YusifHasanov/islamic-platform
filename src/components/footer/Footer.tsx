import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (


        <footer className="bg-white  shadow dark:bg-gray-900">
            <div className="w-full   container mx-auto p-4 md:px-6 md:py-8">
                <div className="sm:flex   sm:items-center sm:justify-between">
                    <a href="https://flowbite.com/" className="flex items-center  mb-4 sm:mb-0">
                        <img src="/assets/logo.png" className="h-8 mr-3" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold   whitespace-nowrap dark:text-white">Əhli Sünnə Mədrəsəsi</span>
                    </a>
                    <ul className="flex flex-wrap  items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <Link href="/about-us" className="mr-4 hover:underline md:mr-6 ">About</Link>
                        </li>
                        <li>
                            <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="mr-4 hover:underline md:mr-6 ">Licensing</a>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:underline">Əlaqə</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">  <a target="_blank" href="https://github.com/YusifHasanov" className="hover:underline">Created by Yusif Hasanov</a>. All Rights Reserved.</span>
            </div>
        </footer>



    )
}

export default Footer