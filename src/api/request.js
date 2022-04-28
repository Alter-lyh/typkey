import axios from 'axios'
// import vm from '@/main.js'
// import loading from '@/libs/loading.js'

// 超时时间
axios.defaults.timeout = 15000
// http请求拦截器
axios.interceptors.request.use(config => {
    // loading.open()
        return config
    }, error => {
    
    return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
    // loading.close()
    // let json = data.data
    // if(json.error == '403') {
    //     vm.$router.replace({ path: '/login' })
    // }
    // loadinginstace.close()
    return data
    }, error => {
        // loadinginstace.close()
        
    return Promise.reject(error)
})

export default axios
