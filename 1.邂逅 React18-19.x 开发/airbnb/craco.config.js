// 这是通过 node 加载的配置文件，所以需要使用 module.exports 导出配置项
const path = require("path");

// 配置less
const CracoLessPlugin = require("craco-less");

const resolve = (pathname) => path.resolve(__dirname, pathname);

module.exports = {
  // less配置
  plugins: [
    {
      plugin: CracoLessPlugin,
    },
  ],

  // 对原来的webpack的某一个东西进行修改
  webpack: {
    // 配置别名
    alias: {
      // 当前文件绝对路径和src拼接
      "@": resolve("src"),
    },
  },
};
