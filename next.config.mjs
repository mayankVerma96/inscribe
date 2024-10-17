/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false, // Optionally disable SVGO optimizations if you experience issues
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
