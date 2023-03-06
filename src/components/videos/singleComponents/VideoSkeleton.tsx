import React from 'react'

const Skeleton = () => (

<div className="mx-auto  bg-white shadow-lg dark:bg-gray-800   w-full rounded-2xl">
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
  </div>

)


export default Skeleton