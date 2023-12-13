/** @type {import('next').NextConfig} */

import bundleAnalyzer from '@next/bundle-analyzer';
import stylexPlugin from '@stylexjs/nextjs-plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
    reactStrictMode: false,
    eslint: {
      ignoreDuringBuilds: true,
    },
    experimental: {
      optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
    pageExtensions: ["js", "jsx", "ts", "tsx", "json"],
  }

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default stylexPlugin({
  rootDir: __dirname,
})(
  withBundleAnalyzer(nextConfig)
);
