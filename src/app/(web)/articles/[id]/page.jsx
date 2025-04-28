import {notFound} from 'next/navigation';
import ArticleDetailPage from '@/layouts/ArticleDetailPage';
import {BASE_URL} from '@/util/Const';
import Script from "next/script"

export const revalidate = 60

export async function generateStaticParams() {
    try {
        const postsJson = await fetch(`${BASE_URL}/articles/all`)
        const posts = await postsJson.json()

        return posts.map((post) => ({
            id: String(post.id),
        }))
    } catch (error) {
        console.error("Error generating static params:", error)
        return []
    }
}

async function getArticle(id) {
    try {
        const res = await fetch(`${BASE_URL}/articles/${id}`, {next: {revalidate: 3600}});

        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error(`Failed to fetch article: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching article:", error);
        return null;
    }
}

export async function generateMetadata({params}) {
    const awaitedParams = await params;
    const article = await getArticle(awaitedParams.id);

    if (!article) {
        return {
            title: 'Məqalə Tapılmadı',
            description: 'Axtardığınız məqalə mövcud deyil.',
            robots: {index: false},
        };
    }

    const cleanDescription = article.content?.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim().substring(0, 160)
        || 'Əhli-Sünnə Mədrəsəsi - İslam dini haqqında dəyərli məqalələr.';

    const keywords = [
        article.title,
        ...(article.categories?.map(c => c.name) || []),
        ...(article.tags?.map(t => t.name) || []),
        'Əhli-Sünnə Mədrəsəsi', 'İslam', 'din', 'məqalə',
    ].filter(Boolean).join(', ');

    const imageUrl = article.image || 'https://www.ehlisunnemedresesi.az/favicon.ico';

    return {
        title: `${article.title} | Əhli-Sünnə Mədrəsəsi`,
        description: cleanDescription,
        keywords: keywords,
        alternates: {
            canonical: `/articles/${article.id}`,
        },
        openGraph: {
            title: `${article.title} | Əhli-Sünnə Mədrəsəsi`,
            description: cleanDescription,
            url: `https://www.ehlisunnemedresesi.az/articles/${article.id}`,
            siteName: 'Əhli-Sünnə Mədrəsəsi',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],
            locale: 'az_AZ',
            type: 'article',
            publishedTime: article.publishedAt,
            modifiedTime: article.updatedAt || article.publishedAt,
            authors: [article.author?.name || 'Əhli-Sünnə Mədrəsəsi'],
            section: article.categories?.[0]?.name,
            tags: article.tags?.map(t => t.name) || [],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${article.title} | Əhli-Sünnə Mədrəsəsi`,
            description: cleanDescription,
            images: [imageUrl],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

const Page = async ({params}) => {
    const {id} = await params

    try {
        const article = await getArticle(id)

        if (!article) {
            notFound()
        }

        const cleanJsonLdDescription = article.content?.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim().substring(0, 200)
            || 'Əhli-Sünnə Mədrəsəsi - İslam dini haqqında məqalə.';

        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'Article',
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://www.ehlisunnemedresesi.az/articles/${article.id}`,
            },
            headline: article.title,
            description: cleanJsonLdDescription,
            image: article.image || 'https://www.ehlisunnemedresesi.az/images/schema-default.jpg',
            datePublished: article.publishedAt,
            dateModified: article.updatedAt || article.publishedAt,
            author: {
                '@type': 'Person',
                name: article.author?.name || 'Əhli-Sünnə Mədrəsəsi',
            },
            publisher: {
                '@type': 'Organization',
                name: 'Əhli-Sünnə Mədrəsəsi',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://www.ehlisunnemedresesi.az/esm_logo.png',
                },
            },
            keywords: article.tags?.map(t => t.name).join(', ') || '',
        }

        return (
            <>
                <Script
                    id="article-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
                />
                <ArticleDetailPage article={article}/>
            </>
        )
    } catch (error) {
        console.error("Error fetching article:", error)
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    <p>Məqalə yüklənərkən xəta baş verdi. Zəhmət olmasa bir az sonra yenidən cəhd edin.</p>
                </div>
            </div>
        )
    }
}

export default Page

