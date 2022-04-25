import Vue from 'vue'
import App from './App.vue'

//引入路由
import router from "@/router"

//引入vuex
import store from '@/store'
//引入所有api请求
import * as API from "@/api/index"

//三级联动组件 - 全局组件
import TypeNav from "@/components/TypeNav"
import Carousel from "@/components/Carousel"
import Pagination from "@/components/pagination"
//引入element-ui
import {
  MessageBox
} from "element-ui"
//挂载在原型上引入
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入懒加载
import VueLazyload from 'vue-lazyload'
import mouse from "@/assets/1.gif"
//注册插件
Vue.use(VueLazyload, {
  loading: mouse,
})
//注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
//引入mockServe.js
import "@/mock/mockServe"
//引入swiper样式
import "swiper/css/swiper.css"

//引入vee-validate  校验插件
import "@/plugins/validate"
//关闭生产提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this,
      //挂载到原型对象上面
      Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')