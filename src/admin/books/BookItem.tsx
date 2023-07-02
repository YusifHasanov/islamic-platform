import React, { FC, useEffect } from 'react'
import Image from 'next/image';
import moment from 'moment'
import Toast from '../../Libs/Toast';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { AiFillEdit, AiFillFileAdd, AiFillPhone, AiOutlineUser } from 'react-icons/ai';

interface SlideProps {
    id: number;
    title: string;
    description: string;
    publishedAt: string;
    author: string;
    cover: string;
}

const authors = [
    {
        id: 1,
        name: "Firudin Babaoglu",
        image: "sekildsa",
        articles: [],
        books: [
            1
        ]
    },
    {
        id: 2,
        name: "Ramazan Heyderov",
        image: "sekildsa",
        articles: [],
        books: [
            1
        ]
    },
    {
        id: 3,
        name: "Firudin Babaoglu",
        image: "sekildsa",
        articles: [],
        books: [
            1
        ]
    },
    {
        id: 4,
        name: "Ramazan Heyderov",
        image: "sekildsa",
        articles: [],
        books: [
            1
        ]
    },
    {
        id: 5,
        name: "Firudin Babaoglu",
        image: "sekildsa",
        articles: [],
        books: [
            1
        ]
    },
]

const BookItem: FC<SlideProps> = ({ id, title, description, publishedAt, author, cover }) => {
    const toast = Toast.getInstance();
    let [isOpen, setIsOpen] = useState(false)
    const [bookState, setBookState] = useState({
        id,
        title,
        description,
        publishedAt,
        author,
        cover: ""
    });

    const isDisable = bookState.title.length < 3 || bookState.description.length < 5 || author === "" || cover === ""
    const handleChange = (key: string, value: string) =>
        setBookState({
            ...bookState,
            [key]: value
        })


    const handleRemove = () => {
        if (window.confirm("Əməliyyatı geri qaytarmaq mümkün olmayacaq, bunu etmək istədiyinzdən əminsinizmi,")) {
            toast.warning("Kitab silindi")
            return;
        }
        toast.info("Əməliyyat ləğv edildi.")
    }

    const closeModal = () => {
        if (!window.confirm("Edilən dəyişikliklər yadda saxlanmayacaq , əminsinizmi?")) {
            return
        }
        setIsOpen(false)

    }

    const openModal = () => {
        setIsOpen(true)
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (window.confirm("Dəyişiklikləri yadda saxlamaq istəyirsinizmi?")) {
            toast.success("Kitab yeniləndi")
            setIsOpen(false)
            return;
        }
    }


    return (
        <div className="grid border-1 p-3 dark:bg-gray-900 bg-gray-300   rounded-md  shadow-md" style={{ gridTemplateRows: "50px 1fr" }} >
            <div className="info flex justify-start flex-col">
                <span className="dark:text-gray-100 text-center  text-gray-700  ">{title}</span>
            </div>
            <div className="image">
                <div className="relative  w-full h-60 md:h-52 overflow-hidden rounded-lg  flex justify-center">
                    <Image loading="lazy" className="rounded-md  " src={cover} fill alt={""} />
                </div>
            </div>
            <div className='flex justify-between w-full'>
                <button onClick={openModal} className="mr-1  w-full bg-green-500 hover:bg-green-600 mt-2 focus:ring-green-500 focus:ring-offset-blue-200 text-white font-medium rounded-lg shadow-md p-2 transition ease-in-out duration-150   text-base  tracking-wide   text-center  focus:outline-none focus:ring-2 focus:ring-offset-2 "> Edit </button>
                <button onClick={handleRemove} className="mr-1  w-full bg-red-500 hover:bg-red-600 mt-2 focus:ring-red-500 focus:ring-offset-blue-200 text-white font-medium rounded-lg shadow-md p-2 transition ease-in-out duration-150   text-base  tracking-wide   text-center  focus:outline-none focus:ring-2 focus:ring-offset-2 "> Remove </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-gra-200 dark:bg-gray-900 bg-gray-300 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h4"
                                        className="text-lg mb-3 font-medium leading-6 dark:text-gray-200 text-gray-900">
                                        Kitab Məlumatlarını Dəyiş
                                    </Dialog.Title>

                                    <form action="" onSubmit={submitHandler} >

                                        <div className="space-y-12">
                                            <div className="border-b border-gray-900/10 pb-12">
                                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="book_title" className="block text-sm font-medium leading-6 dark:text-gray-200 text-gray-900">
                                                            Title
                                                        </label>
                                                        <input value={bookState.title} onChange={(e) => { handleChange("title", e.target.value) }} id='book_title' type="text" className=" focus:border-blue-500 focus:ring-blue-500 py-3 px-4 block w-full dark:bg-gray-300  rounded-md text-sm  bg-white dark:bg-gray-200 text:gray-900 dark:border-gray-700 dark:text-gray-900" placeholder="Title" />
                                                    </div>
                                                    <div className="col-span-full">
                                                        <label htmlFor="book_author" className="block text-sm font-medium leading-6 dark:text-gray-200 text-gray-900">
                                                            Müəllif
                                                        </label>
                                                        <select value={bookState.author} onChange={(e) => { handleChange("author", e.target.value.toString()) }} id="book_author" className="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-300 text:gray-900 dark:border-gray-700 dark:text-gray-900">

                                                            {
                                                                authors.map((author) => (
                                                                    <option key={author.name} value={author.id}>{author.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="book_publish_date" className="block text-sm font-medium leading-6 dark:text-gray-200 text-gray-900">
                                                            PublishedAt
                                                        </label>
                                                        <input value={bookState.publishedAt} onChange={(e) => { handleChange("publishedAt", e.target.value) }} id='book_publish_date' type="date" className=" focus:border-blue-500 focus:ring-blue-500 py-3 px-4 block w-full border-gray-200 rounded-md text-sm  bg-white dark:bg-gray-300  text:gray-900 dark:border-gray-700 dark:text-gray-900" placeholder="Title" />
                                                    </div>
                                                    <div className="col-span-full">
                                                        <label htmlFor="book_about" className="block text-sm font-medium leading-6 dark:text-gray-200 text-gray-900">
                                                            About
                                                        </label>

                                                        <textarea id="book_about" value={bookState.description} onChange={(e) => { handleChange("description", e.target.value) }} className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-300  text:gray-900 dark:border-gray-700 dark:text-gray-900" rows={3}></textarea>

                                                    </div>


                                                    <div className="col-span-full">
                                                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Cover photo
                                                        </label>
                                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                                            <div className="text-center">
                                                                <AiFillFileAdd className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                                    <label
                                                                        htmlFor="file-upload"
                                                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                                    >
                                                                        <span>Upload a file</span>
                                                                        <input onChange={(e: any) => { handleChange("cover", e.target.files[0]) }} id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                                    </label>
                                                                    <p className="pl-1">or drag and drop</p>
                                                                </div>
                                                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                        </div>

                                        <div className="mt-6 flex items-center justify-end gap-x-6">
                                            <button type="button" onClick={closeModal} className=" px-3 py-2 inline-flex justify-center items-center gap-2 rounded-md border-2 border-red-200 font-semibold text-red-500 hover:text-white hover:bg-red-500 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                                Close
                                            </button>
                                            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                Save
                                            </button>
                                        </div>

                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default BookItem