<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="(startNumAndEndNum.start>1)" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
    <button v-if="(startNumAndEndNum.start>2)">...</button>

    <!-- 中 -->
    <!-- v-for 遍历数字 -->
    <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-show="page>=startNumAndEndNum.start"
      @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">{{page}}</button>

    <!-- 下 -->
    <button v-if="(startNumAndEndNum.end<totalPage-1)">...</button>
    <button v-if="(startNumAndEndNum.end<totalPage)" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{ totalPage }}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共{{ total }}条</button>

  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  //   对于分页器而言，需要知道以下字段
  /* 
    pageNo:当前第几个
    pageSize:每一页展示多少个数据
    total: 整个分页一共要展示多少数据
    continues: 分页连续页码个数 */
  computed: {
    // 总页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算连续页码的起始和结尾
    startNumAndEndNum(){
      const {continues,pageNo,totalPage} = this;
      // 定义两个变量存储 起始值与结束值
      let start = 0;
      let end = 0;
      // 判断是否需要连续页码 -- 即连续页码是否超出总页数
      if (continues > totalPage) {
        // 如果超出 
        start = 1;
        end = totalPage;
      } else {
        // 未超出 当前页码位于中间 好看
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        // 可能出现 start<1的情况
        if(start < 1){
          start = 1;
          end = continues
        }
        // 也可能出现 end > totalPage的情况
        if(end > totalPage){
          end = totalPage;
          start = totalPage - continues +1;
        }
      }
      return { start, end }
    }
  }
}
</script>

<style scoped lang="less">
.active {
          cursor: not-allowed;
          background-color: #409eff;
          color: #fff;
        }
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>