/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  

  images: {
    unoptimized : true,
    domains: ['i.imgur.com', 'yts.mx'],
  },

};

module.exports = nextConfig;
