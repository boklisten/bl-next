/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: ["pages", "utils", "components", "__tests__", "cypress"],
  },
};
