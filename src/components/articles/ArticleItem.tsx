import React, { FC } from 'react'
import moment from 'moment';
import { useRouter } from 'next/router'
import sanitizeHtml from 'sanitize-html';
import Categories from '../common/Categories';
interface Article {
    id: number;
    publishedAt: string;
    title: string;
    content: string;
    author: {
        id: number;
        name: string;
        image: string;
    };
    categories: {
        id: number;
        name: string;
    }[];
}

const ArticleItem: FC<Article> = (props) => {
    const router = useRouter();
    return (
       

        <article className="p-4 article_item bg-gray-100 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-800">
            <div className="flex justify-between items-center mb-3 text-gray-500">
                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                    <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
                    Məqalə
                </span>
                <span className="text-sm">{moment(props.publishedAt).fromNow()}</span>
            </div>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-200"><a href="#">{props.title}</a></h2>
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.content) }} className="article_text mb-5 font-light text-gray-500 dark:text-gray-400" />
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                    <span className="font-medium dark:text-gray-200">
                        {props.author.name}
                    </span>
                </div>
                <button
                    onClick={() => router.push(`/articles/dsagdiga`)}
                    type="button"
                    className="border  dark:border-gray-700 dark:bg-gray-700 hover:text-gray-200 dark:text-gray-100 rounded-md px-2 py-1 m-2 transition duration-500 ease select-none hover:bg-gray-800 dark:hover:bg-gray-300 dark:hover:text-gray-900 focus:outline-none focus:shadow-outline">
                    Davamı...
                </button>
            </div>
        </article>
 
    )
}

export default ArticleItem