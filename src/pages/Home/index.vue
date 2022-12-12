<template>
  <div>
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <!-- v-for也可以在自定义标签使用 -->
    <!-- Floor组件 在自己内部是没有发请求的 数据是父组件给的 -->
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list='floor'/>
    <Brand/>
  </div>
</template>

<script>
// 引入子组件
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from 'vuex'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'Home',
    components:{
      ListContainer,Recommend,Rank,Like,Floor,Brand
    },
    mounted(){
      // 获取floor组件数据
      this.$store.dispatch('home/getFloorList');
    },
    computed:{
      // floor组件数据映射到组件身上
      ...mapState({floorList:state => state.home.floorList}),
    }
}
</script>

<style scoped lang="less">

</style>