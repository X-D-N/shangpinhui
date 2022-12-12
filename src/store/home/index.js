import { reqCategoryList, reqGetBannerList, reqGetFloorList } from '@/api/index'
const state = {
    // 根据接口返回值初始化
    categoryList: [],
    // 轮播图的数据
    bannerList: [],
    //floor的数据
    floorList: []
}
const mutations = {
    // 获取三级联动数据
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    // 获取首页轮播图的数据
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    // 获取Floor的数据
    GETFLLORLIST(state, floorList) {
        state.floorList = floorList;
    }
}
const actions = {
    // 通过API的接口函数调用 向服务器发送请求 获取服务器数据
    // 获取三级联动数据
    async categoryList({ commit }) {
        let result = await reqCategoryList(); // 返回成功的数据
        if (result.data.code == 200) {
            commit('CATEGORYLIST', result.data.data)
        }
    },
    // 获取首页轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList(); // 返回成功的数据
        if (result.data.code == 200) {
            commit('GETBANNERLIST', result.data.data);
        }
    },
    // 获取Floor的数据
    async getFloorList({ commit }) {
        let result = await reqGetFloorList(); // 返回成功的数据
        if (result.data.code == 200) {
            commit('GETFLLORLIST', result.data.data);
        }
    },
}
const getters = {}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}