//配置路由
import Vue from "vue"
import VueRouter from "vue-router"
//使用插件
Vue.use(VueRouter)


//引入router路由信息
import routes from "@/router/routes"

//引入store
import store from "@/store/index"


//先把VueRouter原型对象的push,先保存一份
let originPush = VueRouter.prototype.push;
let originreplace = VueRouter.prototype.replace;
//重写push|replace
//第一个参数:告诉原来的push方法,你往哪里跳,传递哪些参数
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originreplace.call(this, location, resolve, reject)
  } else {
    originreplace.call(this, location, () => {}, () => {})
  }
}

//向外暴露于并且配置路由
let router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return {
      y: 0
    }
  },
})


//全局守卫,前置守卫(在路由跳转之间进行判断)
router.beforeEach(async (to, from, next) => {
  //获取用户信息
  let name = store.state.user.userInfo.name
  //判断用户登录
  if (store.state.user.token) {
    //用户登录了还想去login  不可以
    if (to.path == "/login" || to.path == "/register") {
      next("/home")
    } else {
      //登录了  去的不是login
      if (name) {
        next()
      } else {
        try {
          //没有用户信息  需要派发action  再跳转
          await store.dispatch("getUserInfo")
          next()
        } catch (error) {
          //token失效了  清除token  清除信息  回到登录页
          store.dispatch("userLogOut")
        }
      }
    }
  } else {
    // next()
    //未登录不能去交易页 pay paysuccess center
    let toPath = to.path
    if (toPath.indexOf("/trade") != -1 || toPath.indexOf("/pay") != -1 || toPath.indexOf('/center') != -1) {
      //存在query参数中带过去  再进行判断
      next("/login?redirect=" + toPath)
    } else {
      //其他地方都可
      next()
    }
  }
})



export default router