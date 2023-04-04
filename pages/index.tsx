import React, { useEffect } from 'react'
import { Poppins } from 'next/font/google'
import Footer from '@/src/components/footer/Footer';
import Header from '@/src/components/globals/Header';
import { trpc } from '@/server/utils/trpc';
const montserrat = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin-ext"] })

export default function Home(props: any) {
  const { data: videos } = trpc.video.getAll.useQuery(undefined, { staleTime:0 })
  const { data: playlists } = trpc.playlist.getAll.useQuery(undefined, { staleTime:0 })

  return (
    <>
      <Header title='Əhli Sünnə Mədrəsəsi' />
      <main className={montserrat.className} >
        <div style={{ height: "80vh" }} className={"text-5xl flex items-center justify-center"} >
          Əhli Sünnə Mədrəsəsi
        </div>
      </main>
      <Footer />
    </>
  )
}

