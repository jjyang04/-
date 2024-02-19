const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  devServer: {
    client: {
      overlay: true,
    },
    port: 4000,
    proxy: {
      "/api": {
        target: "http://47.95.13.131:8081",
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
    },
  },
};
