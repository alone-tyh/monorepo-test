const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // 查找到 babel-loader 的配置
      const babelLoader = webpackConfig.module.rules.find(rule => rule.oneOf).oneOf.find(
        rule => rule.loader && rule.loader.includes('babel-loader')
      );

      console.log('查看地址', path.join(__dirname, '../../node_modules/@monorepo-test'));
      // 允许 babel-loader 编译 node_modules 中的库
      babelLoader.include = [
        path.join(__dirname, 'src'), // 源文件目录
        path.join(__dirname, '../../node_modules/@monorepo-test'), // 需要编译的第三方库
      ];

      webpackConfig.resolve.plugins.forEach(plugin => {
        if (plugin?.constructor.name === 'ModuleScopePlugin') {
          plugin?.allowedFiles?.add(path.join(__dirname, '../../node_modules/@monorepo-test'));
        }
      });

      return webpackConfig;
    },
  },
};
