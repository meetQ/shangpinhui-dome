//引入axios里面的数据方法
import {
  reqCategoryList,
  reqGetBannerList,
  reqGetFloorList
} from "@/api"
//home仓库
const actions = {
  async categoryList(context) {
    let result = await reqCategoryList()
    if (result.code == 200) {
      context.commit("CATEGORYLIST", result.data)
    }
  },
  //获取首页轮播图的数据
  async getBannerList(context) {
    let result = await reqGetBannerList()
    if (result.code == 200) {
      context.commit("GETBANNERLIST", result.data)
    }
  },
  //获取floor组件的数据
  async getFloorList(context) {
    let result = await reqGetFloorList()
    if (result.code == 200) {
      context.commit("GETFLOORLIST", result.data)
    }
  }
};

const mutations = {
  CATEGORYLIST(state, value) {
    state.categoryList = value
  },

  //获取首页轮播图的数据
  GETBANNERLIST(state, value) {
    state.bannerList = value
  },

  //获取floor组件的数据
  GETFLOORLIST(state, value) {
    state.floorList = value
  }
}

const state = {
  //三级菜单数据
  categoryList: [],
  //轮播图数据
  bannerList: [],
  //floor组件的数据
  floorList: []
}

const getters = {

}

export default {
  actions,
  mutations,
  state,
  getters

}