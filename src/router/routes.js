//引入一级路由组件
// import Home from "@/pages/Home"
// import Login from "@/pages/Login"
// import Register from "@/pages/Register"
// import Search from "@/pages/Search"
// import Detail from "@/pages/Detail"
// import AddCartSuccess from "@/pages/AddCartSuccess"
// import ShopCart from "@/pages/ShopCart"
// import Trade from "@/pages/Trade"
// import Pay from "@/pages/Pay"
// import PaySuccess from "@/pages/PaySuccess"
// import Center from "@/pages/Center"

//引入二级路由
// import MyOrder from "@/pages/Center/myOrder/index.vue"
// import GroupOrder from "@/pages/Center/groupOrder"

export default [{
    name: "home",
    path: "/home",
    component: () => import("@/pages/Home"),
    //是否显示footer
    meta: {
      show: true
    }
  },
  {
    name: "login",
    path: "/login",
    component: () => import("@/pages/Login"),
    meta: {
      show: false
    }
  },
  {
    name: "register",
    path: "/register",
    component: () => import("@/pages/Register"),
    meta: {
      show: false
    }
  },
  {
    name: "search",
    path: "/search/:keyword?",
    component: () => import("@/pages/Search"),
    meta: {
      show: true
    }
  },
  {
    name: "detail",
    path: "/detail/:skuid",
    component: () => import("@/pages/Detail"),
    meta: {
      show: true
    }
  },
  {
    name: "addCartSuccess",
    path: "/addCartSuccess",
    component: () => import("@/pages/AddCartSuccess"),
    meta: {
      show: true
    }
  },
  {
    name: "shopCart",
    path: "/shopCart",
    component: () => import("@/pages/ShopCart"),
    meta: {
      show: true
    }
  },
  {
    name: "trade",
    path: "/trade",
    component: () => import("@/pages/Trade"),
    meta: {
      show: true
    },
    beforeEnter(to, from, next) {
      if (from.path == "/shopCart") {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    name: "paysuccess",
    path: "/paysuccess",
    component: () => import("@/pages/PaySuccess"),
    meta: {
      show: true
    },
    beforeEnter(to, from, next) {
      if (from.path == "/pay") {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    name: "pay",
    path: "/pay",
    component: () => import("@/pages/Pay"),
    meta: {
      show: true
    },
    beforeEnter(to, from, next) {
      if (from.path == "/trade") {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    name: "center",
    path: "/center",
    component: () => import("@/pages/Center"),
    meta: {
      show: true
    },
    children: [{
        name: "grouporder",
        path: "grouporder",
        component: () => import("@/pages/Center/groupOrder")
      },
      {
        name: "myorder",
        path: "myorder",
        component: () => import("@/pages/Center/myOrder")
      },
      {
        path: "/center",
        redirect: "/center/myorder"
      }
    ]
  },

  //重定向
  //在项目初始的时候  访问的页面
  {
    path: "*",
    redirect: "/home"
  }
]