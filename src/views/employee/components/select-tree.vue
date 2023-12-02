<template>
  <!-- elementui级联组件 -->
  <el-cascader
    size="mini"
    :options="treeData"
    :props="props"
    separator="-"
  />
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
export default {
  data() {
    return {
      treeData: [], // 赋值给级联组件的option
      props: {
        value: 'id', // 要提交的字段
        label: 'name' // 要展示的字段
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      this.treeData = await getDepartment()
      transListToTreeData(this.treeData, 0)
    }
  }
}
</script>

<style>

</style>
