import React, { FC } from 'react'
import AddCategory from '@/src/admin/categories/AddCategory';
import Toast from '@/src/admin/Toast';
import Layout from '@/src/admin/Layout'
import { Disclosure, Transition } from '@headlessui/react';

import { IoIosArrowDown } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import ChildItem from './ChildItem';
import FetchAPI from '@/src/components/globals/FetchAPI';
import ParentItem from './ParentItem';

interface Props {
    categories: Category[]
}
const CategoryList: FC<Props> = ({ categories }) => {

    return (
        <>
            {
                categories?.filter(category => category.parentId === 0).map((parent) => (
                    <Disclosure key={parent.id}>
                        {({ open }) => (
                            <>
                                <ParentItem parent={parent} open={open} />
                                <Transition
                                    show={open}
                                    enter="transition ease-out duration-300 transform origin-top"
                                    enterFrom="opacity-0 scale-y-0"
                                    enterTo="opacity-100 scale-y-100"
                                    leave="transition ease-in duration-300 transform origin-top"
                                    leaveFrom="opacity-100 scale-y-100"
                                    leaveTo="opacity-0 scale-y-0" >
                                    <div className='flex flex-col px-5'>
                                        {
                                            categories?.filter(category => category.parentId === parent.id).map((child) => (
                                                <ChildItem key={child.id} {...child} />
                                            ))

                                        }
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

