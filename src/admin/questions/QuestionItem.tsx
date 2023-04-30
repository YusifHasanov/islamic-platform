import React, { FC } from 'react'
import Toast from '../Toast';

const QuestionItem: FC<question> = ({
    question,
    categoryId,
    answer
}) => {
    const toast = Toast.getInstance();
    const handleRemove = () => {
        if (window.confirm('Bu sualı silmək istədiynizə əminsiniz?')) {
            toast.success('Sual uğurla silindi')
            return;
        }
        toast.info('Sual silinmədi')
    }

    const showArticle = () => { }

    const openModal = () => { }

    return (
        <div className="p-3 border-b flex items-center justify-between  border-gray-400 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-400 transition-all ease-out">
            {question}
            <div className='flex items-center justify-center'>
                <button onClick={handleRemove} type="button" className="p-1 mx-1 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                    Remove
                </button>
                <button onClick={openModal} type="button" className="p-1 mx-1 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                    Edit
                </button>
            </div>
        </div>
    )
}

export default QuestionItem