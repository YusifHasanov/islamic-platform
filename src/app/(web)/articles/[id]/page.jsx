import React from 'react';
import ArticleDetail from "@/layouts/ArticleDetailPage";
import {BASE_URL} from "@/util/Const";
import Head from "next/head";
import Script from "next/script";

export const revalidate = 60

export const dynamicParams = true

export async function generateStaticParams() {
    const posts = await fetch(`${BASE_URL}/articles/all`).then((res) =>
        res.json()
    )
    return posts.map((post) => ({
        id: String(post.id),
    }))
}

const BlogDetail = async ({params}) => {
    const {id} = await params;
    const article = await fetch(`${BASE_URL}/articles/${id}`)
        .then(res => res.json())

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Məqalə Başlığı",
        "author": {
            "@type": "Person",
            "name": article.authors[0]?.name,
        },
        "datePublished": article.publishedAt.toLocaleString(),
        "image": article.image,
        "articleBody": article.content,
    }
    return (
        <>
            <Head>
                <Script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(schemaData)}}
                />
            </Head>
            <ArticleDetail article={article}/>
        </>
    );
};

export default BlogDetail;