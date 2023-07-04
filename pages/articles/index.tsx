import React, { FC } from 'react'
import Head from 'next/head'
import ArticleItem from '@/src/components/articles/ArticleItem'
import Footer from '@/src/components/footer/Footer'
import Header from '@/src/components/common/Header'
import FetchAPI from '@/src/services/FetchAPI'
import { GetStaticProps } from 'next'
const articless: any[] = [
  {
    id: 1,
    publishedAt: "2021-01-01",
    title: 'How to quickly deploy a static website',
    content: `<div class="mb-8 dark:text-gray-200 prose prose-sm sm:prose lg:prose-lg xl:prose-xl not-format"><p class="lead">Flowbite is an open-source library of UI components built with the utility-first classes from Tailwind CSS. It also includes interactive elements such as dropdowns, modals, datepickers.</p><p>Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way, you can think things through before committing to an actual design project.</p><p>But then I found a <a href="https://flowbite.com">component library based on Tailwind CSS called Flowbite</a>. It comes with the most commonly used UI components, such as buttons, navigation bars, cards, form elements, and more which are conveniently built with the utility classes from Tailwind CSS.</p><figure><figcaption>Digital art by Anonymous</figcaption></figure><h2>Getting started with Flowbite</h2><p>First of all you need to understand how Flowbite works. This library is not another framework. Rather, it is a set of components based on Tailwind CSS that you can just copy-paste from the documentation.</p><p>It also includes a JavaScript file that enables interactive components, such as modals, dropdowns, and datepickers which you can optionally include into your project via CDN or NPM.</p><p>You can check out the <a href="https://flowbite.com/docs/getting-started/quickstart/">quickstart guide</a> to explore the elements by including the CDN files into your project. But if you want to build a project with Flowbite I recommend you to follow the build tools steps so that you can purge and minify the generated CSS.</p><p>You'll also receive a lot of useful application UI, marketing UI, and e-commerce pages that can help you get started with your projects even faster. You can check out this <a href="https://flowbite.com/docs/components/tables/">comparison table</a> to better understand the differences between the open-source and pro version of Flowbite.</p><h2>When does design come in handy?</h2><p>While it might seem like extra work at a first glance, here are some key moments in which prototyping will come in handy:</p></div>`,
    author: {
      id: 1,
      name: 'Jese Leos',
      image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png'
    },
    categories: [
      {
        id: 1,
        name: 'Web Development',
      },
      {
        id: 2,
        name: 'JavaScript',
      }
    ]
  },
  {
    id: 2,
    publishedAt: "2021-01-01",
    title: 'How to quickly deploy a static website',
    content: `<div class="mb-8 dark:text-gray-200 prose prose-sm sm:prose lg:prose-lg xl:prose-xl not-format"><p class="lead">Flowbite is an open-source library of UI components built with the utility-first classes from Tailwind CSS. It also includes interactive elements such as dropdowns, modals, datepickers.</p><p>Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way, you can think things through before committing to an actual design project.</p><p>But then I found a <a href="https://flowbite.com">component library based on Tailwind CSS called Flowbite</a>. It comes with the most commonly used UI components, such as buttons, navigation bars, cards, form elements, and more which are conveniently built with the utility classes from Tailwind CSS.</p><figure><figcaption>Digital art by Anonymous</figcaption></figure><h2>Getting started with Flowbite</h2><p>First of all you need to understand how Flowbite works. This library is not another framework. Rather, it is a set of components based on Tailwind CSS that you can just copy-paste from the documentation.</p><p>It also includes a JavaScript file that enables interactive components, such as modals, dropdowns, and datepickers which you can optionally include into your project via CDN or NPM.</p><p>You can check out the <a href="https://flowbite.com/docs/getting-started/quickstart/">quickstart guide</a> to explore the elements by including the CDN files into your project. But if you want to build a project with Flowbite I recommend you to follow the build tools steps so that you can purge and minify the generated CSS.</p><p>You'll also receive a lot of useful application UI, marketing UI, and e-commerce pages that can help you get started with your projects even faster. You can check out this <a href="https://flowbite.com/docs/components/tables/">comparison table</a> to better understand the differences between the open-source and pro version of Flowbite.</p><h2>When does design come in handy?</h2><p>While it might seem like extra work at a first glance, here are some key moments in which prototyping will come in handy:</p></div>`,
    author: {
      id: 1,
      name: 'Jese Leos',
      image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png'
    },
    categories: [
      {
        id: 1,
        name: 'Web Development',
      },
      {
        id: 2,
        name: 'JavaScript',
      }]
  },
  {
    id: 3,
    publishedAt: "2021-01-01",
    title: 'How to quickly deploy a static website',
    content: `<div class="mb-8 dark:text-gray-200 prose prose-sm sm:prose lg:prose-lg xl:prose-xl not-format"><p class="lead">Flowbite is an open-source library of UI components built with the utility-first classes from Tailwind CSS. It also includes interactive elements such as dropdowns, modals, datepickers.</p><p>Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way, you can think things through before committing to an actual design project.</p><p>But then I found a <a href="https://flowbite.com">component library based on Tailwind CSS called Flowbite</a>. It comes with the most commonly used UI components, such as buttons, navigation bars, cards, form elements, and more which are conveniently built with the utility classes from Tailwind CSS.</p><figure><figcaption>Digital art by Anonymous</figcaption></figure><h2>Getting started with Flowbite</h2><p>First of all you need to understand how Flowbite works. This library is not another framework. Rather, it is a set of components based on Tailwind CSS that you can just copy-paste from the documentation.</p><p>It also includes a JavaScript file that enables interactive components, such as modals, dropdowns, and datepickers which you can optionally include into your project via CDN or NPM.</p><p>You can check out the <a href="https://flowbite.com/docs/getting-started/quickstart/">quickstart guide</a> to explore the elements by including the CDN files into your project. But if you want to build a project with Flowbite I recommend you to follow the build tools steps so that you can purge and minify the generated CSS.</p><p>You'll also receive a lot of useful application UI, marketing UI, and e-commerce pages that can help you get started with your projects even faster. You can check out this <a href="https://flowbite.com/docs/components/tables/">comparison table</a> to better understand the differences between the open-source and pro version of Flowbite.</p><h2>When does design come in handy?</h2><p>While it might seem like extra work at a first glance, here are some key moments in which prototyping will come in handy:</p></div>`,
    author: {
      id: 1,
      name: 'Jese Leos',
      image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png'
    },
    categories: [
      {
        id: 1,
        name: 'Web Development',
      },
      {
        id: 2,
        name: 'JavaScript',
      }]
  },
  {
    id: 4,
    publishedAt: "2021-01-01",
    title: 'How to quickly deploy a static website',
    content: `<div class="mb-8 dark:text-gray-200 prose prose-sm sm:prose lg:prose-lg xl:prose-xl not-format"><p class="lead">Flowbite is an open-source library of UI components built with the utility-first classes from Tailwind CSS. It also includes interactive elements such as dropdowns, modals, datepickers.</p><p>Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way, you can think things through before committing to an actual design project.</p><p>But then I found a <a href="https://flowbite.com">component library based on Tailwind CSS called Flowbite</a>. It comes with the most commonly used UI components, such as buttons, navigation bars, cards, form elements, and more which are conveniently built with the utility classes from Tailwind CSS.</p><figure><figcaption>Digital art by Anonymous</figcaption></figure><h2>Getting started with Flowbite</h2><p>First of all you need to understand how Flowbite works. This library is not another framework. Rather, it is a set of components based on Tailwind CSS that you can just copy-paste from the documentation.</p><p>It also includes a JavaScript file that enables interactive components, such as modals, dropdowns, and datepickers which you can optionally include into your project via CDN or NPM.</p><p>You can check out the <a href="https://flowbite.com/docs/getting-started/quickstart/">quickstart guide</a> to explore the elements by including the CDN files into your project. But if you want to build a project with Flowbite I recommend you to follow the build tools steps so that you can purge and minify the generated CSS.</p><p>You'll also receive a lot of useful application UI, marketing UI, and e-commerce pages that can help you get started with your projects even faster. You can check out this <a href="https://flowbite.com/docs/components/tables/">comparison table</a> to better understand the differences between the open-source and pro version of Flowbite.</p><h2>When does design come in handy?</h2><p>While it might seem like extra work at a first glance, here are some key moments in which prototyping will come in handy:</p></div>`,
    author: {
      id: 1,
      name: 'Jese Leos',
      image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png'
    },
    categories: [
      {
        id: 1,
        name: 'Web Development',
      },
      {
        id: 2,
        name: 'JavaScript',
      }]
  },
  {
    id: 5,
    publishedAt: "2021-01-01",
    title: 'How to quickly deploy a static website',
    content: `<div class="mb-8 dark:text-gray-200 prose prose-sm sm:prose lg:prose-lg xl:prose-xl not-format"><p class="lead">Flowbite is an open-source library of UI components built with the utility-first classes from Tailwind CSS. It also includes interactive elements such as dropdowns, modals, datepickers.</p><p>Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way, you can think things through before committing to an actual design project.</p><p>But then I found a <a href="https://flowbite.com">component library based on Tailwind CSS called Flowbite</a>. It comes with the most commonly used UI components, such as buttons, navigation bars, cards, form elements, and more which are conveniently built with the utility classes from Tailwind CSS.</p><figure><figcaption>Digital art by Anonymous</figcaption></figure><h2>Getting started with Flowbite</h2><p>First of all you need to understand how Flowbite works. This library is not another framework. Rather, it is a set of components based on Tailwind CSS that you can just copy-paste from the documentation.</p><p>It also includes a JavaScript file that enables interactive components, such as modals, dropdowns, and datepickers which you can optionally include into your project via CDN or NPM.</p><p>You can check out the <a href="https://flowbite.com/docs/getting-started/quickstart/">quickstart guide</a> to explore the elements by including the CDN files into your project. But if you want to build a project with Flowbite I recommend you to follow the build tools steps so that you can purge and minify the generated CSS.</p><p>You'll also receive a lot of useful application UI, marketing UI, and e-commerce pages that can help you get started with your projects even faster. You can check out this <a href="https://flowbite.com/docs/components/tables/">comparison table</a> to better understand the differences between the open-source and pro version of Flowbite.</p><h2>When does design come in handy?</h2><p>While it might seem like extra work at a first glance, here are some key moments in which prototyping will come in handy:</p></div>`,
    author: {
      id: 1,
      name: 'Jese Leos',
      image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png'
    },
    categories: [
      {
        id: 1,
        name: 'Web Development',
      },
      {
        id: 2,
        name: 'JavaScript',
      }]
  },
  {
    id: 6,
    publishedAt: "2021-01-01",
    title: 'How to quickly deploy a static website',
    content: `<div class="mb-8 dark:text-gray-200 prose prose-sm sm:prose lg:prose-lg xl:prose-xl not-format"><p class="lead">Flowbite is an open-source library of UI components built with the utility-first classes from Tailwind CSS. It also includes interactive elements such as dropdowns, modals, datepickers.</p><p>Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way, you can think things through before committing to an actual design project.</p><p>But then I found a <a href="https://flowbite.com">component library based on Tailwind CSS called Flowbite</a>. It comes with the most commonly used UI components, such as buttons, navigation bars, cards, form elements, and more which are conveniently built with the utility classes from Tailwind CSS.</p><figure><figcaption>Digital art by Anonymous</figcaption></figure><h2>Getting started with Flowbite</h2><p>First of all you need to understand how Flowbite works. This library is not another framework. Rather, it is a set of components based on Tailwind CSS that you can just copy-paste from the documentation.</p><p>It also includes a JavaScript file that enables interactive components, such as modals, dropdowns, and datepickers which you can optionally include into your project via CDN or NPM.</p><p>You can check out the <a href="https://flowbite.com/docs/getting-started/quickstart/">quickstart guide</a> to explore the elements by including the CDN files into your project. But if you want to build a project with Flowbite I recommend you to follow the build tools steps so that you can purge and minify the generated CSS.</p><p>You'll also receive a lot of useful application UI, marketing UI, and e-commerce pages that can help you get started with your projects even faster. You can check out this <a href="https://flowbite.com/docs/components/tables/">comparison table</a> to better understand the differences between the open-source and pro version of Flowbite.</p><h2>When does design come in handy?</h2><p>While it might seem like extra work at a first glance, here are some key moments in which prototyping will come in handy:</p></div>`,
    author: {
      id: 1,
      name: 'Jese Leos',
      image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png'
    },
    categories: [
      {
        id: 1,
        name: 'Web Development',
      },
      {
        id: 2,
        name: 'JavaScript',
      }]
  },
  {
    id: 7,
    publishedAt: "2021-01-01",
    title: 'How to quickly deploy a static website',
    content: `<div class="mb-8 dark:text-gray-200 prose prose-sm sm:prose lg:prose-lg xl:prose-xl not-format"><p class="lead">Flowbite is an open-source library of UI components built with the utility-first classes from Tailwind CSS. It also includes interactive elements such as dropdowns, modals, datepickers.</p><p>Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way, you can think things through before committing to an actual design project.</p><p>But then I found a <a href="https://flowbite.com">component library based on Tailwind CSS called Flowbite</a>. It comes with the most commonly used UI components, such as buttons, navigation bars, cards, form elements, and more which are conveniently built with the utility classes from Tailwind CSS.</p><figure><figcaption>Digital art by Anonymous</figcaption></figure><h2>Getting started with Flowbite</h2><p>First of all you need to understand how Flowbite works. This library is not another framework. Rather, it is a set of components based on Tailwind CSS that you can just copy-paste from the documentation.</p><p>It also includes a JavaScript file that enables interactive components, such as modals, dropdowns, and datepickers which you can optionally include into your project via CDN or NPM.</p><p>You can check out the <a href="https://flowbite.com/docs/getting-started/quickstart/">quickstart guide</a> to explore the elements by including the CDN files into your project. But if you want to build a project with Flowbite I recommend you to follow the build tools steps so that you can purge and minify the generated CSS.</p><p>You'll also receive a lot of useful application UI, marketing UI, and e-commerce pages that can help you get started with your projects even faster. You can check out this <a href="https://flowbite.com/docs/components/tables/">comparison table</a> to better understand the differences between the open-source and pro version of Flowbite.</p><h2>When does design come in handy?</h2><p>While it might seem like extra work at a first glance, here are some key moments in which prototyping will come in handy:</p></div>`,
    author: {
      id: 1,
      name: 'Jese Leos',
      image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png'
    },
    categories: [
      {
        id: 1,
        name: 'Web Development',
      },
      {
        id: 2,
        name: 'JavaScript',
      }]
  },
  {
    id: 8,
    publishedAt: "2021-01-01",
    title: 'How to quickly deploy a static website',
    content: `<div class="mb-8 dark:text-gray-200 prose prose-sm sm:prose lg:prose-lg xl:prose-xl not-format"><p class="lead">Flowbite is an open-source library of UI components built with the utility-first classes from Tailwind CSS. It also includes interactive elements such as dropdowns, modals, datepickers.</p><p>Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way, you can think things through before committing to an actual design project.</p><p>But then I found a <a href="https://flowbite.com">component library based on Tailwind CSS called Flowbite</a>. It comes with the most commonly used UI components, such as buttons, navigation bars, cards, form elements, and more which are conveniently built with the utility classes from Tailwind CSS.</p><figure><figcaption>Digital art by Anonymous</figcaption></figure><h2>Getting started with Flowbite</h2><p>First of all you need to understand how Flowbite works. This library is not another framework. Rather, it is a set of components based on Tailwind CSS that you can just copy-paste from the documentation.</p><p>It also includes a JavaScript file that enables interactive components, such as modals, dropdowns, and datepickers which you can optionally include into your project via CDN or NPM.</p><p>You can check out the <a href="https://flowbite.com/docs/getting-started/quickstart/">quickstart guide</a> to explore the elements by including the CDN files into your project. But if you want to build a project with Flowbite I recommend you to follow the build tools steps so that you can purge and minify the generated CSS.</p><p>You'll also receive a lot of useful application UI, marketing UI, and e-commerce pages that can help you get started with your projects even faster. You can check out this <a href="https://flowbite.com/docs/components/tables/">comparison table</a> to better understand the differences between the open-source and pro version of Flowbite.</p><h2>When does design come in handy?</h2><p>While it might seem like extra work at a first glance, here are some key moments in which prototyping will come in handy:</p></div>`,
    author: {
      id: 1,
      name: 'Jese Leos',
      image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png'
    },
    categories: [
      {
        id: 1,
        name: 'Web Development',
      },
      {
        id: 2,
        name: 'JavaScript',
      }]
  }, {
    id: 9,
    publishedAt: "2021-01-01",
    title: 'How to quickly deploy a static website',
    content: `<div class="mb-8 dark:text-gray-200 prose prose-sm sm:prose lg:prose-lg xl:prose-xl not-format"><p class="lead">Flowbite is an open-source library of UI components built with the utility-first classes from Tailwind CSS. It also includes interactive elements such as dropdowns, modals, datepickers.</p><p>Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way, you can think things through before committing to an actual design project.</p><p>But then I found a <a href="https://flowbite.com">component library based on Tailwind CSS called Flowbite</a>. It comes with the most commonly used UI components, such as buttons, navigation bars, cards, form elements, and more which are conveniently built with the utility classes from Tailwind CSS.</p><figure><figcaption>Digital art by Anonymous</figcaption></figure><h2>Getting started with Flowbite</h2><p>First of all you need to understand how Flowbite works. This library is not another framework. Rather, it is a set of components based on Tailwind CSS that you can just copy-paste from the documentation.</p><p>It also includes a JavaScript file that enables interactive components, such as modals, dropdowns, and datepickers which you can optionally include into your project via CDN or NPM.</p><p>You can check out the <a href="https://flowbite.com/docs/getting-started/quickstart/">quickstart guide</a> to explore the elements by including the CDN files into your project. But if you want to build a project with Flowbite I recommend you to follow the build tools steps so that you can purge and minify the generated CSS.</p><p>You'll also receive a lot of useful application UI, marketing UI, and e-commerce pages that can help you get started with your projects even faster. You can check out this <a href="https://flowbite.com/docs/components/tables/">comparison table</a> to better understand the differences between the open-source and pro version of Flowbite.</p><h2>When does design come in handy?</h2><p>While it might seem like extra work at a first glance, here are some key moments in which prototyping will come in handy:</p></div>`,
    author: {
      id: 1,
      name: 'Jese Leos',
      image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png'
    },
    categories: [
      {
        id: 1,
        name: 'Web Development',
      },
      {
        id: 2,
        name: 'JavaScript',
      }]
  },
]
 
interface Props{
  articles:Article[]
}

const Articles:FC<Props> = ({}) => {

  return (
    <>
      <Header title='Məqalələr' description='məqalələrimiz səhifəsində məqalələrimizi oxuya bilərsiniz' />
      <section className="bg-gray-200 dark:bg-gray-900 lg:mb-0 mb-10">
        <div className="pt-6 tb-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-5xl tracking-tight font-bold text-gray-800 dark:text-gray-200">Məqalələr</h2>
            <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {
              articless.map((article, index) => (
                <ArticleItem key={index} {...article} />
              ))
            }
          </div>
        </div>
      </section>
 
    </>
  )
}

export default Articles


// export const getStaticProps: GetStaticProps = async () => {
//   const fetchAPI = FetchAPI.getInstance();
//   const res = await fetchAPI.get("articles"); 
//   return {
//     props: {
//       articles :res || []
//     }
//   }
// }