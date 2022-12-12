<template>
    <div class="type-nav">
        <div class="container">
            <!-- 鼠标离开隐藏二三级列表 事件委托给父元素 -->
            <div @mouseleave="leaveIndex" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 过度动画 -->
                <transition>
                    <div class="sort" v-show="isShow">
                                    <!-- 利用事件委派+编程式导航实现路由跳转与传递参数 -->
                                    <div class="all-sort-list2" @click="goSearch">
                                        <!-- 一级展示 -->
                                        <!-- 鼠标经过改变分类样式  -->
                                        <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                                            @mouseenter="changeIndex(index)" :class="{ cur: currentIndex == index }">
                                            <h3>
                                                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                                            </h3>
                                            <!-- 二级和三级是否展示 -->
                                            <div class="item-list clearfix" :style="{ 'display': currentIndex == index ? 'block' : 'none' }">
                                                <!-- 二级展示 -->
                                                <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                                                    <dl class="fore">
                                                        <dt>
                                                            <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                                                        </dt>
                                                        <dd>
                                                            <!-- 三级展示 -->
                                                            <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                                                                <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                                            </em>
                                                        </dd>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
// 按需引入节流函数
import throttle from 'lodash/throttle';
export default {
    name: 'TypeNav',
    data() {
        return {
            // 响应式数据控制一级列表样式
            currentIndex: -1,
            // 三级列表的显示与隐藏
            isShow: true
        }
    },
    computed: {
        // 获取仓库中的商品分类数据
        ...mapState({
            categoryList: state => state.home.categoryList
        })
    },
    methods: {
        // 鼠标进入修改响应式数据currentIndex的值
         /* 
            **当用户操作过快时，会导致浏览器反应不过来，如果当前回调函数中有大量的业务，可能会出现卡顿现象
            使用节流函数：throttle回调函数不要用箭头函数 会出现this问题
        */
        changeIndex:throttle(function(index){
            this.currentIndex = index;
        },50),
        // 鼠标离开修改响应式数据currentIndex的值
        leaveIndex(){
            this.currentIndex = -1;
            // 在search页面 鼠标离开后需要隐藏三级列表
            if(this.$route.path!=='/home'){
                this.isShow=false
            }
        },
        // 一级列表的显示与隐藏
        enterShow(){
            this.isShow=true
        },
        // 利用事件委派+编程式导航实现路由跳转与传递参数
        /* 
            **存在一些问题：事件委派：是把全部子节点的事件委派给父节点  
            1、怎么确定点击的是a标签---添加自定义属性data-categoryName
            2、如何区分一级、二级、三级分类的标签---添加自定义属性data-category1Id/data-category2Id/data-category3Id */
        goSearch(event){
            let element = event.target; // 获取点击标签
            //节点有一个dataset属性，可以获取节点的自定义属性与属性值,解构出自定义属性
            let {categoryname,category1id,category2id,category3id} = element.dataset;
            //  如果身上有categoryname 一定是a标签
            if(categoryname){
                let location={name:'search'}
                // 收集参数
                let query = {categoryName:categoryname};
                if(category1id){
                    query.category1Id = category1id;
                }else if(category2id){
                    query.category2Id = category2id;              
                }else{
                    query.category3Id = category3id;
                }
                location.query = query;
                // 还有搜索框的内容也要一起带过去
                if(this.$route.params){
                    location.params=this.$route.params;
                }
                this.$router.push(location)
            }
            
        }
    },
    mounted(){
        // 组件一挂载 就判断是否是home 不是的话需要隐藏三级列表
        if(this.$route.path!=='/home'){
            this.isShow=false
        }
    }
}
</script>

<style scoped lang="less">

.v-enter {
  opacity: 0;
}
 
.v-leave{
  opacity: 1;
}
 
.v-enter-active {
  transition: opacity 1s linear;
}


.cur {
    background-color: skyblue;
}

.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 27px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }


                }
            }
        }
    }
}
</style>