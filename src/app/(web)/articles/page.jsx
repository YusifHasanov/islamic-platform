import React from 'react';
import Articles from "@/layouts/ArticlesPage";


export const metadata = {
    title: 'Məqalələr',
};


const Page = async ({searchParams}) => {
   const {page,category} = await searchParams;
    return (
        <>
            <head>
                <meta
                    name="description"
                    content="Əhli-Sünnə Mədrəsəsi saytında İslam dini haqqında dəyərli və maarifləndirici məqalələri oxuyun."
                />
            </head>
            <Articles page={page} category={category}/>
        </>
    );
};

export default Page;