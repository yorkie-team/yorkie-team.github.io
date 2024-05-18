/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'custom',
    imageSizes: [128, 256, 384],
    deviceSizes: [640, 750, 1080, 1200, 1920, 2048, 3840],
  },
  env: {
    nextImageExportOptimizer_imageFolderPath: 'public/assets/images',
    nextImageExportOptimizer_exportFolderPath: 'out',
    nextImageExportOptimizer_quality: 75,
    nextImageExportOptimizer_storePicturesInWEBP: true,
    nextImageExportOptimizer_generateAndUseBlurImages: true,
    NEXT_PUBLIC_BUILT_AT: new Date().toUTCString(),
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false,
          },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
