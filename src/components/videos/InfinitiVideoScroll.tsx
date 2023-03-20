import React, { Fragment, useEffect, FC } from 'react'
import { UseInfiniteQueryResult, useInfiniteQuery } from 'react-query'
import axios from 'axios'
import { useInView } from 'react-intersection-observer'
import Head from 'next/head'
import Spinner from '../globals/Spinner'

import HeaderSkeleton from '../globals/HeaderSkeleton'
import { Playlist, Video } from '@prisma/client'
import VideoSkeleton from './VideoSkeleton'
import VideoComponent from './VideoComponent'



const queryFn =
    async ({ pageParam = "" }, playlistId: string) => {
        let url = `/api/videos?limit=${16}&order=desc&cursor=${pageParam}&playlistId=${playlistId}`;
        const { data } = await axios.get(url)
        return data
    }

interface Props {
    playlist: Playlist | null
}

const InfinitiVideoScroll: FC<Props> = ({ playlist }) => {
    const [ref, inView] = useInView()


    const query: UseInfiniteQueryResult<any, unknown> = useInfiniteQuery(["videos", playlist?.playlistId],
        async ({ pageParam }) => queryFn({ pageParam }, playlist?.playlistId ?? ""),
        {
            getNextPageParam: (lastPage) => lastPage.nextId ?? false,
            staleTime: 600000,
        })

    useEffect(() => {
        if (inView && query.hasNextPage) query.fetchNextPage()
    }, [inView, query])

    if (query.isLoading || query.isError) return (
        <div className='flex flex-col h-full w-full pr-4' >
            <HeaderSkeleton />
            <div className='hidden h-full w-full lg:grid  rounded-lg grid-cols-4 gap-4 px-3 w-100 pl-7 p-4 mb-4' >
                <VideoSkeleton number={16} />
            </div>
                <div className='grid h-full w-full lg:none  rounded-lg grid-cols-1 gap-4 px-3 w-100 pl-7 p-4 mb-4' >
                    <VideoSkeleton number={4} />
                </div>
        </div>
    )

    return (
        <div className='w-full'>

            <div className='' >
                <h3 className="my-5 text-5xl font-bold text-green-700 dark:text-slate-300 text-center w-full">{playlist?.title ?? "Videolar"}</h3>
                <div className='grid  w-full  xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 lg:px-5   gap-4 px-10' >
                    {query.data && query.data.pages.map((page) => (
                        <Fragment key={page.nextId ?? "lastpage"}>
                            {
                                page.data?.map((video: Video, id: number) => (
                                    <VideoComponent {...video} key={id} />
                                ))
                            }
                        </Fragment>
                    ))}
                    <span ref={ref} style={{ visibility: "hidden" }}>intersaction observer</span>
                </div>
                <div className='hidden lg:grid  w-full rounded-lg grid-cols-4 gap-4 px-3 w-100 pl-7 p-4 mb-4' >
                    {query.isFetchingNextPage && (<VideoSkeleton number={4} />)}
                </div>
                <div className='grid h-full w-full lg:hidden  rounded-lg grid-cols-1 gap-4 px-3 w-100 pl-7 p-4 mb-4' >
                    {query.isFetchingNextPage && (<VideoSkeleton number={2} />)}
                </div>

                <div>
                    {query.isFetchingNextPage && <Spinner />}
                </div>
            </div>

        </div>
    )
}





export default InfinitiVideoScroll
