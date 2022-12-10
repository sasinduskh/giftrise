/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://giftrise.vercel.app/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig
