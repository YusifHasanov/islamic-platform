import {useTheme} from 'next-themes';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {memo} from 'react'


const classNames = (...classes: any) => classes.filter(Boolean).join(' ')


const NavList = () => {

    const router = useRouter()
    const {pathname} = router;
    const {theme, setTheme} = useTheme()
    const navigation = [
        {name: 'Ana Səhifə', href: '/', current: pathname === '/'},
        {name: 'Videolar', href: '/videos', current: pathname.includes('/videos')},
        {name: 'Məqalələr', href: '/articles', current: pathname === '/articles'},
        {name: 'Kitablar', href: '/books', current: pathname.includes('/books')}, 
        {name: 'Sual Cavab', href: '/questions', current: pathname === '/questions'},
        {name: 'Haqqımızda', href: "/about-us", current: pathname === '/about-us'}, 
        {name: 'Əlaqə', href: '/contact', current: pathname === '/contact'},
    ]
    return (
        <div className="hidden sm:ml-6 lg:block">
            <div className="flex space-x-4">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                            item.current ? 'bg-white bg-opacity-25 text-white hover:bg-green-600 ' : 'text-gray-300 hover:bg-white hover:bg-opacity-25 hover:text-white active:bg-opacity-5',
                            'rounded-md   px-3 py-2 text-md font-medium '
                        )}
                        aria-current={item.current ? 'page' : undefined}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}
 
export default NavList