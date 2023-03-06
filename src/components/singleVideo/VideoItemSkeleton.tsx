import React from 'react'
import { FaYoutube } from 'react-icons/fa'
// interactive and animated skeleton loading  for VideoItem component with tailwindcss and nextjs
const VideoItemSkeleton = () => {
  return (
        
    <div
    className="
    w-full
    h-96
      space-y-5 rounded-2xl
          bg-slate-400
      dark:bg-white/5 p-4
      isolate
      overflow-hidden
      shadow-xl
      shadow-gray-500
      dark:shadow-black/5
      before:border-t  before:border-gray-300 dark:before:border-rose-100/10
      relative 
      before:absolute before:inset-0
      before:-translate-x-full
      before:animate-[shimmer_2s_infinite]
      before:bg-gradient-to-r
      before:from-transparent before:via-zinc-300 before:to-transparent dark:before:via-rose-100/10 dark:before:to-transparent"
  >
    <div className=" h-36 rounded-lg bg-gray-300 dark:bg-rose-100/10 relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <FaYoutube size={64}  className='text-gray-500 ' />
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-3 w-3/5 rounded-lg bg-rose-100/10"></div>
      <div className="h-3 w-4/5 rounded-lg bg-rose-100/20"></div>
      <div className="h-3 w-2/5 rounded-lg bg-rose-100/20"></div>
    </div>
  </div>
  )
}

export default VideoItemSkeleton