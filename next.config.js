/** @type {import('next').NextConfig} */
require('dotenv').config()
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.ytimg.com',"images-na.ssl-images-amazon.com","pbs.twimg.com"],
    unoptimized: true,
      
  },
  env: {
    API_URL : "http://localhost:8080/api",
 

  }
   
}

module.exports = nextConfig
