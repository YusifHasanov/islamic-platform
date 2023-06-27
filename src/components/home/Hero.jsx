import { useState } from 'react'
import Typewriter from 'typewriter-effect';
 import dynamic from 'next/dynamic';
import 'atropos/css'
 
const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-gray-200 dark:bg-gray-900 overflow-hidden">
      <div className="relative isolate px-6  lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#57e94a] to-[#0a752a69] opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              background: 'linear-gradient(to bottom right, rgba(87, 233, 74, 0.6), rgba(10, 117, 42, 0.4))',
            }}
          />
        </div>
        <div className="w-full ">

          <div style={{ width: '100%', justifyContent: "space-between" }}
            className="text-center sm:px-8 flex justify-between w-full items-center image-3d-container  ">
            <div>
              <h1 className="text-4xl  font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">

                <Typewriter
                  options={{
                    strings: ['Əhli Sünnə Mədrəsəsi', 'Hənəfi, Şafei, Malik, Hənbəli', "Maturidi, Əşari, Əsəri"],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                  }}

                />
              </h1>
            </div>
     
     <img className="image-3d" src={"/assets/logo400.png"} alt="" /> 
 
           
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#5cce1a] to-[#0d6133] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              background: 'linear-gradient(to bottom right, #57e94a, #0a752a69)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
