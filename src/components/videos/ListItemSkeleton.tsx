import React from 'react'

const ListItemSkeleton = () => {
    return (
        <div style={{width:"inherit"}} className="flex mb-5 items-center">
            <div className="flex-shrink-0">
                <span className="w-12 h-12 block bg-gray-300 rounded-full dark:bg-gray-700"></span>
            </div>

            <div style={{width:"inherit"}} className="ml-4 mt-2  flex items-center">
                <h3 className="h-4 bg-gray-300 rounded-md dark:bg-gray-700  w-48 "  ></h3>
                {/* <ul className="mt-5 space-y-3">
                    <li className=" w-32 h-4 bg-gray-300 rounded-md dark:bg-gray-700"></li> 
                </ul> */}
            </div>
        </div>
    )
}

export default ListItemSkeleton