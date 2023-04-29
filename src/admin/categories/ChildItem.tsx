import React, { FC, useState } from 'react'
import { Disclosure } from '@headlessui/react';

interface ChildItemProps {
    id: number,
    name: string,
    parentId: number
}



const ChildItem: FC<ChildItemProps> = ({ id, name, parentId }) => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateName, setUpdateName] = useState<string>(name);

    const handleUpdate = () => {
         setIsUpdate(false)
    }
    const handleExit = ()=>{

    }
    const handleRemove = ()=>{

    }
    return (
        <Disclosure.Panel className={`rounded-md   mb-1 dark:bg-gray-500 dark:text-gray-900 cursor-pointer bg-gray-400  p-2 text-md text-gray-200  `}>
            {
                isUpdate ? (
                    <div className="flex justify-between">
                        <input value={updateName} onChange={(e)=>{setUpdateName(e.target.value.trim())}} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <button onClick={handleUpdate} className="bg-green-500 text-white mx-2 px-4 py-1  rounded-md">Save</button>
                        <button onClick={handleExit} className="bg-red-500 text-white px-4  py-1 rounded-md">Exit</button>
                    </div>

                ) : (
                    <div className="flex justify-between items-center">
                        <span>{name}</span>
                        <div className="flex">
                            <button onClick={() => setIsUpdate(true)} className="bg-blue-500 mr-2 px-4 text-white py-1 rounded-md">Edit</button>
                            <button onClick={handleRemove} className="bg-red-500 text-white px-4  py-1 rounded-md">Remove</button>
                        </div>
                    </div>
                )
            }
        </Disclosure.Panel>
    )
}



export default ChildItem
