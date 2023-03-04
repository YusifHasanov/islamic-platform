import React, { Fragment, useEffect, FC } from 'react'
import { UseInfiniteQueryResult, useInfiniteQuery } from 'react-query'
import axios from 'axios'
import { useInView } from 'react-intersection-observer'
import Head from 'next/head'
import RenderedSkeleton from '../RenderedSkeleton'
import Spinner from '../Spinner'
import RenderedVideos from '@/src/components/UI/videos/renderedVideos'
import { Playlist } from '@prisma/client'

const queryFn = async ({ pageParam = "" }, playlistId: string) => {
    let url = `/api/videos?limit=${16}&order=desc&cursor=${pageParam}&playlistId=${playlistId}`;
    
    const { data } = await axios.get(url)
    return data
}
type InfinitiVideoScrollProps = {
    playlist: Playlist|null;
};

const InfinitiVideoScroll: FC<InfinitiVideoScrollProps> = ({ playlist }) => {
    const [ref, inView] = useInView()
    const query: UseInfiniteQueryResult<any, unknown> = useInfiniteQuery(["videos", playlist?.playlistId],
        async ({ pageParam }) => queryFn({ pageParam }, playlist?.playlistId??""),
        {
            getNextPageParam: (lastPage) => lastPage.nextId ?? false,
            staleTime: 600000 ,
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
        <div>
            <Head>
                <title>Videolar</title>
            </Head>

            <div>
                <h3
                    className="my-5 text-5xl font-bold text-green-700 dark:text-gray-200 text-center w-full" 
                >{playlist ? `${playlist.title}`: "Videolar"}</h3>
                <div className='grid p-4 w-full  grid-cols-4 gap-4 px-5' >
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
            </div>

        </div>
    )
}





export default InfinitiVideoScroll
