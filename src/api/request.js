//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//引入进度条的样式
import "nprogress/nprogress.css"
//start表示开始   done表示结束

//在当前模块引入store
import store from "@/store";

//1:利用axios对象的方法create,去创建一个axios实例
//requests就是配置好的axios
const requests = axios.create({
  baseURL: "/api", //基础路径
  timeout: 5000, //超时时间5s
})

//请求拦截器
requests.interceptors.request.use((config) => {
  //配置对象,里面有个headers请求头
  //进度条开始动
  if (store.state.detail.uuid_token) {
    //给请求头添加一个字段
    config.headers.userTempId = store.state.detail.uuid_token
  }
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  nprogress.start()
  return config;
})

//响应拦截器
requests.interceptors.response.use((res) => {
  //成功的回调函数\
  //进度条结束
  nprogress.done()
  return res.data
}, (error) => {
  //失败的回调
  return Promise.reject(new Error("fail"))
})

//向外暴露
export default requests;