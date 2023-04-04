import React, { useEffect } from 'react'
import QuestionAccordion from '../globals/QuestionAccordion';
import { selectedCategoryAtom } from './CategoryList';
import { useAtom } from 'jotai';

const QuestionList = () => {
    const [selectedCategory] = useAtom(selectedCategoryAtom);
    const [filteredFaqs, setFilteredFaqs] = React.useState<question[]>(faqs);
    const filterQuestions = () =>
        selectedCategory === -1 ? setFilteredFaqs(faqs) : setFilteredFaqs(faqs.filter(faq => faq.categoryId === selectedCategory));

    useEffect(() => filterQuestions(), [selectedCategory])

    return (
        <div className='flex flex-col pl-5'>
            <h1 className="text-3xl text-center my-5 font-extrabold text-gray-900">Frequently Asked Questions</h1>
            <div className="hs-accordion-group" ata-hs-accordion-always-open>
                <div className="hs-accordion-group">
                    {filteredFaqs.length === 0 && selectedCategory !== -1
                        ? <div>Seçdiyiniz kateqoriyaya aid sual yoxdur</div>
                        :
                        filteredFaqs
                            .map((faq, index) => (
                                <QuestionAccordion key={`question_key${index}`} question={faq} index={index} />))
                    }
                </div>
            </div>
        </div>
    )
}

export default QuestionList
const faqs: question[] = [
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