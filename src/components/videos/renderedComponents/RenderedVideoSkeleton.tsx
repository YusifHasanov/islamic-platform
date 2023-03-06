import React, { FC } from 'react'
import Skeleton from '@/src/components/videos/singleComponents/VideoSkeleton'

interface Props {
    number: number
}


const RenderedSkeleton: FC<Props> = ({ number }) => (
    <>
        {
            new Array(number).fill(0).map((s, i) => (
                <Skeleton key={i} />
            ))
        }

    </>
)






export default RenderedSkeleton