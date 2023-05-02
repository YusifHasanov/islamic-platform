import { Disclosure } from '@headlessui/react'
import React, { FC, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

interface Props {
    parent: Category
    open: boolean
}
const ParentItem: FC<Props> = ({ parent, open }) => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateName, setUpdateName] = useState<string>(parent.name);
    const handleUpdate = () => {
        setIsUpdate(false)
    }
    const handleExit = () => {

    }
    const handleRemove = () => {

    }
    return (
        <>
           <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium dark:bg-gray-900 bg-gray-400 rounded-md mb-4  ">
                                     
            {
                isUpdate ? (
                    <div className="flex w-full justify-between">
                        <input value={updateName} onChange={(e) => { setUpdateName(e.target.value.trim()) }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <button onClick={handleUpdate} className="bg-green-500 text-white mx-2 px-4 py-1  rounded-md">Save</button>
                        <button onClick={handleExit} className="bg-red-500 text-white px-4  py-1 rounded-md">Exit</button>
                    </div>

                ) : (
                    <div className="flex w-full justify-between items-center">
                        <span>{parent.name}</span>
                        <div className="flex">
                            <button onClick={() => setIsUpdate(true)} className="bg-blue-500 mr-2 px-4 text-white py-1 rounded-md">Edit</button>
                            <button onClick={handleRemove} className="bg-red-500 text-white px-4  py-1 rounded-md">Remove</button>
                            <IoIosArrowDown className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500 transition-all ease-out `} />

                        </div>
                    
                    </div>
                )
            }
                                </Disclosure.Button>
         
        </>
    )
}

export default ParentItem