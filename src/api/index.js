//当前这个模块:API进行统一管理
import requests from "./request";

import mockRequest from "./mockAjax"

//三级联动的接口
//  /api/product/getBaseCategoryList  get请求  无参数
export const reqCategoryList = () => {
  //发送axios请求
  return requests({
    url: "/product/getBaseCategoryList",
    method: "get"
  })
}

//获取banner(home首页轮播图的接口)
export const reqGetBannerList = () => {
  return mockRequest({
    url: "/banner",
    method: "get"
  })
}

//获取floor组件的数据
export const reqGetFloorList = () => {
  return mockRequest({
    url: "/floor",
    method: "get"
  })
}

//获取搜索模块的数据  地址:/api/list  post请求  带参数
//这个给服务器传递一个默认的数据  至少是个空对象
export const reqGetSearchInfo = (params) => {
  return requests({
    url: "/list",
    method: "post",
    data: params
  })
}

//获取产品相详情信息的接口  /api/item/{ skuId }  get
export const reqGetDetailList = (skuId) => {
  return requests({
    url: `/item/${skuId}`,
    method: "get",
  })
}

//将产品添加到购物车中(获取更新的某一个产品个数)
//    /api/cart/addToCart/{ skuId }/{ skuNum }  post  带参数
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post"
  })
}

//获取购物车列表数据接口
//URL:/api/cart/cartList  method：get 
export const reqCartList = () => {
  return requests({
    url: "/cart/cartList",
    method: "get"
  })
}

//删除购物车产品 
///api/cart/deleteCart/{skuId}  delete
export const reqDeleteCartListById = (skuId) => {
  return requests({
    url: `/cart/deleteCart/${skuId}`,
    method: "delete"
  })
}

//修改商品选中状态
///api/cart/checkCart/{skuID}/{isChecked}  get
export const reqUppdateCheckedById = (skuID, isChecked) => {
  return requests({
    url: `/cart/checkCart/${skuID}/${isChecked}`,
    method: "get"
  })
}

//获取验证码
///api/user/passport/sendCode/{phone}  get
export const reqGetCode = (phone) => {
  return requests({
    url: `/user/passport/sendCode/${phone}`,
    method: "get"
  })
}

//注册接口
///api/user/passport/register post  phone password code
export const reqUserRegister = (data) => {
  return requests({
    url: "/user/passport/register",
    data,
    method: "post"
  })
}

//登录接口
///api/user/passport/login   post phone password
export const reqUserLogin = (data) => {
  return requests({
    data,
    url: "/user/passport/login",
    method: "post"
  })
}

//获取用户信息  需要带token   请求头带
///api/user/passport/auth/getUserInfo
export const reqUserInfo = () => {
  return requests({
    url: "/user/passport/auth/getUserInfo",
    method: "get",
  })
}

//退出登录
///api/user/passport/logout  get
export const reqLogOut = () => {
  return requests({
    url: "/user/passport/logout",
    method: "get"
  })
}

//获取用户地址信息
///api/user / userAddress / auth / findUserAddressList
export const reqAddressInfo = () => {
  return requests({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get"
  })
}

//获取订单交易信息
///api/order/auth/trade get
export const reqOrderInfo = () => {
  return requests({
    url: "/order/auth/trade",
    method: "get"
  })
}

//提价订单 发送请求
///api/order/auth/submitOrder?tradeNo={tradeNo}  post
export const reqSubmitOrder = (tradeNo, data) => {
  return requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'post'
  })
}

//获取订单支付信息
///api/payment/weixin/createNative/{orderId}  get
export const reqPayInfo = (orderId) => {
  return requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get"
  })
}

//获取支付订单状态
///api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) => {
  return requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get"
  })
}

//获取个人中心的数据
///api/order/auth/{page}/{limit}  get
export const reqMyOrderList = (page, limit) => {
  return requests({
    url: `/order/auth/${page}/${limit}`,
    method: "get"
  })
}