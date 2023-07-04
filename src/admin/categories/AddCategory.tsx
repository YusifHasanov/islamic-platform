
import crudService from '@/src/services/CrudService';
 
import { useCreateCategoryMutation, useGetCategoriesQuery } from '@/src/redux/slices/categoriesSlice';

import React, { FC, useEffect, useState } from 'react';



const AddCategory: FC<any> = ({ }) => {

    const { data: categories, isLoading } = useGetCategoriesQuery(undefined, { refetchOnMountOrArgChange: true })
    const [createCategory, result] = useCreateCategoryMutation();
 
    const [category, setCategory] = useState({ name: "", parentId: 0 });
    const isDisabled = category.name.length < 3;


    const handleChange = (key: string, value: string) => setCategory({ ...category, [key]: value })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        crudService.add(() => createCategory({
            name: category.name,
            parentId: category.parentId,
            subCategories: [],
        }));
    }
    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <label htmlFor="categoryName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">Categoriya Adı</label>
                <input value={category.name} onChange={(e) => { handleChange("name", e.target.value) }} type="text" id="categoryName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ad" required />
            </div>
            <div className="mb-6">
                <label htmlFor="categoryParent">Ana Categoriyası</label>
                <select
                    id="categoryParent"
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    onChange={(e) => { handleChange("parentId", e.target.value) }} name=""   >
                    <option value="0">Yoxdu</option>
                    {
                        categories?.filter(item => item.parentId === 0).map((category) => (
                            <option key={category.name} value={category.id}>{category.name}</option>
                        ))
                    }
                </select>
            </div>
            <button disabled={isDisabled} type="submit" className={`py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 ${isDisabled ? "cursor-not-allowed" : ""}`}>
                Elave Et
            </button>
        </form>

    )
}

export default AddCategory


