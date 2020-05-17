const path = require('path');

function resolve (dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    devServer: {
        port: 9999
    },
    lintOnSave: true,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@request', resolve('src/httpRequest'))
            .set('@service', resolve('src/service'))
            .set('@assets', resolve('src/assets'))
            .set('@api', resolve('src/assets/api/api.js'))
    }
}