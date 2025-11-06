import type { NextConfig } from 'next';

const nextConfig = {
  devIndicators: {
    buildActivity: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com', 
      },
    ],
    domains: ['localhost', 'images.unsplash.com'],
  },
  turbopack: {}, 
};

export default nextConfig;
