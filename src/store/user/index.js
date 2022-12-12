//登录与注册的模块
import { reqCode, reqRegister, reqLogin, loginCheck, loginOut } from '@/api/index'
// 引入token
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {
    //验证码
    code: '',
    // token
    token: getToken(),
    // 用户信息
    userInfo: {}
}
const mutations = {
    // 获取验证码
    SENDCODE(state, code) {
        state.code = code
    },
    // 用户登录--获取token
    USERLOGIN(state, token) {
        state.token = token
    },
    // 用户校验--获取用户信息
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    // 退出登录 清空数据
    CLEAR(state) {
        // 仓库中用户信息清空
        state.token = '';
        state.userInfo = {};
        // 本地存储清空
        removeToken();
    }
}
const actions = {
    // 获取验证码
    async sendCode({ commit }, phone) {
        let result = await reqCode(phone);
        if (result.data.code == 200) {
            commit('SENDCODE', result.data.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册
    async sendRegisterInfo({ commit }, info) {
        let result = await reqRegister(info)
        if (result.data.code == 200) {
            return "OK";
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
    // 用户登录--token
    async userLogin({ commit }, info) {
        let result = await reqLogin(info);
        if (result.data.code == 200) {
            // 服务器下发token --用户唯一标识
            commit('USERLOGIN', result.data.data.token);
            // 持久化存储
            setToken(result.data.data.token);
            return "OK";
        } else {
            return Promise.reject(new Error("faile"));
        }

    },
    // 用户校验 -- 带着用户token（写在请求头里） 获取用户信息
    async getUserInfo({ commit }) {
        let result = await loginCheck();
        if (result.data.code == 200) {
            // 提交用户信息
            commit('GETUSERINFO', result.data.data)
            return "OK";
        } else {
            return Promise.reject(result.message);
        }
    },
    // 退出登录
    async userLogout({ commit }) {
        // 只是向服务器发起一次请求 同时服务器清除token
        let result = await loginOut();
        // 还要通知mutation清空state
        if (result.data.code == 200) {
            commit('CLEAR')
            return "OK";
        } else {
            return Promise.reject(new Error("faile"));
        }
    }

}
const getters = {};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}