// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        unoptimized: true,
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
                hostname: 'images.unsplash.com',
            },
        ]
    },
    experimental: {
        optimizeCss: true,
        scrollRestoration: true,
    },
    async rewrites() {
        return [
            {
                source: '/ex-api/:path*',
                destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:path*`,
            },
            {
                source: '/ytb-api/:path*',
                destination: `${process.env.NEXT_PUBLIC_BASE_URL_YTB}/:path*`,
            },
            {
                source: "/sitemap.xml",
                destination: "/api/sitemap",
            },
        ];
    },
};

export default nextConfig;
