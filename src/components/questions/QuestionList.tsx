import React from 'react'
import QuestionItem from './QuestionItem';
import { useDispatch, useSelector } from 'react-redux'
 import { categorySelector } from '@/src/redux/slices/categoriesSlice';

const QuestionList = () => {
    const { search, parentCategoryId, categoryId } = useSelector(categorySelector);
    return (
        <div className='question_list_container hs-accordion-group   px-10 sm:px-36 pt-8  -center' data-hs-accordion-always-open>
            {
                faqs.filter((faq: any) => (categoryId === null || faq.categoryId === categoryId) && faq.question.toLowerCase().includes(search.toLowerCase())).map((faq, index) => (
                    <QuestionItem key={index} question={faq.question} answer={faq.answer} categoryId={faq.categoryId} />
                ))
            }
        </div>
    )
}

export default QuestionList

const faqs: any[] = [
    {
        question: "Henefi sual 1",
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