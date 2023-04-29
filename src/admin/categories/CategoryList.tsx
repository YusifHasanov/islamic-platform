import React, { FC } from 'react'
import AddCategory from '@/src/admin/categories/AddCategory';
import Toast from '@/src/admin/Toast';
import Layout from '@/src/components/globals/Layout'
import { Disclosure, Transition } from '@headlessui/react';

import { IoIosArrowDown } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import ChildItem from './ChildItem';
const categories = [
    {
        id: 1,
        name: "Fiqh",
        parentId: 0,
    },
    {
        id: 2,
        name: "Hadis",
        parentId: 0,
    },
    {
        id: 3,
        name: "Eqide",
        parentId: 0,
    },
    {
        id: 4,
        name: "Henefi",
        parentId: 1,
    },
    {
        id: 5,
        name: "Safei",
        parentId: 1,
    },
    {
        id: 6,
        name: "Henbeli",
        parentId: 1,
    },
    {
        id: 7,
        name: "Maliki",
        parentId: 1,
    },
    {
        id: 8,
        name: "Eseri",
        parentId: 3,
    },
    {
        id: 9,
        name: "Eşeri",
        parentId: 3,
    },
    {
        id: 10,
        name: "Matrudi",
        parentId: 3,
    }
]
const CategoryList = () => {
    return (
        <>
            {
                categories.filter(category => category.parentId === 0).map((parent) => (
                    <Disclosure key={parent.id}>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium dark:bg-gray-900 bg-gray-400 rounded-md mb-4  ">
                                    <span>{parent.name}</span>
                                    <IoIosArrowDown className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500 transition-all ease-out `} />
                                </Disclosure.Button>
                                <Transition
                                    show={open}
                                    enter="transition ease-out duration-300 transform origin-top"
                                    enterFrom="opacity-0 scale-y-0"
                                    enterTo="opacity-100 scale-y-100"
                                    leave="transition ease-in duration-300 transform origin-top"
                                    leaveFrom="opacity-100 scale-y-100"
                                    leaveTo="opacity-0 scale-y-0" >
                                    <div className='flex flex-col px-5'>
                                        {categories.filter(category => category.parentId === parent.id)
                                            .map((child) => <ChildItem key={child.id} {...child} />)}
                                    </div>
                                </Transition>
                            </>
                        )}
                    </Disclosure>
                ))
            }
        </>
    )
}

export default CategoryList

