import React from 'react'
import { Poppins } from 'next/font/google'
import Footer from '@/src/components/footer/Footer';
import Header from '@/src/components/globals/Header';
const montserrat = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin-ext"] })

export default function Home(props: any) {


  return (
    <>
      <Header title='Əhli Sünnə Mədrəsəsi' />
      <main className={montserrat.className} >
        <div style={{ height: "80vh" }} className={"text-5xl flex items-center justify-center"} >
          Əhli Sünnə Mədrəsəsi``
        </div>

      </main>
      <Footer />
    </>
  )
}

