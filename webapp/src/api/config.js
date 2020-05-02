import axios from 'axios'

export const baseUrl = 'http://localhost:4000'

// 配置baseURL为基础请求头，后续只需要写上路由，请求的时候就会把baseURL拼接起来发送请求
const axiosInstance = axios.create({
  baseURL: baseUrl
})

axiosInstance.interceptors.response.use(
  res => res.data,
  err => {
    console.log(err, '网络错误')
  }
)

export {
  axiosInstance
}