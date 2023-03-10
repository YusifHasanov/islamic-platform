import React, { useEffect } from 'react'
import Head from 'next/head'
import { Poppins } from 'next/font/google' 
const montserrat = Poppins({weight: ["400", "500", "600", "700"] , subsets:["latin-ext"]})

export default function Home(props: any) {
 
  useEffect(() => {
    const array = [
      { id: "3221" },
      { id: "3222" },
      { id: "3221" },
      { id: "3223" },
      { id: "3221" }
    ];
    
    const uniqueArray = array.filter((obj, index, self) => {
      return index === self.findIndex((t) => t.id === obj.id);
    });
    
    console.log(uniqueArray);
    navigator.geolocation.getCurrentPosition(function (position) {
  
      // fetch(`https://api.aladhan.com/v1/timings?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&method=13&school=1`)
      //   .then(response => response.json())
      //   .then(data => console.log(data.data))
      //   .catch(error => console.error(error));
    });
  }, [])


  return (
    <>
      <Header />
      <main className={montserrat.className} >
        <div className='homePage  ' >
          Əhli Sünnə Mədrəsəsi
        </div>

      </main>
    </>
  )
}

const Header = () => (
  <Head>
    <title>Əhli Sünnə Mədrəsəsi</title>
    <meta name="description" content="Generated by create next app" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
)
