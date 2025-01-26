import localFont from "next/font/local";
import "./globals.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Tailwind from 'primereact/passthrough/tailwind';
import { Analytics } from '@vercel/analytics/next';


import {
    Roboto
} from "next/font/google";
import {PrimeReactProvider} from "primereact/api";
import Head from "next/head";
import Script from "next/script";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});
const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
});



export const viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#ffffff"
};
const keywords = [
    "ehlisunne","islam","din","quran","allah","iman","oruc",
    "Ehli Sünne", "Medrese", "İslam Maarifi", "Əhli-Sünnə Mədrəsəsi", "Din Maarifi",
    "Dini Təhsil", "İslam Mədrəsəsi", "Ehli Sünne Mədrəsəsi", "Əhli-Sünnə Məzhəbi",
    "Dini Maarifləndirmə", "Əhli-Sünnə Mədrəsəsi Bakı", "Əhli-Sünnə Mədrəsəsi Azərbaycan",
    "İslam Mədrəsəsi Bakı", "Bakı Ehli Sünne Mədrəsəsi", "Dini təhsil Bakı",
    "Əhli-Sünnə Mədrəsəsi Gəncə", "Əhli-Sünnə Mədrəsəsi Naxçıvan",
    "Azərbaycan Ehli Sünne Mədrəsəsi", "Ehli Sünne Məktəbi",
    "Quran dərsləri Ehli Sünne Mədrəsəsində", "Əhli-Sünnə Mədrəsəsi tarixi",
    "Əhli-Sünnə Mədrəsəsinin xidmətləri", "Ehli Sünne Mədrəsəsi nədir?",
    "Əhli-Sünnə Mədrəsəsi və Quran dərsləri", "Ehli Sünne inancı və prinsipləri",
    "İslam maarifi və Əhli-Sünnə Mədrəsəsi", "Əhli-Sünnə Mədrəsəsi dərnəkləri",
    "Fiqh dərsləri Mədrəsədə", "Hədis elmi və Əhli-Sünnə", "Uşaqlar üçün dini təhsil",
    "Ehli Sünne haqqında məqalələr", "İslam dini haqqında resurslar",
    "Ehli Sünne Mədrəsəsi xəbərləri", "Ehli Sünne Mədrəsəsi xidmətləri",
    "Henefi","Safi","Henbeli","Maliki","Hənəfi","Şafi","Hənbəli","Maliki",
    "Firudin Babaoğlu","Hədis","Quran","Allah","Din",
];


