import React, { FC } from 'react'
import PlaylistItemSkeleton from './PlaylistItemSkeleton'

interface Props{
    number: number
}
const RenderedPlaylistItemSkeleton:FC<Props> = ({number=1}) => (
    <>
    {
        new Array(number).fill(0).map((s, i) => (
             <PlaylistItemSkeleton key={i} />
        ))
    }
  </>
)

export default RenderedPlaylistItemSkeleton