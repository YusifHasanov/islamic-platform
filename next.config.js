/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.ytimg.com',"images-na.ssl-images-amazon.com","pbs.twimg.com"],
    unoptimized: true,
    
      
  },
  
   
}

module.exports = nextConfig
