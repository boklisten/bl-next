/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: ["src", "cypress"],
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL ?? "http://localhost:1337/",
    BL_WEB_URL: process.env.BL_WEB_URL ?? "http://localhost:4200/",
  },
};
