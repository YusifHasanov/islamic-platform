import React from 'react'
import { Poppins } from 'next/font/google'
import Footer from '@/src/components/footer/Footer';
import Header from '@/src/components/globals/Header';
import HomePage from '@/src/components/home/HomePage';

const montserrat = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin-ext"] })

export default function Home(props: any) {


  return (
    <>
      <Header title='Əhli Sünnə Mədrəsəsi' />
      <main className={`${montserrat.className} bg-gray-100 dark:bg-gray-700  `} >
        <HomePage />
      </main>
    </>
  )
}

