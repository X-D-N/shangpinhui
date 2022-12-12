import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store"
// 使用插件
Vue.use(VueRouter);

//重写push replace
// 先把VueRouter原型对象的push replace保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
/* call与apply区别：
    相同点：都可以调用函数一次 篡改函数上下文一次
    区别：call传递参数用逗号隔开 apply传递数组 */
// location:往哪里跳转
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}

VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
};
// 创建实例 配置路由
let router = new VueRouter({
    routes,
    //处理路由切换的时候滚动条位置问题
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});

// 全局路由守卫 前置守卫 （在路由跳转之前进行判断）
router.beforeEach(async(to, from, next) => {
    // to: 跳转到的路由
    // from: 从哪来的路由
    // next: 放行  next(path) 放行到指定的路由
    //获取token
    let token = store.state.user.token;
    // 获取用户信息
    let name = store.state.user.userInfo.name;
    if (token) {
        // 用户已经登录了
        if (to.path == '/login' || to.path == '/register') {
            // 停留在首页
            next('/');
        } else {
            // 去其他页面
            // 如果有用户名
            if (name) {
                next()
            } else {
                // 没有用户名 派发action 让仓库存储信息
                try {
                    // 获取用户信息成功
                    await store.dispatch('user/getUserInfo')
                    next()
                } catch (error) {
                    // token过期
                    // 清空token数据
                    await store.dispatch('user/userLogout');
                    next('/login')
                }
            }
        }
    } else {
        // 用户未登录 未登录不能去支付相关 、个人中心
        let toPath = to.path;
        if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/center') !== -1) {
            next("/login?redirect=" + toPath);
        } else {
            next()
        }
    }

})

export default router;