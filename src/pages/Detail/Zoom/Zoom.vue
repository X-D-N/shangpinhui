<template>
  <div class="spec-preview">
    <img :src=defaultImage.imgUrl />
    <div class="event" ref="small" @mousemove="mouseMove"></div>
    <!-- 大图展示 -->
    <div class="big" ref="big">
      <img :src=defaultImage.imgUrl ref="bigimg" />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ['skuImageList'],
  data() {
    return {
      //默认图片索引
      defaultIndex: 0,
    }
  },
  computed: {
    // 获取默认图片位置
    //为了避免接收到假报错,应该对接收到的数据进行再一次处理
    defaultImage() {
      //因为skuImageList[defaultIndex]可能还处于未拿到数据的状态
      return this.skuImageList[this.defaultIndex] || {};
    },
    // 获取DOM
    mask() {
      return this.$refs.mask
    },
    small() {
      return this.$refs.small
    },
    big() {
      return this.$refs.big
    },
    bigImg() {
      return this.$refs.bigimg
    }
  },
  mounted() {
    //轮播图当中的图片显示被改变了,放大镜也改变
    this.$bus.$on('changeDefaultIndex', (index) => {
      this.defaultIndex = index
    })
  },
  methods: {
    // 鼠标移动 放大镜效果
    mouseMove(event) {
      let { mask, small, big, bigImg } = this;
      // 遮罩层移动距离
      let maskX = event.offsetX - mask.clientWidth / 2;
      let maskY = event.offsetY - mask.clientHeight / 2;
      // 遮罩层最大移动距离
      let maskMaxMoveX = small.clientWidth - mask.clientWidth;
      let maskMaxMoveY = small.clientHeight - mask.clientHeight;
      if (maskX <= 0) {
        maskX = 0;
      } else if (maskX >= maskMaxMoveX) {
        maskX = maskMaxMoveX;
      }
      if (maskY <= 0) {
        maskY = 0;
      } else if (maskY >= maskMaxMoveY) {
        maskY = maskMaxMoveY;
      }
      // 大图移动距离/大图最大移动距离 = 遮罩层移动距离/遮罩层最大移动距离
      let bigMaxMove = bigImg.clientWidth - big.clientWidth;
      let bigMoveX = maskX / maskMaxMoveX * bigMaxMove;
      let bigMoveY = maskY / maskMaxMoveY * bigMaxMove

      // 遮罩层位置
      mask.style.left = maskX + 'px'
      mask.style.top = maskY + 'px'

      // 大图位置
      bigImg.style.left = -bigMoveX + 'px'
      bigImg.style.top = -bigMoveY + 'px'

    }
  }

}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover~.mask,
  .event:hover~.big {
    display: block;
  }
}
</style>