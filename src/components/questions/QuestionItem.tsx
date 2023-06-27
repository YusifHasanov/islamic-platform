import React, { FC } from 'react'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
interface Props {
    question: string,
    answer: string,
    categoryId: number
}

const QuestionItem:FC<Props> = ({
    question,
    answer,
    categoryId

}) => {
    return (
        <div className="hs-accordion question_item dark:bg-gray-900 bg-white mb-5 rounded-xl px-3" id="hs-basic-heading-two">
            <button
                className="hs-accordion-toggle  p-2 flex items-center justify-between w-full hs-accordion-active:text-blue-500   tive:text-blue-500 dark:text-gray-200  " aria-controls="hs-basic-collapse-two"  >
                <span className=' text-start  text-xs sm:text-sm  md:text-md lg:text-lg'>
                  {question}
                </span>
                <IoIosArrowForward className="hs-accordion-active:hidden text-3xl   hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block   text-gray-600 group-hover:text-gray-500 dark:text-gray-400" />
                <IoIosArrowDown className="hs-accordion-active:block text-3xl hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden   text-gray-600 group-hover:text-gray-500 dark:text-gray-400" />
            </button>
            <div
                id="hs-basic-collapse-two"
                className="hs-accordion-content  hidden w-full overflow-hidden transition-[height] duration-300"
                aria-labelledby="hs-basic-heading-two"
            >
                <p className="text-gray-800 text-xs sm:text-sm  md:text-md lg:text-lg dark:text-gray-200 p-2">
                    {answer}
                </p>
            </div>
        </div>
    )
}

export default QuestionItem