import { reqDetailInfo, reqAddOrUpdateCart } from '@/api/index'
const state = {
    // 商品详细信息
    goodInfo: {}
}
const mutations = {
    DETAILINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    },
}
const actions = {
    // 获取商品详情
    async getDetailInfo({ commit }, skuId) {
        // 发送ajax请求
        const result = await reqDetailInfo(skuId);
        if (result.data.code == 200) {
            commit("DETAILINFO", result.data.data);
        }
    },
    // 购物车添加判断 解构赋值
    async getAddOrUpdateCart({ commit }, { skuId, skuNum }) {
        // 服务器并没有返回其他数据 因此不需要三连环存储数据
        let result = await reqAddOrUpdateCart(skuId, skuNum);
        if (result.data.code == 200) {
            return "OK";
        } else {
            return Promise.reject(new Error("failed"));
        }
    },
}
const getters = {
    // 面包屑数据
    categoryView(state) {
        return state.goodInfo.categoryView || {};
    },
    // 商品详情
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    // 商品售卖属性
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}