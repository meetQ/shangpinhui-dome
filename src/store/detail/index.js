//引入axios请求
import {
  reqGetDetailList,
  reqAddOrUpdateShopCart
} from "@/api/index"

//引入封装好的uuid函数
import {
  getUUID
} from "@/utils/uuid_token"
//detail仓库
const actions = {
  //获取产品信息的action
  async getGoodInfo(context, skuId) {
    let result = await reqGetDetailList(skuId)
    if (result.code == 200) {
      context.commit("GETGOODINFO", result.data)
    }
  },
  //将产品添加到购物车中
  async addOrUpdateShopCart(context, {
    skuId,
    skuNum
  }) {
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    //代表服务器加入购物车成功
    if (result.code == 200) {
      return "ok"
    } else {
      //代表失败
      return result.code
    }
  }
};

const mutations = {
  GETGOODINFO(state, value) {
    state.goodInfo = value
  }
}

const state = {
  goodInfo: {},
  //游客临时身份 
  uuid_token: getUUID()
}

const getters = {
  //简化导航路径
  categoryView(state) {
    return state.goodInfo.categoryView || {}
  },
  //简化内容区
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  //简化售卖属性
  spuSaleAttrList() {
    return state.goodInfo.spuSaleAttrList || []
  }

}

export default {
  actions,
  mutations,
  state,
  getters

}