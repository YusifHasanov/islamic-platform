import React from 'react';
import ArticleDetail from "@/layouts/ArticleDetailPage";
import { BASE_URL } from "@/util/Const";
import Head from "next/head";
import Script from "next/script";
import {Meta} from "next/dist/lib/metadata/generate/meta";
import {NextResponse as res} from "next/server";

export const revalidate = 60;

export async function generateStaticParams( ) {
    const postsJson = await fetch(`${BASE_URL}/articles/all`)

    const posts = await postsJson.json();

    return posts.map((post) => ({
        id: String(post.id),
    }));
}

export async function generateMetadata({ params }){
    const { id } = await params;

    const article = await fetch(`${BASE_URL}/articles/${id}`, {
        method: "GET",
        next: { revalidate: 60 * 60 * 24 },
    }).then((res) => res.json());

    return {
        title: `${article.title} | Əhli-Sünnə Mədrəsəsi`,
        authors: [
            {
                name: article.authors[0]?.name || "Əhli-Sünnə Mədrəsəsi"
            }
        ],
        description: article.title,
        keywords: article.title,
        openGraph: {
            title: `${article.title} | Əhli-Sünnə Mədrəsəsi`,
            description: article.description,
            type: "article",
            url: `https://www.ehlisunnemedresesi.az/${article.id}`,
            publishedTime: article.publishedAt,
            modifiedTime: article.publishedAt,
            authors: ["https://www.ehlisunnemedresesi.az/about"],
            tags: article.categories,
            images: [
                {
                    url: article.image,
                    width: 1024,
                    height: 576,
                    alt: article.title,
                    type: "image/png"
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            site: "@ehlisunne",
            creator: "@ehlisunne",
            title: `${article.title} | Əhli-Sünnə Mədrəsəsi`,
            description: article.title,
            images: [
                {
                    url: article.image,
                    width: 1024,
                    height: 576,
                    alt: article.title
                }
            ]
        },
        alternates: {
            canonical: `https://www.ehlisunnemedresesi.az/${article.id}`
        }
    };
}

const BlogDetail = async ({ params }) => {
    const { id } = await params;
    const article = await fetch(`${BASE_URL}/articles/${id}`).then((res) => res.json());

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "author": {
            "@type": "Person",
            "name": article.authors[0]?.name,
        },
        "datePublished": article.publishedAt,
        "image": article.image,
        "articleBody": article.content,
    };
    return (
        <>
            <Head>
                <Script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(schemaData)}}
                />
                <Meta name="description" content={article.title}/>
                <Meta name="keywords" content={`Əhli-Sünnə Mədrəsəsi, Ehlisun Medresesi, ${article.title}`}/>
            </Head>
            <ArticleDetail article={article}/>
        </>
    );
};

export default BlogDetail;