import React, { Fragment, useEffect, FC } from 'react'
import { UseInfiniteQueryResult, useInfiniteQuery } from 'react-query'
import axios from 'axios'
import { useInView } from 'react-intersection-observer'
import Head from 'next/head'
import RenderedSkeleton from './renderedComponents/RenderedVideoSkeleton'
import Spinner from '../Spinner'
import RenderedVideos from '@/src/components/videos/renderedComponents/renderedVideos'
import { useAtomValue } from 'jotai'
import { playlistState } from '@/src/jotai/atoms'
import HeaderSkeleton from '../HeaderSkeleton'



const queryFn =
    async ({ pageParam = "" }, playlistId: string) => {
        let url = `/api/videos?limit=${16}&order=desc&cursor=${pageParam}&playlistId=${playlistId}`;
        const { data } = await axios.get(url)
        return data
    }

const InfinitiVideoScroll = () => {
    const [ref, inView] = useInView()
    const playlist = useAtomValue(playlistState)

    const query: UseInfiniteQueryResult<any, unknown> = useInfiniteQuery(["videos", playlist?.playlistId],
        async ({ pageParam }) => queryFn({ pageParam }, playlist?.playlistId ?? ""),
        {
            getNextPageParam: (lastPage) => lastPage.nextId ?? false,
            staleTime: 600000,
        })

    useEffect(() => {
        if (inView && query.hasNextPage) query.fetchNextPage()
    }, [inView, query])

    if (query.isLoading) return (
        <div className='flex flex-col h-full w-full pr-4' >
            <HeaderSkeleton/>
            <div className='grid h-full w-full rounded-lg grid-cols-4 gap-4 px-3 w-100 pl-7 p-4 mb-4' >

                <RenderedSkeleton number={16} />
            </div>
        </div>
    )

    if (query.isError) return <div>Error</div>

    return (
        <div className='w-full'> 

            <div className='' >
                <h3 className="my-5 text-5xl font-bold text-green-700 dark:text-slate-300 text-center w-full">{playlist?.title ?? "Videolar"}</h3>
                <div className='grid  w-full  xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 lg:px-5   gap-4 px-10' >
                    {query.data && query.data.pages.map((page) => (
                        <Fragment key={page.nextId ?? "lastpage"}>
                            <RenderedVideos videos={page.data} />
                        </Fragment>
                    ))}
                    <span ref={ref} style={{ visibility: "hidden" }}>intersaction observer</span>
                </div>
                <div className=' grid  w-full rounded-lg grid-cols-4 gap-4 px-3 w-100 pl-7 p-4 mb-4' >
                    {query.isFetchingNextPage && <RenderedSkeleton number={4} />}
                </div>

                <div>
                    {query.isFetchingNextPage && <Spinner />}
                </div>
            </div>

        </div>
    )
}





export default InfinitiVideoScroll
