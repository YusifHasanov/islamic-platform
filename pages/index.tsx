import React  from 'react'
import { Poppins } from 'next/font/google'
import Footer from '@/src/components/footer/Footer';
import Header from '@/src/components/globals/Header'; 
import Subscribers from '@/src/components/home/Subscribers';
import Hero from '@/src/components/home/Hero';
import Videos from '@/src/components/home/Videos';
import Articles from '@/src/components/home/Articles';
import Galery from '@/src/components/home/Galery';
import CameFromYou from '@/src/components/home/CameFromYou';
const montserrat = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin-ext"] })

export default function Home(props: any) {
 

  return (
    <>
      <Header title='Əhli Sünnə Mədrəsəsi' />
      <main className={`${montserrat.className} bg-gray-100 dark:bg-gray-700  `} >
        <Hero />
        <Videos />
        <Articles />
        <Subscribers />
        <CameFromYou />
        <Galery />
      </main>
      <Footer />
    </>
  )
}

