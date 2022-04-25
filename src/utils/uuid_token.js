//引入uuid
import {
  v4 as uuidv4
} from 'uuid';

//随机生成一个字符串,且每次执行不能发生变化
export const getUUID = () => {
  //先拉取一次
  let uuid_token = localStorage.getItem("UUIDTOKEN")
  //没有的话
  if (!uuid_token) {
    uuid_token = uuidv4()
    //存储进去
    localStorage.setItem("UUIDTOKEN", uuid_token)
  }
  return uuid_token
}