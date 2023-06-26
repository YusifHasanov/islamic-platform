import React, { FormEvent, useState } from 'react'
import Layout from '@/src/admin/Layout'
import Title from '@/src/admin/Title'
import QuestionItem from '@/src/admin/questions/QuestionItem'
import Header from '@/src/components/globals/Header'
import { useGetQuestionsQuery } from '@/src/redux/slices/questionSlice'


const QuestionList = () => {

    const [search, setSearch] = useState<string>("");
    const { data: questions, error } = useGetQuestionsQuery(undefined);

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    return (
        <div className="flex flex-col">
            <div className="overflow-x-hidden ">
                <div className="p-1.5 w-full    inline-block align-middle">
                    <div className="border border-gray-400   rounded-lg divide-y   divide-gray-800 dark:border-gray-700 dark:divide-gray-700">
                        <div className="py-3  px-4">
                            <form onSubmit={submitHandler} className="flex items-center relative max-w-xs">

                                <input value={search} onChange={(e) => { setSearch(e.target.value) }} type="text" className="mr-2 bg-gray-300 border mb-2 outline-none  border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 sticky top-0 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ad" required />

                                <button type="submit" className="p-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                    Axtar
                                </button>
                            </form>
                        </div>
                        <div className="overflow-hidden ">
                            {
                                faqs.map((faq, index) => (
                                    <QuestionItem key={index} {...faq} />
                                ))
                            }
                        </div>
                        <div className="py-1 px-4 border-none" >
                            <nav className="flex items-center space-x-2">
                                <a className="text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md" href="#" >
                                    <span aria-hidden="true">«</span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="w-10 h-10 bg-blue-500 text-white p-4 inline-flex items-center text-sm font-medium rounded-full" href="#" aria-current="page" >
                                    1
                                </a>
                                <a className="w-10 h-10 text-gray-400 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full" href="#" >
                                    2
                                </a>
                                <a className="w-10 h-10 text-gray-400 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full" href="#" >
                                    3
                                </a>
                                <a className="text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md" href="#" >
                                    <span className="sr-only">Next</span>
                                    <span aria-hidden="true">»</span>
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionList
const faqs: any[] = [
    {
        question: "Henefi sual 1 Henefi sual 1 Henefi sual 1 Henefi sual 1 Henefi sual 1 Henefi sual 1 Henefi sual 1 Henefi sual 1 Henefi sual 1 Henefi sual 1 Henefi sual 1 Henefi sual 1 Henefi sual 1 Henefi sual 1  ",
        categoryId: 4,
        answer:
            "Henefi mezhebine gore subh namazinin ferzi 2 ruketdir.",
    }, {
        question: "Henefi sual 2",
        categoryId: 4,
        answer:
            "Henefi mezhebine gore subh namazinin ferzi 2 ruketdir.",
    },
    {
        question: "Henblei sual 1",
        categoryId: 6,
        answer:
            "Henefi mezhebine gore subh namazinin ferzi 2 ruketdir.",
    },
    {
        question: "Safei sual 1",
        categoryId: 5,
        answer:
            "Safei mezhebine gore subh namazinin ferzi 2 ruketdir.",
    },
    {
        question: "Maliki sual 1",
        categoryId: 7,
        answer:
            "Henefi mezhebine gore subh namazinin ferzi 2 ruketdir.",
    },

    {
        question: "Eseri sual 1",
        categoryId: 8,
        answer:
            "Henefi mezhebine gore subh namazinin ferzi 2 ruketdir.",
    },
];
