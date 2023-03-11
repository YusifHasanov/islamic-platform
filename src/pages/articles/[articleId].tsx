import { useRouter } from 'next/router';
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
const Index = () => {

    const router = useRouter();

    return (
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-800">
            <button
                onClick={() => router.push(`/`)}
                type="button"
                className="border absolute left-14 flex items-center justify-center dark:border-gray-700 dark:bg-gray-700 hover:text-gray-200 dark:text-gray-100 rounded-md px-2 py-1 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline"
            >
                <IoIosArrowBack className="text-md" />
                Geri
            </button>

            <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                    <header className="mb-4 lg:mb-6 not-format">
                        <address className="flex items-center mb-6 not-italic">
                            <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                <img className="mr-4 w-16 h-16 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Jese Leos" />
                                <div>
                                    <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">Jese Leos</a>
                                    <p className="text-base font-light text-gray-500 dark:text-gray-300">Graphic Designer, educator & CEO Flowbite</p>
                                    <p className="text-base font-light text-gray-500 dark:text-gray-300"><time title="February 8th, 2022">Feb. 8, 2022</time></p>
                                </div>
                            </div>
                        </address>
                        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">Best practices for successful prototypes</h1>
                    </header>
                    <div className="mb-8 dark:text-gray-200 prose prose-sm sm:prose lg:prose-lg xl:prose-xl not-format">
                        <p className="lead">Flowbite is an open-source library of UI components built with the utility-first
                            classes from Tailwind CSS. It also includes interactive elements such as dropdowns, modals,
                            datepickers.</p>
                        <p>Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way,
                            you can think things through before committing to an actual design project.</p>
                        <p>But then I found a <a href="https://flowbite.com">component library based on Tailwind CSS called
                            Flowbite</a>. It comes with the most commonly used UI components, such as buttons, navigation
                            bars, cards, form elements, and more which are conveniently built with the utility classes from
                            Tailwind CSS.</p>
                        <figure>
                            <figcaption>Digital art by Anonymous</figcaption>
                        </figure>
                        <h2>Getting started with Flowbite</h2>
                        <p>First of all you need to understand how Flowbite works. This library is not another framework.
                            Rather, it is a set of components based on Tailwind CSS that you can just copy-paste from the
                            documentation.</p>
                        <p>It also includes a JavaScript file that enables interactive components, such as modals, dropdowns,
                            and datepickers which you can optionally include into your project via CDN or NPM.</p>
                        <p>You can check out the <a href="https://flowbite.com/docs/getting-started/quickstart/">quickstart
                            guide</a> to explore the elements by including the CDN files into your project. But if you want
                            to build a project with Flowbite I recommend you to follow the build tools steps so that you can
                            purge and minify the generated CSS.</p>
                        <p>You'll also receive a lot of useful application UI, marketing UI, and e-commerce pages that can help
                            you get started with your projects even faster. You can check out this <a
                                href="https://flowbite.com/docs/components/tables/">comparison table</a> to better understand
                            the differences between the open-source and pro version of Flowbite.</p>
                        <h2>When does design come in handy?</h2>
                        <p>While it might seem like extra work at a first glance, here are some key moments in which prototyping
                            will come in handy:</p>
                    </div>
                </article>
            </div>
        </main>
    )
}

export default Index;   