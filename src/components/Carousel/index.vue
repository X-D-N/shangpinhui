<template>
    <!-- 使用ref绑定轮播图 -->
    <div class="swiper-container" ref="mySwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
                <!-- mock数据 图片资源放在public下 -->
                <img :src="carousel.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'Carousel',
    props:['list'],
    watch:{
        list:{
            // 立即监听：不管数据有没有变化 一上来立即监听一次
            // 为什么watch监听不到list 因为这个数据(父传子)从来没有发生变化
            immediate: true,
            handler() {
                // Swiper需要获取到轮播图的节点DOM，才能给swiper轮播添加动态效果，
                // 只能监听到数据已经有了 但还是不确定v-for动态渲染结构是否完成 所以还是要用nextTick
                this.$nextTick(() => {
                    var mySwiper = new Swiper(
                        this.$refs.mySwiper,
                        {
                            loop: true, // 循环模式选项

                            // 如果需要分页器
                            pagination: {
                                el: '.swiper-pagination',
                                clickable: true
                            },

                            // 如果需要前进后退按钮
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                        })
                })
            }
        }
    }
}
</script>

<style scoped lang="less">

</style>