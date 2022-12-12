<template>
  <div id="app">
    <Header/>
    <!-- 展示路由组件 -->
    <router-view></router-view>
    <!-- 利用路由元信息确定footer是否展示 -->
    <Footer v-if="$route.meta.show"/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    Header, Footer
  },
  // 组件挂载完毕 可以向服务器发请求
  mounted() {
    // 优化：只会执行一次
    // 通知vuex发请求，获取商品分类的三级列表数据 存储于仓库中
    this.$store.dispatch('home/categoryList')
  },
}
</script>

<style>

</style>
