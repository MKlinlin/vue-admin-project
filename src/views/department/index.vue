<template>
  <div class="container">
    <div class="app-container">
      <!-- 展示树形结构 -->
      <!-- 默认展开子节点 -->
      <el-tree :default-expand-all="true" :data="depts" :props="defaultProps">
        <!-- 节点结构 -->
        <template v-slot="{ data }">
          <el-row style="width:100%;height:40px" type="flex" justify="space-between" align="center">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <el-dropdown>
                <span class="el-dropdown-link">
                  操作  <i class="el-icon-arrow-down el-icon--right" />
                </span>
                <!-- 下拉菜单选项 -->
                <el-dropdown-menu>
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                  <el-dropdown-item>编辑</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>

      </el-tree>
    </div>
  </div>
</template>
<script>
import { getDepartment } from '@/api/department' // 导入获取部门数据的接口
export default {
  name: 'Department',
  data() {
    return {
      depts: [], // 部门数据
      defaultProps: {
        children: 'children', // 读取子节点的字段名
        label: 'name' // 要显示的字段的名字
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    // 获取部门数据
    async getDepartment() {
      const result = await getDepartment()
      this.depts = result
    }
  }
}

</script>
<style scoped>
app-container {
  padding: 30px 140px;
  font-size: 14px;
}
.tree-manager {
  color: #409EFF;
  font-size: 12px;
  display: inline-block;
  width: 50px;
  margin:10px;
}
</style>
