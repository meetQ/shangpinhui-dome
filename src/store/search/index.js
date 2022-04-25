//引入axiox的方法
import {
  reqGetSearchInfo
} from "@/api";

//search仓库
const actions = {
  //获取search模块数据
  async getSearchList(context, value = {}) {
    //当前这个函数  至少传递一个参数(空对象)
    let result = await reqGetSearchInfo(value)
    if (result.code == 200) {
      context.commit("GETSEARCHLIST", result.data)
    }
  }
};

const mutations = {
  GETSEARCHLIST(state, value) {
    state.searchList = value
  }
}

const state = {
  searchList: {}
}
//计算属性
//项目中getters主要的作用是:简化仓库中的数据
const getters = {
  goodsList(state) {
    //以防万一 备一个空数组
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList
  },
  attrsList(state) {
    return state.searchList.attrsList
  }


}

export default {
  actions,
  mutations,
  state,
  getters

}