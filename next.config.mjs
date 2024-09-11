/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pdf2json'],
  },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.mydevify.com',
            port: '',
            pathname: '/**',
          }
        ]
    }
};

export default nextConfig;
