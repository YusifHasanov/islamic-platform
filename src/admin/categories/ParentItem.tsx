import React, { FC, useState } from 'react'
import CrudService from '@/src/Libs/CrudService'
import { useDeleteCategoryMutation, useUpdateCategoryMutation } from '@/src/redux/slices/categoriesSlice';
interface ParentItemProps {
    id: number,
    name: string,
    parentId: number
}


const ParentItem: FC<Category> = ({ id, name, parentId, subCategories, articles }) => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateName, setUpdateName] = useState<string>(name);
    const crudService = CrudService.getInstance();
    const [updateCategory, result] = useUpdateCategoryMutation();
    const [remove, removeResult] = useDeleteCategoryMutation();
    const handleUpdate = () => {
        crudService.update(() => updateCategory({
            data: {
                name: updateName,
                parentId,
                subCategories,
            },
            id,
        }));
        setIsUpdate(false)
    }
    const handleExit = () => {
        if (window.confirm("Qeyd edilən dəyişikliklər saxlanılmayacaq. Çıxmaq istədiyinizə əminsiniz?")) {
            setIsUpdate(false)
        }
    }
    const handleRemove = () => {
        crudService.delete(() => remove(id));
        remove(id);
    }
    return (
        <>

            {
                isUpdate ? (
                    <div className="flex w-full justify-between">
                        <input value={updateName} onChange={(e) => { setUpdateName(e.target.value.trim()) }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <button onClick={handleUpdate} className="bg-green-500 text-white mx-2 px-4 py-1  rounded-md">Save</button>
                        <button onClick={handleExit} className="bg-red-500 text-white px-4  py-1 rounded-md">Exit</button>
                    </div>

                ) : (
                    <div className="flex w-full justify-between items-center">
                        <span className='ml-4 p-2 rounded-md text-lg  dark:bg-gray-800'>{name}</span>
                        
                        <div className="flex">
                            <button onClick={() => setIsUpdate(true)} className="bg-blue-500 mr-2 px-4 text-white py-1 rounded-md">Edit</button>
                            <button onClick={handleRemove} className="bg-red-500 text-white px-4  py-1 rounded-md">Remove</button>
                        </div>

                    </div>
                )
            }
        </>
    )
}

export default ParentItem