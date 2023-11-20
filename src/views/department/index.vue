<template>
  <div class="container">
    <div class="app-container">
      <!-- 展示树形结构 -->
      <!-- 默认展开子节点 -->
      <el-tree :default-expand-all="true" :data="depts" :props="defaultProps" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Department',
  data() {
    return {
      depts: [{ name: '麦林地产', children: [{
        name: '总裁办'
      }, {
        name: '行政部'
      }, {
        name: '人事部'
      }] }], // 数据属性
      defaultProps: {
        children: 'children', // 读取子节点的字段名
        label: 'name' // 要显示的字段的名字
      }
    }
  }
}
</script>
<style scoped>
app-container {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
