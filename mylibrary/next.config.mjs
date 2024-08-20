/** @type {import('next').NextConfig} */
const nextConfig = {
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
