/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  //   output: 'export', // Outputs a Single-Page Application (SPA).
  //   distDir: './dist', // Changes the build output directory to `./dist/`.
};

export default nextConfig;
