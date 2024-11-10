import React from 'react';
import Articles from "@/layouts/ArticlesPage";


export const metadata = {
    title: 'Məqalələr',
};


const Page = async ({searchParams}) => {
   const {page,category} = await searchParams;
    return (
        <>
            <Articles page={page} category={category}/>
        </>
    );
};

export default Page;