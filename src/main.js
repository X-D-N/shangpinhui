import Vue from 'vue'
import App from './App.vue'

// 全局组件
// 三级联动
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav);
//  轮播图
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel);
// 分页器
import Pagination from '@/components/Pagination';
Vue.component(Pagination.name, Pagination);

// 引入路由
import router from '@/routes/index'
// 引入仓库
import store from '@/store/index'
// 引入mockServe.js --模拟数据
import '@/mock/mockServe';
// 引入swiper轮播图样式
import 'swiper/css/swiper.css';
// 引入统一接口中api文件中全部请求函数
// 统一引入
import * as API from '@/api/index'
// 使用element-ui 展示支付二维码
import { MessageBox } from 'element-ui'
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//图片懒加载
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload);
//图片懒加载过渡图片
const loadimage = require('@/assets/image/loading.gif')
Vue.use(VueLazyload, {
    preLoad: 1.3,
    // error: errorimage,//出错的图片
    loading: loadimage,
    attempt: 1 //加载错误后最大尝试次数
})

//表单验证
import "@/plugins/validate";

// 关闭生产提示
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    // 绑定全局事件
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$API = API;
    },
    // 注册路由
    router,
    // 注册仓库
    store
}).$mount('#app')