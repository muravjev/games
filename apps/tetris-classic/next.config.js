const path = require('path');
const jsonImporter = require('@indigotree/dart-sass-json-importer');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    trailingSlash: true,
    images: {
        unoptimized: true
    },
    experimental: {
        externalDir: true //< for workspaces
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'src/styles')],
        prependData: `@import 'core';`,
        importer: jsonImporter()
    },
    poweredByHeader: false,
    webpack: config => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack']
        });
        return config;
    },
    eslint: {
        dirs: ['src'],
        ignoreDuringBuilds: true
    }
};

module.exports = nextConfig;
