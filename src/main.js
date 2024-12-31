import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 全局引入按需引入UI库 vant
import '@/plugins/vant'
import '@/plugins/rem.js'
import "@/assets/styles/index.scss"
import "@/assets/iconfont/iconfont.css"

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
