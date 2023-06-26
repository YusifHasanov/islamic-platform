/** @type {import('next').NextConfig} */
require('dotenv').config()
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.ytimg.com',"images-na.ssl-images-amazon.com","pbs.twimg.com"],
    unoptimized: true,
      
  },
  env: {
    API_URL :  process.env.API_URL,
  }
   
}

module.exports = nextConfig
