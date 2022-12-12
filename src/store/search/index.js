import { reqGetSearchInfo } from '@/api'
const state = {
    searchList: {}
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
}
const actions = {
    // 获取搜索模块数据
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params);
        if (result.data.code == 200) {
            commit('GETSEARCHLIST', result.data.data)
        }
    }
};
// 简化数据
const getters = {
    // 当前形参state 是当前仓库的state 并非大仓库的state
    // 商品列表
    goodsList(state) {
        // 加入网络不给力 state.searchList.goodsList返回的是undefined
        return state.searchList.goodsList || [];
    },
    // 品牌列表
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },
    // 属性列表
    attrsList(state) {
        return state.searchList.attrsList || [];
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}