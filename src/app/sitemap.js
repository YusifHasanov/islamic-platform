import { getAllCategories } from "@/util/FetchUtil"
import { BASE_URL } from "@/util/Const"

export default async function sitemap() {
  // Varsayılan statik sayfalar
  const defaultPages = [
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN || 'https://www.ehlisunnemedresesi.az'}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN || 'https://www.ehlisunnemedresesi.az'}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN || 'https://www.ehlisunnemedresesi.az'}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN || 'https://www.ehlisunnemedresesi.az'}/videos`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN || 'https://www.ehlisunnemedresesi.az'}/articles`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN || 'https://www.ehlisunnemedresesi.az'}/questions`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN || 'https://www.ehlisunnemedresesi.az'}/books`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  // Dinamik içerikler
  let articles = []
  let categories = []
  let questions = []

  try {
    const articleRes = await fetch(`${BASE_URL}/articles/all`)
    if (articleRes.ok) articles = await articleRes.json()
  } catch (error) {
    console.error("Sitemap: Failed to fetch articles", error)
  }

  try {
    const categoriesRes = await getAllCategories()
    if (categoriesRes) categories = categoriesRes
  } catch (error) {
    console.error("Sitemap: Failed to fetch categories", error)
  }

  try {
    // Fetch all question IDs/slugs (adjust endpoint if needed)
    const questionRes = await fetch(`${BASE_URL}/questions/all`);
    if(questionRes.ok) questions = await questionRes.json();
  } catch (error) {
      console.error("Sitemap: Failed to fetch questions", error);
  }

  const sitemap = [
    ...defaultPages,
    // Makaleleri sitemap'e ekle
    ...(articles || []).map((item) => ({
      url: `${process.env.NEXT_PUBLIC_DOMAIN || 'https://www.ehlisunnemedresesi.az'}/articles/${item.id}`,
      lastModified: item.updatedAt || item.publishedAt || new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.8,
    })),
    // Kategorileri sitemap'e ekle
    ...(categories || []).map((item) => ({
      url: `${process.env.NEXT_PUBLIC_DOMAIN || 'https://www.ehlisunnemedresesi.az'}/search?categoryId=${item.id}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.7,
    })),
    // Soruları sitemap'e ekle
    ...(questions || []).map((item) => ({
        url: `${process.env.NEXT_PUBLIC_DOMAIN || 'https://www.ehlisunnemedresesi.az'}/questions/${item.id}`,
        lastModified: item.updatedAt || item.createdDate || new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.7,
    })),
  ]

  return sitemap
}

