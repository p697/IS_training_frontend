import axios from 'axios'
import { message } from 'antd'

export const config = {
  baseUrl: "http://127.0.0.1:8080"
}

const baseOptions = ({ path, data, params, method, headers }) => axios({
  method,
  headers,
  data,
  params,
  url: config.baseUrl + path,
  withCredentials: true,
})
.then(res => {
  if (res.status !== 200) {
    throw new Error(`请求响应HTTP状态码：${res.status}`)
  }
  else if (!res.data.data) {
    throw new Error(`返回值data为${res.data.data}`)
  }
  return res.data
})
.catch(e => {
  console.log(e)
  message.error('网络错误')
  return { success: false, data: { list: [] } }
})

const get = (path, params, headers={}) => baseOptions({
  path,
  params,
  method: 'get',
  headers,
})

const post = (path, params, headers={}) => baseOptions({
  path,
  params,
  method: 'post',
  headers: {
    ...headers,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
})

const DELETE = (path, params) => baseOptions({
  path,
  params,
  method: 'delete',
})

export {
  get,
  post,
  DELETE,
}
