import React, { memo } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
const NavImages = () => {
    const router = useRouter()
    return (

        <div className="flex flex-shrink-1 items-center">
            <Image
                loading='lazy'
                className="block h-9 w-auto lg:hidden cursor-pointer" src={"/assets/logo.png"}
                alt="Your Company"
                width={100} height={100}
                onClick={() => { router.push('/') }}
            />
            <Image
                loading='lazy'
                className="hidden h-9 w-auto cursor-pointer lg:block"
                src={"/assets/logo.png"}
                alt="Your Company"
                width={100} height={100}
                onClick={() => { router.push('/') }}
            />
        </div>
    )
}

export default memo(NavImages)