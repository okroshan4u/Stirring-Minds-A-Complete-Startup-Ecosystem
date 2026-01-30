// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['images.unsplash.com', 'via.placeholder.com'],
//   },
//   experimental: {
//     optimizeCss: true,
//   },
// };

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
}

module.exports = nextConfig

