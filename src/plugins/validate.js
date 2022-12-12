import Vue from "vue"
import VeeValidate from "vee-validate"
import zh_CN from "vee-validate/dist/locale/zh_CN"
Vue.use(VeeValidate)

// 表单验证
VeeValidate.Validator.localize("zh_CN", {
    messages: {
        ...zh_CN.messages,
        //修改内置规则的message,使得二次输入密码不相同有提示
        is: (field) => `${field}必须与密码相同`
    },
    //提示前置文本
    attributes: {
        phone: "手机号",
        code: "验证码",
        password: '密码',
        password1: "确认密码",
        agree: "协议",
    }
});
// 自定义校验规则
VeeValidate.Validator.extend('agree', {
    validate: value => { // 用于检验的函数, 函数返回true代表通过, 否则没通过  value需要检验的值
        return value
    },
    getMessage: field => field + '必须同意' // 返回错误提示消息
})