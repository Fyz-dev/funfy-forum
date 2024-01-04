/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/user/:id',
        destination: '/user/:id/posts',
        permanent: true,
      },
      {
        source: '/topic/:id',
        destination: '/topic/:id/new',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

module.exports = nextConfig;
