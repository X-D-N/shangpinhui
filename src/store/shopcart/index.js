import { reqCartList, reqDeleteCart, reqCheckCart } from '@/api/index'
// 封装游客身份 生成一个随机字符串（不能再变了）
import { getUUID } from '@/utils/uuid_token'
const state = {
    shopCartList: [],
    //游客临时身份--放到请求头中
    uuid_token: getUUID(),
}
const mutations = {
    // 获取购物车列表
    SHOPCARTLIST(state, value) {
        state.shopCartList = value;
    },
}
const actions = {
    // 获取购物车列表
    async getShopCartList({ commit }) {
        let result = await reqCartList();
        if (result.data.code == 200) {
            //只返回购物车的列表信息
            // console.log(result.data);
            let temp = result.data.data[0] || {};
            commit("SHOPCARTLIST", temp.cartInfoList || []);
            // commit("SHOPCARTLIST",result.data)
        }
    },
    // 切换购物车产品选中状态
    async setCheckCart({ commit }, { skuId, isChecked }) {
        let result = await reqCheckCart(skuId, isChecked);
        if (result.data.code == 200) {
            return "OK"
        } else {
            return Promise.reject(new Error("failed"));
        }
    },
    // 全选/全不选
    async checkAll({ commit, dispatch, state }, isChecked) {
        let promiseall = []; //暂存所有更改的ajax请求结果
        state.shopCartList.forEach((item) => {
            //如果遍历的数据和要切换的状态属性相同,则不发送ajax请求
            if (item.isChecked === isChecked) return;
            else {
                promiseall.push(dispatch("setCheckCart", { skuId: item.skuId, isChecked }));
            }
        });
        return Promise.all(promiseall);
    },
    // 删除购物车某一个产品
    async setDeleteCartOne({ commit }, skuId) {
        let result = await reqDeleteCart(skuId);
        if (result.data.code == 200) {
            return "OK";
        } else {
            return Promise.reject(new Error("failed"));
        }
    },
    // 删除购物车所有选中产品 -- 多次调用setDeleteCartOne
    async setDeleteCartAll({ commit, dispatch, state }) {
        let promises = [];
        state.shopCartList.forEach(item => {
            if (!item.isChecked) return;
            promises.push(dispatch("setDeleteCartOne", item.skuId)); // 数组里面都是promise
        });
        // 只要全部的promise都成功，返回成功  只要有一个promise失败 返回失败
        return Promise.all(promises);
    }
}
const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}