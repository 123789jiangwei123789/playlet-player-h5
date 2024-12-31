const { defineConfig } = require('@vue/cli-service')
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  devServer: {
    port: 8888, // 端口
    open: false, // 启动后打开浏览器
    client: {
      overlay: {
        //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
        warnings: false,
        errors: true
      }
    }
    // proxy: {
    //   //配置跨域
    //   '/api': {
    //       target: "https://test.xxx.com",
    //       // ws:true,
    //       changOrigin:true,
    //       pathRewrite:{
    //           '^/api':'/'
    //       }
    //   }
    // }
  },
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            autoprefixer(),
            pxtorem({
              rootValue: 50,
              propList: ['*'],
              unitPrecision: 5,
              selectorBlackList: ['van-', '#app'], // 将哪些html元素排除在外，我这里添加了一个vant的
              exclude: /node_modules/i,
            })
          ]
        }
      },
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        additionalData: ``
      }
    }
  },
  chainWebpack(config) {
    config.optimization.minimizer('terser').tap((args) => {
      args[0].parallel = 4
      args[0].terserOptions.compress.warnings = true
      args[0].terserOptions.compress.drop_debugger = true
      args[0].terserOptions.compress.drop_console = true
      return args
    })
  }
})
