// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
            },
            {
                protocol: 'https',
                hostname: 'medrese.vercel.app',
            },
            {
                protocol: 'https',
                hostname: 'hayalhanem.com',
            },
            {
                protocol: 'https',
                hostname: '52principlesforchurchleaders.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com'
            },
        ],
    },
    experimental: {
        optimizeCss: true,
        scrollRestoration: true,
    },
    async rewrites() {
        return [
            {
                source: '/ex-api/:path*',
                // destination: 'http://31.220.95.127:8083/api/:path*',
                //  destination: 'http://localhost:8083/api/:path*',
                 destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:path*`,
            },
            {
                source: "/sitemap.xml",
                destination: "/api/sitemap",
            },
        ];
    },
};

export default nextConfig;
