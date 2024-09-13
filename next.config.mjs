/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  output: 'export', // Outputs a Single-Page Application (SPA).
  distDir: 'out', // Changes the build output directory to `./dist/`.
  basePath: '/OnDe-FE',
  assetPrefix:
    process.env.NODE_ENV === 'production'
      ? 'https://ottsideproject.github.io/OnDe-FE'
      : '',
};

export default nextConfig;
