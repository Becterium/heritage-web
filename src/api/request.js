import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例
const service = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 15000
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 从localStorage获取token
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    error => {
        console.error('请求错误:', error)
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data

        // 如果返回的状态码不是200，说明接口请求有误
        if (response.status !== 200) {
            ElMessage({
                message: res.message || '请求错误',
                type: 'error',
                duration: 5 * 1000
            })

            // 401: 未登录或token过期
            if (response.status === 401) {
                // 重新登录
                localStorage.removeItem('token')
                window.location.href = '/login'
            }

            return Promise.reject(new Error(res.message || '请求错误'))
        } else {
            return res
        }
    },
    error => {
        console.error('响应错误:', error)

        // 处理网络错误
        let message = '网络错误，请稍后重试'
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    message = '请求错误'
                    break
                case 401:
                    message = '未授权，请重新登录'
                    // 清除token并跳转登录页
                    localStorage.removeItem('token')
                    window.location.href = '/login'
                    break
                case 403:
                    message = '拒绝访问'
                    break
                case 404:
                    message = '请求地址出错'
                    break
                case 408:
                    message = '请求超时'
                    break
                case 500:
                    message = '服务器内部错误'
                    break
                case 501:
                    message = '服务未实现'
                    break
                case 502:
                    message = '网关错误'
                    break
                case 503:
                    message = '服务不可用'
                    break
                case 504:
                    message = '网关超时'
                    break
                case 505:
                    message = 'HTTP版本不受支持'
                    break
                default:
                    message = `连接错误${error.response.status}`
            }
        }

        ElMessage({
            message: message,
            type: 'error',
            duration: 5 * 1000
        })

        return Promise.reject(error)
    }
)

// 封装GET请求
export function get(url, params = {}) {
    return service({
        url,
        method: 'get',
        params
    })
}

// 封装POST请求
export function post(url, data = {}) {
    return service({
        url,
        method: 'post',
        data
    })
}

// 封装PUT请求
export function put(url, data = {}) {
    return service({
        url,
        method: 'put',
        data
    })
}

// 封装DELETE请求
export function del(url, params = {}) {
    return service({
        url,
        method: 'delete',
        params
    })
}

export default service