import React from 'react'
import Subscribers from '@/src/components/home/Subscribers';
import Hero from '@/src/components/home/Hero';
import Videos from '@/src/components/home/Videos';
import Articles from '@/src/components/home/Articles';
import Galery from '@/src/components/home/Galery';
import CameFromYou from '@/src/components/home/CameFromYou';

const HomePage = () => {
    return (
        <>
            <Hero />
            <Videos />
            <Articles />
            <Subscribers />
            <CameFromYou />
            <Galery />
        </>
    )
}
 
export default  HomePage