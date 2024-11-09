import React from 'react';
import Articles from "@/pages/ArticlesPage";

const Page = async ({searchParams}) => {
   const {page,category} = await searchParams;
    return (
        <>
            <Articles page={page} category={category}/>
        </>
    );
};

export default Page;