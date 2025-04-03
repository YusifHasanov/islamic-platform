import ArticleDetail from "@/layouts/ArticleDetailPage"
import { BASE_URL } from "@/util/Const"
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

export async function generateMetadata({ params }) {
  try {
    const { id } = await params

    const article = await fetch(`${BASE_URL}/articles/${id}`, {
      method: "GET",
      next: { revalidate: 60 * 60 * 24 },
    }).then((res) => res.json())

    return {
      title: `${article.title} | Əhli-Sünnə Mədrəsəsi`,
      authors: [
        {
          name: article.authorName || "Əhli-Sünnə Mədrəsəsi",
        },
      ],
      description: article.title,
      keywords: article.title,
      openGraph: {
        title: `${article.title} | Əhli-Sünnə Mədrəsəsi`,
        description: article.description || article.title,
        type: "article",
        url: `https://www.ehlisunnemedresesi.az/articles/${article.id}`,
        publishedTime: article.publishedAt,
        modifiedTime: article.publishedAt,
        authors: ["https://www.ehlisunnemedresesi.az/about"],
        tags: article.categories,
        images: [
          {
            url: article.image,
            width: 1024,
            height: 576,
            alt: article.title,
            type: "image/png",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: "@ehlisunne",
        creator: "@ehlisunne",
        title: `${article.title} | Əhli-Sünnə Mədrəsəsi`,
        description: article.title,
        images: [
          {
            url: article.image,
            width: 1024,
            height: 576,
            alt: article.title,
          },
        ],
      },
      alternates: {
        canonical: `https://www.ehlisunnemedresesi.az/articles/${article.id}`,
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Məqalə | Əhli-Sünnə Mədrəsəsi",
      description: "Əhli-Sünnə Mədrəsəsi məqaləsi",
    }
  }
}

const Page = async ({ params }) => {
  const { id } = await params

  try {
    const article = await fetch(`${BASE_URL}/articles/${id}`).then((res) => res.json())

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      author: {
        "@type": "Person",
        name: article.authorName || "Əhli-Sünnə Mədrəsəsi",
      },
      datePublished: article.publishedAt,
      image: article.image,
      articleBody: article.content,
      publisher: {
        "@type": "Organization",
        name: "Əhli-Sünnə Mədrəsəsi",
        logo: {
          "@type": "ImageObject",
          url: "https://www.ehlisunnemedresesi.az/logo.png",
        },
      },
    }

    return (
        <>
          <Script
              id="article-schema"
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
          />
          <ArticleDetail article={article} />
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

