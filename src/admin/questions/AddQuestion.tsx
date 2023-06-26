import React from 'react'

const AddQuestion = () => {
    return (
        <form>
            <input type="text" className="mr-2 bg-gray-300 border mb-2 outline-none  border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 sticky top-0 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sual" required />
        </form>
    )
}

export default AddQuestion