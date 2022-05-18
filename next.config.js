/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.pinimg.com", "cloudflare-ipfs.com"],
  },
};

module.exports = { ...nextConfig };
