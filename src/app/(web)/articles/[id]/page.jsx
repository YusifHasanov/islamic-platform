import React from 'react';
import ArticleDetail from "@/layouts/ArticleDetailPage";


export const revalidate = 60;


const BlogDetail = async ({params}) => {
    const {id} = await params;
    return (
        <>
            <ArticleDetail id={id}/>
        </>
    );
};

export default BlogDetail;