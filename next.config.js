const withPWA = require("next-pwa");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.pinimg.com"],
  },
};

const PWAConfig = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});

module.exports = { ...nextConfig, ...PWAConfig };
