import React from 'react'
import Head from 'next/head'
import ArticleItem from '@/src/components/articles/ArticleItem' 
const Articles = () => {
  
  return (
    <>
      <Head>
        <title>Məqalələr</title>
      </Head>
      <section className="bg-gray-200 dark:bg-gray-800">
        <div className="pt-6 tb-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-5xl tracking-tight font-bold text-gray-800 dark:text-gray-200">Məqalələr</h2>
            <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {
              new Array(6).fill(0).map((_, index) => (
                <ArticleItem key={index} />
              ))
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default Articles