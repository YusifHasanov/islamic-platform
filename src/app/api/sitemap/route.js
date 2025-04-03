import { BASE_URL } from "@/util/Const"

export async function GET() {
  const NEXT_PUBLIC_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN

  const staticRoutes = [
    `${NEXT_PUBLIC_DOMAIN}/about`,
    `${NEXT_PUBLIC_DOMAIN}/contact`,
    `${NEXT_PUBLIC_DOMAIN}/videos`,
    `${NEXT_PUBLIC_DOMAIN}/articles`,
  ]

  const articles = await fetch(`${BASE_URL}/articles/all`).then((res) => res.json())
  const dynamicArticleRoutes = articles.map((article) => `${NEXT_PUBLIC_DOMAIN}/articles/${article.id}`)

  const allRoutes = [...staticRoutes, ...dynamicArticleRoutes]
  const sitemap = `
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${allRoutes
              .map(
                (url) => `
                <url>
                    <loc>${url}</loc>
                    <changefreq>weekly</changefreq>
                    <priority>0.8</priority>
                </url>
            `,
              )
              .join("")}
        </urlset>
    `

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}

