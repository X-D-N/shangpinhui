// 交易模块
import { reqAddressInfo, reqTradeInfo } from '@/api/index'
const state = {
    // 用户地址
    address: [],
    // 商品清单数据
    orderInfo: {}
};
const mutations = {
    // 获取用户地址
    GETUSERADDRESS(state, address) {
        state.address = address
    },
    // 获取商品清单数据
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
};
const actions = {
    // 获取用户地址
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo();
        if (result.data.code == 200) {
            commit('GETUSERADDRESS', result.data.data)
        }
    },
    // 获取商品清单数据
    async getOrderInfo({ commit }) {
        let result = await reqTradeInfo();
        if (result.data.code == 200) {
            commit('GETORDERINFO', result.data.data)
        }
    },
};
const getters = {};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}