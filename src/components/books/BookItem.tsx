import moment from 'moment';
import React, { FC } from 'react'
import { AiOutlineClose, AiOutlineDownload } from 'react-icons/ai';

import { decodeBlurHash } from 'fast-blurhash';
interface Props {
    book: {
        id: number;
        title: string;
        description: string;
        publishedAt: string;
        author: string;
        cover: string;
    }
}



const BookItem: FC<Props> = ({ book }) => {
    const pixels = decodeBlurHash("LGEy}Bj[00f7t7fQR*ay00ay_May", 32, 32);
    return (
        <div className="book_item h-full  overflow-hidden dark:bg-gray-900  bg-white ">
            <div style={{height:"200px"}} data-hs-overlay={`#book_id_${book.id}`} className=" cursor-pointer flex justify-center  overflow-hidden  h-56">
                <img className="w-full  book_image"  src={book.cover} alt="" />
                
            </div>
            <div className="p-3 dark:text-gray-100">
                <div className=" h-12 mb-3">
                    <p className="text-lg text-center dark:text-gray-200 text-gray-800 font-semibold">{book.title}</p>
                </div>
                <hr />
                <div className="h-14 p-2 flex items-center justify-between mt-1 ">
                    <p className="text-sm ">{book.author}</p>
                    <p className="text-sm opacity-70">{moment(book.publishedAt).fromNow()}</p>
                </div>

            </div>
            <div
                id={`book_id_${book.id}`}
                className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
            >
                <div className="hs-overlay-open:mt-0 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-10 opacity-0 transition-all max-w-full w-full sm:hs-overlay-open:mt-20 sm:mt-0 sm:max-w-lg sm:mx-auto">
                    <div className="flex flex-col  bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                            <h3 className="font-bold text-gray-800 dark:text-white">{book.title}</h3>
                            <button
                                type="button"
                                className="hs-dropdown-toggle p-1 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800  "
                                data-hs-overlay={`#book_id_${book.id}`}>
                                <span className="sr-only">Close</span>
                                <AiOutlineClose className="text-white  first-letter: text-lg" />
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto   ">
                            {/* <p className='mb-3'>Kitab Haqqında açıqlama</p>
                            <hr/> */}
                            <p className="text-gray-800 mt-3 dark:text-gray-400">
                                {book.description}
                            </p>
                        </div>
                         <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                            <button type="button"
                                className="hs-dropdown-toggle px-3 py-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                                data-hs-overlay={`#book_id_${book.id}`}>
                            <AiOutlineDownload className="dark:text-white text-gray-800  first-letter: text-lg" />
                            </button>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookItem