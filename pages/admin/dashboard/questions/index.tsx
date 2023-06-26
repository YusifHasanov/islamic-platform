import React, { FormEvent, useState } from 'react'
import Layout from '@/src/admin/Layout'
import Title from '@/src/admin/Title'
import QuestionItem from '@/src/admin/questions/QuestionItem'
import Header from '@/src/components/globals/Header'
import { useGetQuestionsQuery } from '@/src/redux/slices/questionSlice'
import QuestionList from '@/src/admin/questions/QuestionList'
import AddQuestion from '@/src/admin/questions/AddQuestion'



const Questions = () => {
  const [search, setSearch] = useState<string>("");
  const { data: questions, error } = useGetQuestionsQuery(undefined);




  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }
  return (
    <>
      <Header title="Admin Questions" description="Admin Questions" />
      <Layout>
        <Title name='Questions' />
        <div className="border-b border-gray-400 px-4 dark:border-gray-700">
          <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
            <button type="button" className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-white active" id="basic-tabs-item-1" data-hs-tab="#basic-tabs-1" aria-controls="basic-tabs-1" role="tab">
              Categoriyalar
            </button>
            <button type="button" className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-white" id="basic-tabs-item-2" data-hs-tab="#basic-tabs-2" aria-controls="basic-tabs-2" role="tab"  >

              Yeni Categoriya
            </button>
            <button type="button" className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-white" id="basic-tabs-item-3" data-hs-tab="#basic-tabs-3" aria-controls="basic-tabs-3" role="tab" >
              Tab 3
            </button>
          </nav>
        </div>
        <div className="mt-3 p-4">
          <div id="basic-tabs-1" role="tabpanel" aria-labelledby="basic-tabs-item-1">
            <QuestionList />
          </div>
          <div id="basic-tabs-2" className="hidden" role="tabpanel" aria-labelledby="basic-tabs-item-2">
            <AddQuestion />
          </div>
          <div id="basic-tabs-3" className="hidden" role="tabpanel" aria-labelledby="basic-tabs-item-3" >
          </div>
        </div>


      </Layout>
    </>
  )
}

export default Questions
const faqs: question[] = [
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
