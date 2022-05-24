/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'i.pinimg.com',
      'cloudflare-ipfs.com',
      'tailwindui.com',
      'api.lorem.space',
      'www.gravatar.com',
    ],
  },
};

module.exports = { ...nextConfig };
