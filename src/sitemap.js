import {BASE_URL} from "@/util/Const";

export default async function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;

    const staticPages = [
        '',
        '/about',
        '/contact',
        '/videos',
        '/articles',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
    }));


    const articlesResponse = await fetch(`${BASE_URL}/articles`);
    const articles = await articlesResponse.json();

    const dynamicPages = articles.map((article) => ({
        url: `${baseUrl}/articles/${article.id}`,
        lastModified: article.updatedAt || new Date().toISOString(),
    }));


    const sitemap = [...staticPages, ...dynamicPages];

    return sitemap;
}