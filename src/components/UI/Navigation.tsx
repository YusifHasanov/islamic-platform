import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import Image from 'next/image'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'




function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const router = useRouter()
  const { pathname } = router;

  const navigation = [
    { name: 'Ana Səhifə', href: '/', current: pathname === '/' },
    { name: 'Sual Cavab', href: '/questions', current: pathname === '/questions' },
    { name: 'Haqqımızda', href: "about-us", current: pathname === '/about-us' },
    { name: 'Kitablar', href: '/books', current: pathname.includes('/books') },
    { name: 'Videolar', href: '/videos', current: pathname.includes('/videos') },
    { name: 'Məqalələr', href: '/articles', current: pathname === '/articles' },
    { name: 'Əlaqə', href: '/contact', current: pathname === '/contact' },
  ]
  const menuItems = [
    { name: "Sübh", current: false },
    { name: "Zöhr", current: false },
    { name: "Əsr", current: false },
    { name: "Məğrib", current: true },
    { name: "İşa", current: false },
  ]

  return (
    <Disclosure as="nav" className="navigation_container  z-40 sticky top-0 bg-gradient-to-l from-yellow-300 via-green-700 to-green-700">
      {({ open }: { open: any }) => (
        <>

          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                {/* Mobile menu button*/}
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
                <div className="flex flex-shrink-1 items-center">
                  <Image
                    className="block h-9 w-auto lg:hidden cursor-pointer" src={"/assets/logo.png"}
                    alt="Your Company"
                    width={100} height={100}
                    onClick={() => { router.push('/') }}
                  />
                  <Image
                    className="hidden h-9 w-auto cursor-pointer lg:block"
                    src={"/assets/logo.png"}
                    alt="Your Company"
                    width={100} height={100}
                    onClick={() => { router.push('/') }}
                  />
                </div>
                <div className="hidden sm:ml-6 lg:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-yellow-400  active:bg-yellow-600 text-slate-600 hover:bg-yellow-500 ' : 'text-gray-300 hover:bg-white hover:bg-opacity-25 hover:text-white active:bg-opacity-5',
                          'rounded-md   px-3 py-2 text-sm font-medium '
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >

                  <span className='flex items-center justify-center p-1 '>
                    {
                      true ? <BsSunFill /> : <BsMoonFill />
                    }
                  </span>
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full  p-2 bg-green-600 text-white  text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2  ">
                      {menuItems.find(i => i.current === true)?.name}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {
                        menuItems.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a href="#" className={classNames(item.current ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                {item.name}
                              </a>
                            )}

                          </Menu.Item>))

                      }
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-yellow-400 text-white hover:bg-yellow-500' : 'text-gray-300 hover:bg-yellow-400 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium'
                  )} aria-current={item.current ? 'page' : undefined}  >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
