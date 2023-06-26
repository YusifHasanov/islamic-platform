import { FC } from 'react';
import ChildItem from './ChildItem';
import { useGetCategoriesQuery } from '@/src/redux/slices/categoriesSlice';
import ParentItem from './ParentItem';



interface Props {
}
const CategoryList: FC<Props> = ({ }) => {

    const { data: categories, isLoading, isError, error } = useGetCategoriesQuery(undefined, { refetchOnMountOrArgChange: true })

    if (isLoading) return <div>Loading...</div>

    return (
        <>
            <ul className=" flex flex-col">
                {
                    categories?.filter(c => c.parentId === 0).map((category, index) => (
                        <li className="flex flex-col  items-start gap-x-3.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-gray-700 dark:border-gray-900 dark:text-white">
                            <ParentItem key={category.id} {...category} />
                            <ul className=" w-full mt-2 ml-2 flex flex-col">
                                {
                                    categories?.filter(c => c.parentId === category.id).sort((a, b) => a.id - b.id).map((category, index) => (
                                        <ChildItem key={category.id}  {...category} />
                                    ))
                                }
                            </ul>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default CategoryList

