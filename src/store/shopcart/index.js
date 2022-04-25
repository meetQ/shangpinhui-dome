//引入axios的方法
import {
  reqCartList,
  reqDeleteCartListById,
  reqUppdateCheckedById
} from "@/api";

//购物车仓库
const actions = {
  //获取购物车列表数据
  async getCartList(context) {
    let result = await reqCartList();
    if (result.code == 200) {
      context.commit("GETCARTLIST", result.data)
    }
  },
  //删除购物车某一个产品
  async deleteCartListBySkuId(context, skuId) {
    let result = await reqDeleteCartListById(skuId)
    if (result.code == 200) {
      return "ok"
    } else {
      return Promise.reject(new Error("fail"))
    }
  },
  //修改购物车某一个产品的选中状态
  async updateCheckedById(context, {
    skuId,
    isChecked
  }) {
    let result = await reqUppdateCheckedById(skuId, isChecked)
    // console.log(result)
    if (result.code == 200) {
      return "ok"
    } else {
      return Promise.reject(new Error("fail"))
    }
  },
  //删除全部选中的商品
  deleteAllCheckedCart({
    dispatch,
    getters
  }) {
    let PromiseArr = []
    //获取购物车的全部产品
    getters.cartList.cartInfoList.forEach(item => {
      if (item.isChecked == 1) {
        let result = dispatch("deleteCartListBySkuId", item.skuId)
        PromiseArr.push(result)
      }
    });
    //成功则成功  有一个失败则失败
    return Promise.all(PromiseArr)
  },
  //修改全部产品的状态
  updateAllCartChecked(context, isChecked) {
    let promiseAll = []
    context.getters.cartList.cartInfoList.forEach((item) => {
      let result = context.dispatch("updateCheckedById", {
        skuId: item.skuId,
        isChecked
      })
      promiseAll.push(result)
    })
    return Promise.all(promiseAll)
  }
};

const mutations = {
  GETCARTLIST(state, value) {
    state.cartList = value
  }
}

const state = {
  cartList: []
}
//计算属性
//项目中getters主要的作用是:简化仓库中的数据
const getters = {
  cartList() {
    return state.cartList[0] || {}
  },
}

export default {
  actions,
  mutations,
  state,
  getters

}