export const metadata = {
    title: "Əhli-Sünnə Mədrəsəsi",
    description: "İslam dini haqqında maarifləndirici məlumatlar və resurslar təqdim edən Əhli-Sünnə Mədrəsəsi.",
    metadataBase: new URL("https://www.ehlisunnemedresesi.az"),
    openGraph: {
        siteName: "Əhli-Sünnə Mədrəsəsi",
        type: "website",
        locale: "az_AZ",
        url: "https://www.ehlisunnemedresesi.az",
        title: "Əhli-Sünnə Mədrəsəsi",
        description: "İslam dini haqqında maarifləndirici məlumatlar və resurslar təqdim edən Əhli-Sünnə Mədrəsəsi.",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Əhli-Sünnə Mədrəsəsi Banner"
            }
        ]
    },
    robots: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
    },
    alternates: {
        types: {
            "application/rss+xml": "https://www.ehlisunnemedresesi.az/rss.xml"
        }
    },
    applicationName: "Əhli-Sünnə Mədrəsəsi",
    appleWebApp: {
        title: "Əhli-Sünnə Mədrəsəsi",
        statusBarStyle: "default",
        capable: true
    },
    // google-site-verification=9F3dA1y_ERv-C13d3qNSRFapLvGfp-fWGR4YAKUHZYw
    verification: {
        google: "9F3dA1y_ERv-C13d3qNSRFapLvGfp-fWGR4YAKUHZYw",
        // yandex: ["YOUR_YANDEX_VERIFICATION_CODE"],
        // other: {
        //     "msvalidate.01": ["YOUR_BING_VERIFICATION_CODE"],
        //     "facebook-domain-verification": ["YOUR_FACEBOOK_VERIFICATION_CODE"]
        // }
    },
    icons: {
        icon: [
            {
                url: "/favicon.ico",
                type: "image/x-icon"
            },
            // {
            //     url: "/favicon-16x16.png",
            //     sizes: "16x16",
            //     type: "image/png"
            // },
            // {
            //     url: "/favicon-32x32.png",
            //     sizes: "32x32",
            //     type: "image/png"
            // },
            // {
            //     url: "/favicon-96x96.png",
            //     sizes: "96x96",
            //     type: "image/png"
            // },
            // {
            //     url: "/android-chrome-192x192.png",
            //     sizes: "192x192",
            //     type: "image/png"
            // }
        ],
        shortcut: [
            {
                url: "/favicon.ico",
                type: "image/x-icon"
            }
        ],
        apple: [
            {
                url: "/favicon.ico",
                type: "image/x-icon"
            },
            // {
            //     url: "/apple-icon-57x57.png",
            //     sizes: "57x57",
            //     type: "image/png"
            // },
            // {
            //     url: "/apple-icon-60x60.png",
            //     sizes: "60x60",
            //     type: "image/png"
            // },
            // {
            //     url: "/apple-icon-72x72.png",
            //     sizes: "72x72",
            //     type: "image/png"
            // },
            // {
            //     url: "/apple-icon-76x76.png",
            //     sizes: "76x76",
            //     type: "image/png"
            // },
            // {
            //     url: "/apple-icon-114x114.png",
            //     sizes: "114x114",
            //     type: "image/png"
            // },
            // {
            //     url: "/apple-icon-120x120.png",
            //     sizes: "120x120",
            //     type: "image/png"
            // },
            // {
            //     url: "/apple-icon-144x144.png",
            //     sizes: "144x144",
            //     type: "image/png"
            // },
            // {
            //     url: "/apple-icon-152x152.png",
            //     sizes: "152x152",
            //     type: "image/png"
            // },
            // {
            //     url: "/apple-icon-180x180.png",
            //     sizes: "180x180",
            //     type: "image/png"
            // }
        ]
    }
};


export default function RootLayout({children}) {
    const domain = process.env.NEXT_PUBLIC_DOMAIN;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://www.ehlisunnemedresesi.az/makale-detay"
        },
        keywords: keywords,

        headline: "İslam Dininə Aid Dəyərli Məqalələr",
        description:
            "Əhli-Sünnə Mədrəsəsi saytında İslam dini haqqında dəyərli və maarifləndirici məqalələri oxuyun.",
        image:
            "https://www.ehlisunnemedresesi.az/images/blog-thumbnail.png",
        dateCreated: "2024-01-11T11:35:00+04:00",
        datePublished: "2024-01-11T11:35:00+04:00",
        dateModified: "2024-01-11T11:35:00+04:00",
        author: {
            "@type": "Person",
            name: "Əhli-Sünnə Mədrəsəsi",
            url: "https://www.ehlisunnemedresesi.az/about"
        },
        publisher: {
            "@type": "Organization",
            name: "Əhli-Sünnə Mədrəsəsi",
            logo: {
                "@type": "ImageObject",
                url: "https://www.ehlisunnemedresesi.az/logo.png"
            }
        },
        inLanguage: "az-AZ",
        isFamilyFriendly: "true"
    };

    return (
        <html lang="az-AZ" className={roboto.className}>

        <head>
            <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
            <title>Əhli-Sünnə Mədrəsəsi</title>
        </head>
        <Head>
            <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
            <title>Əhli-Sünnə Mədrəsəsi</title>
            <link rel="canonical" href={domain}/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"/>
            <meta name="description" content="Əhli-Sünnə Mədrəsəsi haqqında məlumatlar və maarifləndirici məqalələr."/>
            <meta name="keywords" content={keywords.join(", ")}/>
            {/*<meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/>*/}
            <Script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
        </Head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <PrimeReactProvider value={{pt: Tailwind}}>
            {children}
        </PrimeReactProvider>
        <Analytics/>
        </body>
        </html>
    );
}
