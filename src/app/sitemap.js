import {getAllCategories} from "@/util/FetchUtil";

export default async function sitemap() {
    // Varsayılan statik sayfalar
    const defaultPages = [
        {
            url: "https://www.ehlisunnemedresesi.az",
            lastModified: new Date().toISOString(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: "https://www.ehlisunnemedresesi.az/about",
            lastModified: new Date().toISOString(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: "https://www.ehlisunnemedresesi.az/contact",
            lastModified: new Date().toISOString(),
            changeFrequency: "monthly",
            priority: 0.9,
        }
    ];

    // Dinamik makaleler ve kategoriler
    const articles = await getAllCategories();
    const categories = await getAllCategories();

    const sitemap = [
        ...defaultPages,
        // Makaleleri sitemap'e ekle
        ...articles.map((article) => ({
            url: `https://www.ehlisunnemedresesi.az/articles/${article.id}`,
            lastModified: article.modified_at || article.published_at || new Date().toISOString(),
            changeFrequency: "daily",
            priority: 0.8,
        })),
        // Kategorileri sitemap'e ekle
        ...categories.map((category) => ({
            url: `https://www.ehlisunnemedresesi.az/category/${category.id}`,
            lastModified: new Date().toISOString(),
            changeFrequency: "weekly",
            priority: 0.7,
        })),
    ];

    return sitemap;
}