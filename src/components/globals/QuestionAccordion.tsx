import React, { FC } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

interface Props {
  question: question,
  index: number
}

const Accordion: FC<Props> = ({ question, index }) => {

  return (
    <div>
      <div className="hs-accordion max-w-prose ml-auto mr-auto  mb-3" id={`accordion_${index}`}>
        <button className="hs-accordion-toggle dark:bg-gray-300 rounded-md hs-accordion-active:text-green-600 group w-full flex justify-between  px-4 items-center   gap-x-3  font-semibold  dark:text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-gray-500 text-gray-200 dark:hover:text-gray-400" aria-controls={`accordion_${index}`}>
          <span className="text-3xl ">
            {question.question}
          </span>
          <IoIosArrowDown className={`hs-accordion-active:transform hs-accordion-active:rotate-180   w-5 h-5 text-purple-500 transition-all ease-out  `} />
        </button>
        <div id="hs-basic-collapse-two" className="text-center hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-heading-two">
          <p className="text-gray-800 p-5 dark:text-gray-200">
            {question.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Accordion