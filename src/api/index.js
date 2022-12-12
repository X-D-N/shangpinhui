// 对API进行统一管理
import requests from "./request";
import mockRequests from './mockAjax';

// Home 模块==============================================
// 三级联动接口 axios发送请求返回的是promise对象
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' });
//获取banner （Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get('/banner');
// 获取floor 
export const reqGetFloorList = () => mockRequests.get('/floor');

// Search模块==============================================
// 获取搜索模块数据 请求方式post params至少是一个空对象
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params });

// Detail模块==============================================
// 获取商品详情
export const reqDetailInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' });
// 添加进入购物车或对已有物品数据更改
export const reqAddOrUpdateCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' });

// ShopCart模块==============================================
// 获取购物车列表 
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' });
// 删除购物车商品
export const reqDeleteCart = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });
// 切换商品选中状态
export const reqCheckCart = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });

// 登录与注册模块==============================================
// 获取验证码
export const reqCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });
// 用户注册
export const reqRegister = (info) => requests({ url: '/user/passport/register', data: info, method: 'post' });
// 用户登录
export const reqLogin = (userLoginInfo) => requests({ url: "/user/passport/login", data: userLoginInfo, method: 'post' });
// token校验（放在请求头中） 获取用户信息(全局路由守卫)
export const loginCheck = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' });
// 退出登录
export const loginOut = () => requests({ url: '/user/passport/logout', method: 'get' });

// Trade模块==============================================
// 获取用户地址信息
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' });
// 获取订单交易页信息
export const reqTradeInfo = () => requests({ url: '/order/auth/trade', method: 'get' });
// 提交订单 使用全局API
export const reqOrderInfo = (tradeNo, tradeInfoObj) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data: tradeInfoObj, method: 'post' })

// Pay模块==============================================
// 从orderId获取支付信息
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });
// 获取订单支付情况(轮询) 
export const queryPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });

// Center模块--myOrder
// 获取我的订单列表
export const reqMyOrderInfo = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' });