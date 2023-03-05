import React from 'react'

const ListItemSkeleton = () => {
    return (
        <div className="flex mb-5">
            <div className="flex-shrink-0">
                <span className="w-12 h-12 block bg-gray-300 rounded-full dark:bg-gray-700"></span>
            </div>

            <div className="ml-4 mt-2 w-full">
                <h3 className="h-4 bg-gray-300 rounded-md dark:bg-gray-700" style={{width:"40px"}}></h3>
                <ul className="mt-5 space-y-3">
                    <li className="w-full h-4 bg-gray-300 rounded-md dark:bg-gray-700"></li> 
                </ul>
            </div>
        </div>
    )
}

export default ListItemSkeleton