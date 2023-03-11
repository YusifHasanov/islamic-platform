import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import Image from 'next/image'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'
import { useTheme } from 'next-themes'
import NavList from './NavList'
import NavListMobile from './NavListMobile'
import NavPrayTimes from './NavPrayTimes'
import NavImages from './NavImages'
import { memo } from 'react'


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const Navigation = memo(() => {
  const router = useRouter()
  const { pathname } = router;
  const { theme, setTheme } = useTheme()


  return (
    <Disclosure as="nav" className="navigation_container z-40 sticky top-0 bg-gradient-to-l  ">
      {({ open }: { open: any }) => (
        <>

          <div className="mx-auto max-w-7xl px-2 sm:px-6 sm:py-1 lg:px-8 lg:py-2">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">

                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-yellow-200 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <AiOutlineClose className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FaBars className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start">
                {/* //! Logo */}
                <NavImages />
                {/* //! Nav List */}
                <NavList />
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark') }}
                  type="button"
                  className="rounded-full bg-gray-300 dark:bg-gray-800 p-1 text-gray-800 dark:text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >

                  <span className='flex items-center justify-center p-1 '>
                    {
                      theme !== "dark" ? <BsSunFill /> : <BsMoonFill />
                    }
                  </span>
                </button>
                {/* //! Pray Times */}
                <NavPrayTimes />
              </div>
            </div>
          </div>
          {/* //! Mobile Nav */}
          <NavListMobile />
        </>
      )}
    </Disclosure>
  )
}
)
export default Navigation