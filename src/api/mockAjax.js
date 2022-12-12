import axios from "axios";
//引入进度条  start:进度条开始  done:进度条结束
import nprogress from "nprogress";
// 引入进度条样式  可以修改样式
import 'nprogress/nprogress.css';

// 利用axios对象的方法create 创建一个axios实例
// request 就是 axios 只不过稍微配置一下
const requests = axios.create({
    // 基础路径 
    baseURL: '/mock',
    // 请求超时时间
    timeout: 5000
})

// 请求拦截器：在发请求之前可以检测到
requests.interceptors.request.use(function(config) {
    // 进度条开始动
    nprogress.start();
    return config;
});
//响应拦截器：
requests.interceptors.response.use(function(response) {
    // 成功的回调
    // 进度条结束
    nprogress.done();
    return response;
}, function(error) {
    //失败的回调
    // 终止promise链
    return Promise.reject(new Error('faile'));
});

export default requests;