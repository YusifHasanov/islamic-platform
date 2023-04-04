import React from 'react'
import Head from 'next/head'
import Script from 'next/script'
const MainHeader = () =>
(
    <>
        <Script
            src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
            strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
            {`
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'GA_MEASUREMENT_ID');
`}
        </Script>
        <Head>
            <meta name="google-site-verification" content="QR1VwILz70nqB5-xyi6WxnKAWwp155khw37XhUBA-6Q" />

            <script type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `
        
        {
          "@context": "https://ehlisunne.vercel.app/",
          "@type": "WebSite",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://ehlisunne.vercel.app/"
          },
          "headline": "Əhli sünnə mədrəsəsi",
          "description": "Əhli sünnə mədrəsəsi youtube kanalı ilə tanış ola bilərsiniz", 
          "image": "https://ehlisunne.vercel.app/assets/logo.png",
          "author": {
            "@type": "Person",
            "name": "Yusif Hasanov"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Əhli sünnə mədrəsəsi",
            "logo": {
              "@type": "ImageObject",
              "url": "https://ehlisunne.vercel.app/assets/logo.png"
            }
          },
          "datePublished": "Your publication date here",
          "dateModified": "Your last modified date here"
        }
      `,
                }}
            />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta charSet="utf-8" />
        </Head>
    </>
)


export default MainHeader