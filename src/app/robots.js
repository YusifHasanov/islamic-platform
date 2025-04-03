export default function robots() {
  return {
    rules: [
      {
        userAgent: "Googlebot", // Sadece Googlebot için özel kurallar
        allow: ["/"],
        disallow: ["/admin/"],
      },
      {
        userAgent: "*", // Diğer tüm botlar için genel kurallar
        allow: ["/"],
        disallow: ["/search?q=", "/admin/"],
      },
    ],
    sitemap: ["https://www.ehlisunnemedresesi.az/sitemap.xml"],
  }
}

