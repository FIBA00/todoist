/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  serverExternalPackages: ["@prisma/client"],
  allowedDevOrigins: ['192.168.43.26']


};

export default nextConfig;
