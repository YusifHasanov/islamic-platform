import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedCategoryId, setSearch, selectQuestionCategory,setParentCategoryId } from "@/src/redux/slices/questionSlice";

const CategoryList = () => {
    const dispatch = useDispatch();
    const { selectedCategoryId ,parentCategoryId} = useSelector(selectQuestionCategory);

    return (
        <div className='question_categories  dark:bg-gray-950  flex w-max bg-white items-center mx-4  rounded-3xl  py-3 px-6'>
            <input
                onChange={(e) => dispatch(setSearch(e.target.value.trim()))}
                type="text" className="bg-gray-50 border  dark:bg-gray-700 dark:border-gray-600   outline-none  border-gray-400 text-gray-900 dark:text-gray-100 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 sticky top-0 block  p-2.5  dark:placeholder-gray-400    dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Axtar" />
            <div className='flex px-2 justify-center items-center overflow-auto categories_container'  >
                {
                    categories.filter((category: any) => category.parentId === 0).map((parent: any) => (
                        <div key={parent.id} className="hs-dropdown  relative inline-flex">
                            <div id="hs-dropdown-with-icons" key={parent.id}
                             className={`flex ml-1 hs-dropdown-toggle items-center justify-between p-2.5 rounded-md hover:bg-blue-100 bg-blue-50 dark:bg-gray-500 hover:dark:bg-gray-600 mr-1 cursor-pointer
                             ${parentCategoryId === parent.id ? 'bg-blue-200 hover:bg-blue-300 dark:bg-gray-600 hover:dark:bg-gray-700' : ''}
                             `}>
                                <div className="flex items-center">
                                    <p className="text-sm text-gray-800  dark:text-gray-300     font-semibold  ">{parent.name}</p>
                                </div>
                            </div>
                            <div className="hs-dropdown-menu border border-gray-100 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 divide-y divide-gray-200 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700"
                                aria-labelledby="hs-dropdown-with-icons" >
                                <div className="py-2   first:pt-0 last:pb-0">
                                    {categories.filter((category: any) => category.parentId === parent.id)
                                        .map((child: any) => (
                                            <span

                                                key={child.id}
                                                className={`flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-blue-100 mb-1 bg-blue-50 dark:bg-gray-500 dark:text-gray-200 focus:ring-2 focus:ring-blue-500   dark:hover:bg-gray-700 dark:hover:text-gray-300
                                                ${selectedCategoryId === child.id ? "bg-blue-200 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-gray-300 hover:bg-blue-300 " : ""}
                                                `}
                                                onClick={() => {
                                                    if (selectedCategoryId === child.id || selectedCategoryId === parent.id) {
                                                        dispatch(setSelectedCategoryId(null))
                                                        dispatch(setParentCategoryId(null))
                                                    }
                                                    else {
                                                        dispatch(setSelectedCategoryId(child.id))
                                                        dispatch(setParentCategoryId(parent.id))
                                                    } 
                                                }}
                                            >
                                                {child.name}
                                            </span>
                                        )
                                        )}
                                </div>
                            </div>

                        </div>

                    )
                    )
                }

            </div>
        </div>
    )
}

export default CategoryList


const categories = [
    {
        id: 1,
        name: "Fiqh",
        parentId: 0,
    },
    {
        id: 2,
        name: "Hadis",
        parentId: 0,
    },
    {
        id: 3,
        name: "Eqide",
        parentId: 0,
    },
    {
        id: 4,
        name: "Henefi",
        parentId: 1,
    },
    {
        id: 5,
        name: "Safei",
        parentId: 1,
    },
    {
        id: 6,
        name: "Henbeli",
        parentId: 1,
    },
    {
        id: 7,
        name: "Maliki",
        parentId: 1,
    },
    {
        id: 8,
        name: "Eseri",
        parentId: 3,
    },
    {
        id: 9,
        name: "Eşeri",
        parentId: 3,
    },
    {
        id: 10,
        name: "Matrudi",
        parentId: 3,
    }
]