/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "s3.ap-south-1.amazonaws.com",
      "ik.imagekit.io",
      "www.roamifyplanners.in",
    ],
  },
};

export default nextConfig;
