import React from 'react'


  
const Skeleton = () => (
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
{/* <div className="mx-auto  bg-white shadow-lg dark:bg-gray-800   w-full rounded-2xl">
    <div className="h-36 p-3 overflow-hidden  rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse">
    </div>
    <div className="p-3 rounded h-">
      <div className="grid grid-cols-3 rounded gap-4 mt-2">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse">
        </div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse">
        </div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse">
        </div>
        <div className="h-8 col-span-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse">
        </div>
        <div className="h-8 bg-gray-200 rounded  dark:bg-gray-700 animate-pulse">
        </div>
        <div className="...">
        </div>
        <div className="col-span-2 ...">
        </div>
      </div>
    </div>
  </div> */}

 


export default Skeleton