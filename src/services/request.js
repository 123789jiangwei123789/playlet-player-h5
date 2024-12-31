import axios from 'axios'
import { Toast } from 'vant'
// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base api url + request url
    timeout: 6000 // request timeout
})

// request拦截器 request interceptor
service.interceptors.request.use(
    config => {
        // 不传递默认开启loading
        if (config.hideloading) {
            // loading
            Toast.loading({
                forbidClick: true
            })
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)
// respone拦截器
service.interceptors.response.use(
    response => {
        Toast.clear()
        const res = response.data
        if (res.status && res.status !== 200) {
            return Promise.reject(res || 'error')
        } else {
            return Promise.resolve(res)
        }
    },
    error => {
        Toast.clear()
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default service