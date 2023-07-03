import CrudService from '@/src/services/CrudService';
import { FC, useState } from 'react';

import FetchAPI from '@/src/components/globals/FetchAPI';
import { useDeleteCategoryMutation, useUpdateCategoryMutation } from '@/src/redux/slices/categoriesSlice';


 

const ChildItem: FC<Category> = ({ id, name, parentId, subCategories, articles }) => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateName, setUpdateName] = useState<string>(name);
    const [updateCategory, result] = useUpdateCategoryMutation();
    const [remove, removeResult] = useDeleteCategoryMutation();
    const crudService = CrudService.getInstance();
 


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

        <li className="  w-full items-center gap-x-3.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
            {
                isUpdate ? (
                    <div className="flex justify-between">
                        <input value={updateName} onChange={(e) => { setUpdateName(e.target.value.trim()) }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <button onClick={handleUpdate} className="bg-green-500 text-white mx-2 px-4 py-1  rounded-md">Save</button>
                        <button onClick={handleExit} className="bg-red-500 text-white px-4  py-1 rounded-md">Exit</button>
                    </div>

                ) : (
                    <div className="flex justify-between items-center">
                        <span className=''>{name}</span>
                        <div className="flex">
                            <button onClick={() => setIsUpdate(true)} className="bg-blue-500 mr-2 px-4 text-white py-1 rounded-md">Edit</button>
                            <button onClick={handleRemove} className="bg-red-500 text-white px-4  py-1 rounded-md">Remove</button>
                        </div>
                    </div>
                )
            }

        </li>


    )
}

export default ChildItem