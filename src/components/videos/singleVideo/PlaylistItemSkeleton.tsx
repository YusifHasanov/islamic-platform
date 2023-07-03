import React, { FC } from 'react'


interface Props {
    number: number
}
const PlaylistItemSkeleton: FC<Props> = ({ number = 1 }) => (
    <>
        {
            new Array(number).fill(0).map((s, i) => (
                <Item key={i} />
            ))
        }
    </>
)

export default PlaylistItemSkeleton

const Item = () => {
    return (
        <div className="flex mb-5  justify-between items-center">
            <div style={{ width: "inherit" }} className="ml-4 mt-2 flex items-center">
                <div className="h-4 w-48 rounded-md bg-slate-400 dark:bg-rose-100/20 animate-pulse"></div>
            </div>
            <div className="flex-shrink-0 ml-4 relative">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r
        from-slate-400  via-slate-400   to-slate-400
        dark:from-rose-100/20 dark:via-rose-100/30 dark:to-rose-100/20 animate-pulse"></div>
                <span className="absolute inset-0 flex items-center justify-center">
                </span>
            </div>
        </div>
    )
}