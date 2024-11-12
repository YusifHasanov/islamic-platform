// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'res.cloudinary.com',
            'i.ytimg.com',
            'medrese.vercel.app',
            'hayalhanem.com',
            '52principlesforchurchleaders.com',
            'images.unsplash.com',
        ],
    },
    experimental: {
        optimizeCss: true,
    },
};

export default nextConfig;