/** @type {import('next').NextConfig} */
const nextConfig = {
  //basePath: "/ext/crypto",
  basePath: "",
  reactStrictMode: true,
  images: {
    loader: "imgix",
    path: "/",
  },
};

module.exports = nextConfig;
