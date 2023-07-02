import React, { Fragment, useEffect, FC } from 'react'
import axios from 'axios'
import { useInView } from 'react-intersection-observer'
import Spinner from '../globals/Spinner'
import HeaderSkeleton from '../globals/HeaderSkeleton' 
import VideoSkeleton from './VideoSkeleton'
import VideoComponent from './VideoComponent' 


 
const videos=[
    {
      id: 1,
      videoId: "KYVw2w8MAIM",
      publishedAt: "2023-02-27T13:45:52.000Z",
      thumbnail: "https://i.ytimg.com/vi/KYVw2w8MAIM/hqdefault.jpg",
      title: "Qardaşlıq Çempionatı | Final",
      playlistId: "PLU43-RoCoSfMihq_-X8zYGxergJCMgayn"
    },
    {
      id:2,
      videoId: "cuhKwEl6DuQ",
      publishedAt: "2023-03-06T16:00:07.000Z",
      thumbnail: "https://i.ytimg.com/vi/cuhKwEl6DuQ/hqdefault.jpg",
      title: "Qardaşlıq Çempionatı - Super Kubok Oyunu | 313 - DABIQ",
      playlistId: "PLU43-RoCoSfMihq_-X8zYGxergJCMgayn"
    },
    {
      id:3,
      videoId: "Czdxy8ljPPE",
      publishedAt: "2023-02-06T14:25:57.000Z",
      thumbnail: "https://i.ytimg.com/vi/Czdxy8ljPPE/hqdefault.jpg",
      title: "Müsəlman Ölkələrindəki Zəlzələ Haqqında | Gündəm Və İslam",
      playlistId: "PLU43-RoCoSfPLj9z7d_jwLzi4ue9Yvv7e"
    },
    {
      id: 4,
      videoId: "o2ENJHBKFtM",
      publishedAt: "2023-02-09T14:02:47.000Z",
      thumbnail: "https://i.ytimg.com/vi/o2ENJHBKFtM/hqdefault.jpg",
      title: "Dini Lağa Qoyanlar | Gündəm Və İslam",
      playlistId: "PLU43-RoCoSfPLj9z7d_jwLzi4ue9Yvv7e"
    },
    {
      id: 5,
      videoId: "ZUW2Ffyn_do",
      publishedAt: "2023-02-13T11:54:18.000Z",
      thumbnail: "https://i.ytimg.com/vi/ZUW2Ffyn_do/hqdefault.jpg",
      title: "14 Fevral Sevgililər Günü Haqqında | Gündəm Və İslam",
      playlistId: "PLU43-RoCoSfPLj9z7d_jwLzi4ue9Yvv7e"
    },
    {
      id:3,
      videoId: "Czdxy8ljPPE",
      publishedAt: "2023-02-06T14:25:57.000Z",
      thumbnail: "https://i.ytimg.com/vi/Czdxy8ljPPE/hqdefault.jpg",
      title: "Müsəlman Ölkələrindəki Zəlzələ Haqqında | Gündəm Və İslam",
      playlistId: "PLU43-RoCoSfPLj9z7d_jwLzi4ue9Yvv7e"
    },
    {
      id: 4,
      videoId: "o2ENJHBKFtM",
      publishedAt: "2023-02-09T14:02:47.000Z",
      thumbnail: "https://i.ytimg.com/vi/o2ENJHBKFtM/hqdefault.jpg",
      title: "Dini Lağa Qoyanlar | Gündəm Və İslam",
      playlistId: "PLU43-RoCoSfPLj9z7d_jwLzi4ue9Yvv7e"
    },
    {
      id: 5,
      videoId: "ZUW2Ffyn_do",
      publishedAt: "2023-02-13T11:54:18.000Z",
      thumbnail: "https://i.ytimg.com/vi/ZUW2Ffyn_do/hqdefault.jpg",
      title: "14 Fevral Sevgililər Günü Haqqında | Gündəm Və İslam",
      playlistId: "PLU43-RoCoSfPLj9z7d_jwLzi4ue9Yvv7e"
    }
  ]
interface Props {
    playlist:any
}

const InfinitiVideoScroll: FC<Props> = ({ playlist }) => {
    const [ref, inView] = useInView()


    // const query: UseInfiniteQueryResult<any, unknown> = useInfiniteQuery(["videos", playlist?.playlistId],
    //     async ({ pageParam }) => queryFn({ pageParam }, playlist?.playlistId ?? ""),
    //     {
    //         getNextPageParam: (lastPage) => lastPage.nextId ?? false,
    //         staleTime: 600000,
    //     })


   
    // useEffect(() => {
    //     if (inView && query.hasNextPage) query.fetchNextPage()
    // }, [inView, query])

    // if (query.isLoading || query.isError) return (
    //     <div className='flex flex-col h-full w-full pr-4' >
    //         <HeaderSkeleton />
    //         <InfinityScrollScheleton num1={16} num2={4} />
    //     </div>
    // )

    return (
        <div className='w-full'>

             <div className='' >
                <h3 className="my-5 text-5xl font-bold text-green-700 dark:text-slate-300 text-center w-full">{playlist?.title ?? "Videolar"}</h3>
                <div className='grid  w-full  xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 lg:px-5   gap-4 px-10' >
                    {/* {query.data && query.data.pages.map((page) => (
                        <Fragment key={page.nextId ?? "lastpage"}>
                            {
                                page.data?.filter(item => item.thumbnail !== '').map((video: any, id: number) => (
                                    <VideoComponent {...video} key={id} />
                                ))
                            }
                        </Fragment>
                    ))} */}
                    {
                        videos.map((item)=>(
                            <VideoComponent {...item} key={item.id} />
                        ))
                    }
                    <span ref={ref} style={{ visibility: "hidden" }}>intersaction observer</span>
                </div>
                {/* {query.isFetchingNextPage && (<InfinityScrollScheleton num1={4} num2={2} />)} */}
                <div>
                    {/* {query.isFetchingNextPage && <Spinner />} */}
                </div>
            </div> 

        </div>
    )
}





export default InfinitiVideoScroll
const InfinityScrollScheleton = ({ num1, num2 }: { num1: number, num2: number }) => (
    <>
        <div className='hidden h-full w-full lg:grid  rounded-lg grid-cols-4 gap-4 px-3 w-100 pl-7 p-4 mb-4' >
            <VideoSkeleton number={num1} />
        </div>
        <div className='grid h-full w-full lg:hidden  rounded-lg grid-cols-1 gap-4 px-3 w-100 pl-7 p-4 mb-4' >
            <VideoSkeleton number={num2} />
        </div>
    </>
)