import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogOut
} from "@/api/index"

const actions = {
  //获取验证码
  async getCode(context, phone) {
    let result = await reqGetCode(phone)
    // console.log(result)
    if (result.code == 200) {
      context.commit("GETCODE", result.data)
      return "ok"
    } else {
      return Promise.reject(new Error("fail"))
    }
  },
  //用户注册
  async userRegister(context, user) {
    let result = await reqUserRegister(user)
    if (result.code == 200) {
      return "ok"
    } else {
      return Promise.reject(new Error("fail"))
    }
  },
  //登录页
  async userLogin(context, data) {
    let result = await reqUserLogin(data)
    // console.log(result)
    if (result.code) {
      context.commit("USERLOGIN", result.data.token)
      //持久化存储token
      localStorage.setItem("TOKEN", result.data.token)
    } else {
      return Promise.reject(new Error("fail"))
    }
  },
  //获取用户信息
  async getUserInfo(context) {
    let result = await reqUserInfo()
    if (result.code == 200) {
      context.commit("GETUSERINFO", result.data)
      return "ok"
    } else {
      return Promise.reject(new Error("fail"))
    }
  },
  //退出登录
  async userLogOut(context) {
    let result = await reqLogOut()
    if (result.code == 200) {
      //去清除数据
      context.commit("USERLOGOUT")
      return "ok"
    } else {
      return Promise.reject(new Error("fail"))
    }
  }

}
const mutations = {
  GETCODE(state, value) {
    state.code = value
  },
  USERLOGIN(state, value) {
    state.token = value
  },
  GETUSERINFO(state, value) {
    state.userInfo = value
  },
  //退出登录清除本地数据
  USERLOGOUT(state) {
    state.userInfo = {},
      state.token = ""
    localStorage.removeItem("TOKEN")
  }
}
const state = {
  code: "",
  token: localStorage.getItem("TOKEN"),
  userInfo: {}
}
const getters = {}
export default {
  actions,
  mutations,
  state,
  getters
}