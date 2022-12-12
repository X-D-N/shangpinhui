<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="shopCart in shopCartList" :key="shopCart.id">
          <!-- 复选框 -->
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="shopCart.isChecked" @change="setCheckCart(shopCart)">
          </li>
          <!-- 商品 -->
          <li class="cart-list-con2">
            <img :src="shopCart.imgUrl">
            <div class="item-msg">{{shopCart.skuName}}</div>
          </li>
          <!-- 商品单价 -->
          <li class="cart-list-con4">
            <span class="price">{{shopCart.skuPrice}}</span>
          </li>
          <!-- 数量 -->
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,shopCart)">-</a>
            <input autocomplete="off" type="text" v-model="shopCart.skuNum" minnum="1" class="itxt" @change="handler('change',$event.target.value*1,shopCart)">
            <a href="javascript:void(0)" class="plus"  @click="handler('add',1,shopCart)">+</a>
          </li>
          <!-- 小计 -->
          <li class="cart-list-con6">
            <span class="sum">{{(shopCart.skuPrice*shopCart.skuNum)}}</span>
          </li>
          <!-- 删除 收藏操作 -->
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartById(shopCart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="(isAll&&shopCartList.length>0)" @change="updateAllCartChecked($event)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalAmount}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalAccount}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn"  @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import throttle from "lodash/throttle"
export default {
  name: 'ShopCart',
  mounted() {
    this.getData()
  },
  methods: {
    //获取个人购物车数据
    getData() {
      this.$store.dispatch('shopcart/getShopCartList')
    },
    // 修改购物车产品数量
    handler: throttle(async function (type, disNum, shopCart) {
      // this.$store.dispatch('shopcart/getAddOrUpdateCart',)
      // type:区别的三个DOM元素
      // disNum形参 + 变化量为1  - 变化量为-1 input变化量 当前值减去上次值
      // shopCart：区别的哪个商品
      // console.log(type,disNum,shopCart);
      // 向服务器发送请求，修改数量
      switch (type) {
        case 'add':
          disNum = 1;
          break;
        case 'minus':
          disNum = shopCart.skuNum > 1 ? -1 : 0;
          break;
        case 'change':
          // 用户输入非法 或者出现负数
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            // 
            disNum = parseInt(disNum) - shopCart.skuNum
          }
      }
      // 派发action
      try {
        // 代表的是修改的状态
        await this.$store.dispatch('detail/getAddOrUpdateCart', {
          skuId: shopCart.skuId,
          skuNum: disNum
        })
        // 再次获取个人购物车数据
        this.getData();
      } catch (error) {
        console.log(error.message)
      }
    }, 3000),
    // 切换购物车选中状态
    async setCheckCart(shopCart) {
      try {
        await this.$store.dispatch("shopcart/setCheckCart", {
          skuId: shopCart.skuId,
          //真 => 假  假 => 真
          isChecked: shopCart.isChecked ? 0 : 1
        });
        //重新获取数据
        this.getData();
      } catch (error) {
        this.$message.error("修改状态发生错误!");
        console.log(error.message);
      }
    },
    // 修改全部商品选中状态
    async updateAllCartChecked(event) {
      let isChecked = event.target.checked ? '1' : '0'
      try {
        // 派发action
        await this.$store.dispatch('shopcart/checkAll', isChecked)
        this.getData()
      } catch (error) {
        console.log(error.message);
      }
    },
    // 删除某一产品
    async deleteCartById(shopCart) {
      try {
        await this.$store.dispatch('shopcart/setDeleteCartOne', shopCart.skuId)
        this.getData()
      } catch (error) {
        console.log(error.message);
      }
    },
    // 删除全部选中的商品
    async deleteAllCheckedCart() {
      try {
        await this.$store.dispatch('shopcart/setDeleteCartAll')
        this.getData()
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  computed:{
    //获取购物车列表
    ...mapState({
      shopCartList: state => state.shopcart.shopCartList
    }),
    //总价
    totalAccount() {
      return this.shopCartList.reduce((prev, shop) => {
        if (shop.isChecked) {
          prev += (shop.cartPrice * shop.skuNum);
        }
        return prev;
      }, 0)
    },
    //总商品数量
    totalAmount() {
      return this.shopCartList.reduce((prev, shop) => {
        if (shop.isChecked) {
          prev += (shop.skuNum);
        }
        return prev;
      }, 0)
    },
    // 是否全选
    isAll(){
      return this.shopCartList.every(shop => shop.isChecked == '1')
    },

  }
}
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

        
          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>