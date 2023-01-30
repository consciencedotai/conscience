/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
}

require("dotenv").config()

module.exports = {
    nextConfig,
    env: {
        MONGODB_URI: process.env.MONGODB_URI
    }
}
