import React from 'react'

const HeaderSkeleton = () => (
    <div role="status" className=" pt-8 flex items-center flex-col justify-center w-full  animate-pulse">
        <div className="h-3  bg-gray-300 rounded-full dark:bg-gray-700 w-52 mb-4"></div>
        <div className="h-2  bg-gray-300 rounded-full dark:bg-gray-700 w-64 mb-4"></div>
    </div>

)

export default HeaderSkeleton