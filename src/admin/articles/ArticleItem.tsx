import React, { FC, useEffect } from 'react'
import dynamic from 'next/dynamic'
import sanitizeHtml from 'sanitize-html';
import moment from 'moment'
import Toast from '../../services/Toast';
import 'react-quill/dist/quill.snow.css'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useTheme } from 'next-themes';
import { AiFillEdit, AiFillFileAdd } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Editor from '../Editor';
import { Value } from 'react-quill';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import { FaMoon, FaSun } from 'react-icons/fa';
import ToggleTheme from '@/src/components/common/ToggleTheme';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})
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
const authors = [
    {
        id: 1,
        name: "Firudin Babaoglu",
        image: "sekildsa",
        articles: [],
        books: [
            1
        ]
    },
    {
        id: 2,
        name: "Ramazan Heyderov",
        image: "sekildsa",
        articles: [],
        books: [
            1
        ]
    },
    {
        id: 3,
        name: "Firudin Babaoglu",
        image: "sekildsa",
        articles: [],
        books: [
            1
        ]
    },
    {
        id: 4,
        name: "Ramazan Heyderov",
        image: "sekildsa",
        articles: [],
        books: [
            1
        ]
    },
    {
        id: 5,
        name: "Firudin Babaoglu",
        image: "sekildsa",
        articles: [],
        books: [
            1
        ]
    },
]

