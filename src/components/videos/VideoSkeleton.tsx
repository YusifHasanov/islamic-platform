import React, { FC } from 'react'


interface Props {
  number: number
}
const Skeleton: FC<Props> = ({ number }) => (
  <>
    {
      new Array(number).fill(0).map((s, i) => (
        <Item key={i} />
      ))
    }

  </>
)

const Item = () => (
  <div
    className="
    
    space-y-5 rounded-2xl bg-slate-400 dark:bg-white/5 p-4
    isolate
    overflow-hidden
    shadow-xl shadow-gray-500 dark:shadow-black/5
    before:border-t before:border-gray-300 dark:before:border-rose-100/10
    relative 
    before:absolute before:inset-0
    before:-translate-x-full
    before:animate-[shimmer_2s_infinite]
    before:bg-gradient-to-r
    before:from-transparent before:via-zinc-300 dark:before:via-rose-100/10 before:to-transparent"
  >
    <div className=" h-36 rounded-lg bg-rose-100/10"></div>
    <div className="space-y-3">
      <div className="h-3 w-3/5 rounded-lg bg-gray-500 dark:bg-rose-100/10"></div>
      <div className="h-3 w-4/5 rounded-lg bg-gray-300 dark:bg-rose-100/20"></div>
      <div className="h-3 w-2/5 rounded-lg bg-gray-300 dark:bg-rose-100/20"></div>
    </div>
  </div>
)




export default Skeleton