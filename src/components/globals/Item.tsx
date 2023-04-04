import { Disclosure, Transition } from '@headlessui/react';
import React, { FC } from 'react'
import { AiOutlineUpload } from 'react-icons/ai';

interface Props {
    question: string;
    answer: string;
  }
const Item:FC<Props> = ({ question, answer }) => {
  return (
    <Disclosure>
    {({ open }) => (
      <>
        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
          <span>{question}</span>
          <AiOutlineUpload
            className={`${open ? 'transform rotate-180' : ''
              } w-5 h-5 text-purple-500`}
          />
        </Disclosure.Button>
        <Transition
          show={open}
          enter="transition ease-out duration-300 transform origin-top"
          enterFrom="opacity-0 scale-y-0"
          enterTo="opacity-100 scale-y-100"
          leave="transition ease-in duration-300 transform origin-top"
          leaveFrom="opacity-100 scale-y-100"
          leaveTo="opacity-0 scale-y-0"
        >
          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
            {answer}
          </Disclosure.Panel>
        </Transition>
      </>
    )}
  </Disclosure>
  )
}

export default Item