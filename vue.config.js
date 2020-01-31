module.exports  ={
    configureWebpack:{
        resolve:{
          alias:{
            'src':'@',
            'assets':'src/assets',
            'components':'@/components',
            'network':'@/network',
            'views':'@/views'
          }
        }
    },
  runtimeCompiler: true,
  publicPath: '/', // 设置打包文件相对路径
  devServer: {
    // open: process.platform === 'darwin',
    // host: 'localhost',
    port: 3000,
    // open: true, //配置自动启动浏览器
    proxy: {
      '/qiantai': {
        target: 'http://localhost:8080', //对应自己的接口
        changeOrigin: true,
        ws: true,

      }
    }
  },
}
