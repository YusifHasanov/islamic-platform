import React from 'react';
import ArticleDetail from "@/pages/ArticleDetailPage";

const BlogDetail = async ({params}) => {
    const {id} = await params; // Burada 'params' doğrudan destructure ediliyor
    return (
        <>
            <ArticleDetail id={id}/>
        </>
    );
};

export default BlogDetail;