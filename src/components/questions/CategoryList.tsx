import React from 'react'
 

const CategoryList = () => {
    return (
        <div className='question_categories  dark:bg-gray-950  flex w-max bg-white items-center mx-4  rounded-3xl  py-3 px-6'>
            <input type="text" className="bg-gray-50 border   outline-none  border-gray-400 text-gray-900 dark:text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 sticky top-0 block  p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Axtar" />
            <div className='flex px-2 justify-center items-center overflow-auto categories_container'  >
                {
                    categories.filter(category => category.parentId === 0).map((parent) => (
                        <div key={parent.id} className="hs-dropdown  relative inline-flex">
                            <div id="hs-dropdown-with-icons" key={parent.id} className="flex hs-dropdown-toggle items-center justify-between p-2.5 rounded-md hover:bg-blue-100 bg-blue-50 dark:bg-gray-200 mr-1 cursor-pointer">
                                <div className="flex items-center">
                                    <p className="text-sm text-gray-800      font-semibold ml-2">{parent.name}</p>
                                </div> 
                            </div>
                            <div 
                                className="hs-dropdown-menu border border-gray-100 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 divide-y divide-gray-200 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700"
                                aria-labelledby="hs-dropdown-with-icons"
                            >

                                <div className="py-2   first:pt-0 last:pb-0">
                                    {categories.filter(category => category.parentId === parent.id)
                                        .map((child) => (
                                            <a
                                            key={child.id}
                                                className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-blue-100 mb-1 bg-blue-50 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                                href="#"
                                            >
                                                {child.name}
                                            </a>
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