const ArticleItem: FC<Article> = (props) => {

    const router = useRouter()
    const toast = Toast.getInstance();
    const { theme, setTheme } = useTheme()
    let [isOpen, setIsOpen] = useState(false)
    const [articleState, setArticleState] = useState({
        title: props.title,
        content: props.content,
        publishedAt: props.publishedAt,
        author: props.author.id,
    });
    const [modules, setModules] = useState<any>({

        toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction

            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],

            ["clean"], // remove formatting button

            ["link", "image", "video"],
        ],
    });

    useEffect(() => {
        console.log(articleState.content)
    }, [articleState.content])




    const handleChange = (key: string, value: string) =>
        setArticleState({
            ...articleState,
            [key]: value
        })


    const handleRemove = () => {
        if (window.confirm('Bu məqaləni silmək istədiynizə əminsiniz?')) {
            toast.success('Məqalə uğurla silindi')
            return;
        }
        toast.info('Məqalə silinmədi')
    }

    const showArticle = () => {
        if (window.confirm('Məqalə səhifəsini açmaq istədiyinizə əminsiniz?')) {
            router.push(`/articles/${props.id}`)
            return;
        }
    }
    const closeModal = () => {
        if (!window.confirm("Edilən dəyişikliklər yadda saxlanmayacaq , əminsinizmi?")) {
            return
        }
        setIsOpen(false)

    }

    const openModal = () => {
        setIsOpen(true)
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (window.confirm("Dəyişiklikləri yadda saxlamaq istəyirsinizmi?")) {
            toast.success("Məqalə yeniləndi")
            setIsOpen(false)
            return;
        }
    }

    return (

        <article className="p-4 article_item bg-gray-100 rounded-lg border border-gray-200 shadow-md dark:bg-gray-700 dark:border-gray-700">
            <div className="flex justify-between items-center mb-3 text-gray-500">
                <div className="flex items-center space-x-4">
                    <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                    <span className="font-medium dark:text-gray-200">
                        {props.author.name}
                    </span>
                </div>
                <span className="text-sm">{moment(props.publishedAt).fromNow()}</span>
            </div>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-200"><a href="#">{props.title}</a></h2>
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(articleState.content) }} className="article_text mb-5 font-light text-gray-500 dark:text-gray-400" />
            <div className="flex justify-between items-center">

                <button onClick={handleRemove} type="button" className="p-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                    Remove
                </button>
                <button onClick={showArticle} type="button" className="p-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                    Show
                </button>
                <button onClick={openModal} type="button" className="p-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                    Edit
                </button>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed  inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full  max-w-3xl  transform overflow-hidden rounded-2xl bg-gra-200 dark:bg-gray-900 bg-gray-300 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h4"
                                        className="text-lg flex  justify-between mb-3 font-medium leading-6 dark:text-gray-200 text-gray-900">
                                        <p> Məqalə Məlumatlarını Dəyiş</p>
                                        <ToggleTheme />


                                        {/* <button
                                            onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark') }}
                                            type="button"
                                            className="rounded-full bg-gray-300 dark:bg-gray-700 p-1 text-gray-800 dark:text-gray-300 hover:text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800"
                                        >

                                            <span className='flex items-center justify-center p-1   '>
                                                {
                                                    theme !== "dark" ? <BsSunFill /> : <BsMoonFill />
                                                }
                                            </span>
                                        </button> */}
                                    </Dialog.Title>

                                    <form action="" onSubmit={submitHandler} >

                                        <div className="space-y-12">
                                            <div className="border-b border-gray-900/10 pb-12">
                                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="book_title" className="block text-sm font-medium leading-6 dark:text-gray-200 text-gray-900">
                                                            Title
                                                        </label>
                                                        <input value={articleState.title} onChange={(e) => { handleChange("title", e.target.value) }} id='book_title' type="text" className=" focus:border-blue-500 focus:ring-blue-500 py-3 px-4 block w-full dark:bg-gray-300  rounded-md text-sm  bg-white dark:bg-gray-200 text:gray-900 dark:border-gray-700 dark:text-gray-900" placeholder="Title" />
                                                    </div>
                                                    <div className="col-span-full">
                                                        <label htmlFor="book_author" className="block text-sm font-medium leading-6 dark:text-gray-200 text-gray-900">
                                                            Müəllif
                                                        </label>
                                                        <select value={articleState.author} onChange={(e) => { handleChange("author", e.target.value.toString()) }} id="book_author" className="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-300 text:gray-900 dark:border-gray-700 dark:text-gray-900">
                                                            {
                                                                authors.map((author) => (
                                                                    <option key={author.name} value={author.id}>{author.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="book_publish_date" className="block text-sm font-medium leading-6 dark:text-gray-200 text-gray-900">
                                                            PublishedAt
                                                        </label>
                                                        <input value={articleState.publishedAt} onChange={(e) => { handleChange("publishedAt", e.target.value) }} id='book_publish_date' type="date" className=" focus:border-blue-500 focus:ring-blue-500 py-3 px-4 block w-full border-gray-200 rounded-md text-sm  bg-white dark:bg-gray-300  text:gray-900 dark:border-gray-700 dark:text-gray-900" placeholder="Title" />
                                                    </div>
                                                    <div className="col-span-full">
                                                        <label htmlFor="book_about" className="block text-sm font-medium leading-6 dark:text-gray-200 text-gray-900">
                                                            Content
                                                        </label>
                                                        <QuillNoSSRWrapper value={articleState.content as Value} modules={modules} onChange={(e) => { handleChange("content", e) }} />
                                                    </div>


                                                    <div className="hidden col-span-full">
                                                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Cover photo
                                                        </label>
                                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                                            <div className="text-center">
                                                                <AiFillFileAdd className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                                    <label
                                                                        htmlFor="file-upload"
                                                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                                    >
                                                                        <span>Upload a file</span>
                                                                        <input onChange={(e: any) => { handleChange("cover", e.target.files[0]) }} id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                                    </label>
                                                                    <p className="pl-1">or drag and drop</p>
                                                                </div>
                                                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                        </div>

                                        <div className="mt-6 flex items-center justify-end gap-x-6">
                                            <button type="button" onClick={closeModal} className=" px-3 py-2 inline-flex justify-center items-center gap-2 rounded-md border-2 border-red-200 font-semibold text-red-500 hover:text-white hover:bg-red-500 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                                Close
                                            </button>
                                            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                Save
                                            </button>
                                        </div>

                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </article>
    )
}

export default ArticleItem