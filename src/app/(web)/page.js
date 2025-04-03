import HomePage from "@/layouts/HomePage"
import Head from "next/head"
import Script from "next/script"

export default function Home() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://yourwebsite.com",
    name: "ehlisunnemedresesi.az",
    author: {
      "@type": "Person",
      name: "Yusif Hasanov",
    },
    description: "Əli sunnə mədrəsəsi, 4 məzhəb",
  }
  return (
    <>
      <Head>
        <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>
      <HomePage />
    </>
  )
}

