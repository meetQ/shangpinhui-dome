import {
  reqAddressInfo,
  reqOrderInfo
} from "@/api/index"


const actions = {
  //获取用户地址信息
  async getUserAddress(context) {
    let result = await reqAddressInfo()
    // console.log(result)
    if (result.code = 200) {
      context.commit("GETUSERADDRESS", result.data)
    }
  },
  //获取商品清单
  async getOrderInfo(context) {
    let result = await reqOrderInfo()
    if (result.code == 200) {
      context.commit("GETORDERINFO", result.data)
    }
  }
}
const mutations = {
  GETUSERADDRESS(state, value) {
    state.address = value
  },
  GETORDERINFO(state, value) {
    state.orderInfo = value
  }

}
const state = {
  //地址信息
  address: [],
  orderInfo: {}
}
const getters = {}
export default {
  actions,
  mutations,
  state,
  getters
}