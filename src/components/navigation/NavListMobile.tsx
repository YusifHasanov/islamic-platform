import { Disclosure } from '@headlessui/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'




function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}


const NavListMobile = () => {
    const router = useRouter()
    const { pathname } = router;
    const { theme, setTheme } = useTheme()
    const navigation = [
        { name: 'Ana Səhifə', href: '/', current: pathname === '/' },
        { name: 'Sual Cavab', href: '/questions', current: pathname === '/questions' },
        { name: 'Haqqımızda', href: "/about-us", current: pathname === '/about-us' },
        { name: 'Kitablar', href: '/books', current: pathname.includes('/books') },
        { name: 'Videolar', href: '/videos', current: pathname.includes('/videos') },
        { name: 'Məqalələr', href: '/articles', current: pathname === '/articles' },
        { name: 'Əlaqə', href: '/contact', current: pathname === '/contact' },
    ]
    return (
        <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                    <Link href={item.href} key={item.name}>
                        <Disclosure.Button
                            className={classNames(
                                item.current ? 'bg-yellow-400 text-white hover:bg-yellow-500' : 'text-gray-300 hover:bg-yellow-400 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium'
                            )} aria-current={item.current ? 'page' : undefined}  >
                            {item.name}
                        </Disclosure.Button>
                    </Link>
                ))}
            </div>
        </Disclosure.Panel>
    )
}
const MemoNavListMobile = React.memo(NavListMobile)
export default  MemoNavListMobile;