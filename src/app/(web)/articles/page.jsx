import React from 'react';
import Articles from "@/layouts/ArticlesPage";
import Head from "next/head";


export const metadata = {
    title: 'Məqalələr',
};


const Page = async ({searchParams}) => {
   const {page,category} = await searchParams;
    return (
        <>
            <Head>
                <meta
                    name="description"
                    content="Əhli-Sünnə Mədrəsəsi saytında İslam dini haqqında dəyərli və maarifləndirici məqalələri oxuyun."
                />
            </Head>
            <Articles page={page} category={category}/>
        </>
    );
};

export default Page;