import Title from '@/src/admin/Title'
import ArticleItem from '@/src/admin/articles/ArticleItem'
import Layout from '@/src/admin/Layout'
import React, { FC, useState } from 'react'
import Header from '@/src/components/globals/Header'
const articles: Article[] = [
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
      }]
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

const Articles: FC = () => {

  const [description, setDescription] = useState("");
  return (
    <>
      <Header title="Admin Articles" description="Admin Articles" />
      <Layout>
        <Title name='Məqalələr' />
        <div className='grid grid-cols-1 md:grid-cols-2 sm:pr-5   pr-2 lg:grid-cols-3  gap-6 '>
          {
            articles.map((article: Article) => (
              <ArticleItem key={article.id} {...article} />
            ))
          }
        </div>
      </Layout>
    </>
  )
}

export default Articles