import AboutUsPage from "@/layouts/AboutUsPage"
import Head from "next/head"
import Script from "next/script"

export const metadata = {
  title: "Haqqımızda",
}

const Page = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Şirket Adı",
    url: "https://www.ehlisunnemedresesi.az",
    logo: "https://yourwebsite.com/path/to/logo.jpg",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-555-5555",
      contactType: "Customer Service",
    },
  }
  return (
    <>
      <Head>
        <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

      <AboutUsPage />
    </>
  )
}

export default Page

