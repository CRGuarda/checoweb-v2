/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'kambia-payments-queue.s3.us-east-1.amazonaws.com',
      },
    ],
  },
  typescript: { ignoreBuildErrors: true },
}

module.exports = nextConfig
