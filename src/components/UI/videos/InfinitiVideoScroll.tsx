import React, { Fragment, useEffect, FC } from 'react'
import { UseInfiniteQueryResult, useInfiniteQuery } from 'react-query'
import axios from 'axios'
import { useInView } from 'react-intersection-observer'
import Head from 'next/head'
import RenderedSkeleton from '../RenderedSkeleton'
import Spinner from '../Spinner'
import RenderedVideos from '@/src/components/UI/videos/renderedVideos'


const InfinitiVideoScroll = () => {
    const [ref, inView] = useInView()
    const query: UseInfiniteQueryResult<any, unknown> = useInfiniteQuery("videos",
        async ({ pageParam = "" }) => {
            const { data } =
                await axios.get(`/api/videos?limit=${12}&order=desc&cursor=${pageParam}`)
            return data
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextId ?? false,
            staleTime: 100 ,
        })

    useEffect(() => {
        if (inView && query.hasNextPage) query.fetchNextPage()
    }, [inView, query])

    if (query.isLoading) return (
        <div className=' grid p-4 w-full  grid-cols-4 gap-4 px-3' >
            <RenderedSkeleton number={16} />
        </div>
    )
    if (query.isError) return <div>Error</div>

    return (
        <>
            <Head>
                <title>Videolar</title>
            </Head>
            <div className='grid p-4 w-full  grid-cols-4 gap-4 px-3' >
                {query.data && query.data.pages.map((page) => (
                    <Fragment key={page.nextId ?? "lastpage"}>
                        <RenderedVideos videos={page.data} />
                    </Fragment>
                ))
                }
                <span ref={ref} style={{ visibility: "hidden" }}>intersaction observer</span>
            </div>
            <div className=' grid  grid-cols-4 gap-4 px-3 w-100 p-4 mb-4' >
                {query.isFetchingNextPage && <RenderedSkeleton number={4} />}
            </div>

            <div>
                {query.isFetchingNextPage && <Spinner />}
            </div>

        </>
    )
}





export default InfinitiVideoScroll
