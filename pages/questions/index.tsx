import React, { FC, useState } from 'react'
import Head from 'next/head'
import { Disclosure, Transition } from '@headlessui/react'
import { AiOutlineUpload } from 'react-icons/ai'
const Index = () => {

  const faqs = [
    {
      question: "What is React?",
      answer:
        "React is a JavaScript library for building user interfaces. It was developed by Facebook and is now maintained by Facebook and a community of individual developers and companies.",
    },
    {
      question: "What is Headless UI?",
      answer:
        "Headless UI is a set of completely unstyled, fully accessible UI components for React, Vue, and other popular frameworks. They provide the building blocks for you to create your own custom-styled components.",
    },
    {
      question: "How do I install React and Headless UI?",
      answer:
        "You can install React and Headless UI using npm or yarn. For example, to install React and Headless UI for a new project, you can run the following commands: \n\nnpm install react \n\nnpm install @headlessui/react",
    },
  ];

  return (
    <>

      <Head>  <title>Sual Cavab</title> </Head>
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h1>
        <div className="mt-6">
          {faqs.map((faq) => (
            <>
              <FAQ key={faq.question} question={faq.question} answer={faq.answer} />
              <Item key={faq.question} question={faq.question} answer={faq.answer} />
            </>
          ))}
        </div>
      </div>
    </>
  );
}



export default Index

interface FAQProps {
  question: string;
  answer: string;
}

const FAQ: FC<FAQProps> = ({ question, answer }) => {


  return (
    <>
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


    </>
  )

}

const Item: FC<FAQProps> = ({ question, answer }) => {
  return (
    <>
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
              enter="transition ease-out duration-300 transform"
              enterFrom="scale-0 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="transition ease-in duration-300 transform"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-0 opacity-0"
            >
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                {answer}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </>
  )
}