/** @type {import('next').NextConfig} */

let doubanDomains = []
for (let i = 1; i < 10; i++) {
  doubanDomains.push(`img${i}.doubanio.com`)
}


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [...doubanDomains],
  },
}


module.exports = nextConfig
