const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const buildDate = JSON.stringify(new Date().toLocaleString());

function resolve(dir) {
  return path.join(__dirname, dir);
}
const tempPlus = [];

//如果是生产环境
if (isProd) {
  tempPlus.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
  tempPlus.push(
    new webpack.DefinePlugin({
      APP_VERSION: `"${require('./package.json').version}"`,
      // GIT_HASH: JSON.stringify(GitRevision.version()),
      BUILD_DATE: buildDate,
    }),
  );
  tempPlus.push(
    new CompressionPlugin({
      test: /\.js$|\.html$|\.json$|\.css/, // 匹配文件名
      algorithm: 'gzip',
      threshold: 10240, // 对超过10k的数据压缩
      minRatio: 0.8,
    }),
  );
}

module.exports = {
  configureWebpack: {
    devtool: !isProd ? 'source-map' : '',
    plugins: [...tempPlus],
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme
          'primary-color': '#0088D2',
          // 'link-color': '#F5222D',
          // 'border-radius-base': '2px'
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true,
      },
    },
  },
  lintOnSave: false, // elint校验  true ｜ false | error
  publicPath: isProd ? '/' : '/', // 静态资源前缀
  devServer: {
    port: 9999, // 端口
    proxy: {
      // 代理
      '/yst-yh': {
        target: 'http://127.0.0.1:8080',
        ws: false,
        changeOrigin: true,
        /*        pathRewrite: {
                '^/yst-yh': '/yst-yh'       // 把 /api 开头的路径替换为 ''
              }*/
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@store', resolve('src/store'))
      .set('@request', resolve('src/httpRequest'))
      .set('@service', resolve('src/service'))
      .set('@assets', resolve('src/assets'))
      .set('@api', resolve('src/config/api/api.js'))
      .set('@components', resolve('src/components'));
  },
};
