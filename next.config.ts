import { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    // Add a rule to handle worker-loader for onnxjs
    if (!isServer) {
      config.module.rules.push({
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' },
      });
    }

    return config;
  },
};

export default nextConfig;
