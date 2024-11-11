import React from 'react';
import ArticleDetail from "@/layouts/ArticleDetailPage";
import {BASE_URL} from "@/util/Const";

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

    return (
        <>
            <ArticleDetail article={article}/>
        </>
    );
};

export default BlogDetail;