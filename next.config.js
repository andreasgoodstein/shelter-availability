/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  /* config options here */
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        react: "preact/compat",
        "react-dom": "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
      };
    }

    return config;
  },
};

module.exports = nextConfig;
