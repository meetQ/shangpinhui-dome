//引入vuex 并且使用
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

//引入小仓库
import home from "./home"
import search from "./search"
import detail from "./detail"
import shopcart from "./shopcart"
import user from "./user"
import trade from "./trade"

//对外暴露vuex.store的实例
export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade
  }
})