import React from 'react'

const Title = ({name}:{name:string}) => {
    return (
            <h5 className='bg-green-900 single  text-center border border-green-700 text-gray-100 text-2xl rounded-lg mb-4 font-medium mr-2 px-3 py-2 mt-0  dark:bg-green-300 dark:text-green-900'>{name}</h5>
        
    )
}

export default Title