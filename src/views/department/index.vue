<template>
  <div class="container">
    <div class="app-container">
      <!-- 展示树形结构 -->
      <!-- 默认展开子节点 -->
      <el-tree :expand-on-click-node="false" default-expand-all :data="depts" :props="defaultProps">
        <!-- 节点结构 -->
        <template v-slot="{ data }">
          <el-row style="width:100%;height:40px" type="flex" justify="space-between" align="center">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <el-dropdown @command="operateDept($event,data.id)">
                <span class="el-dropdown-link">
                  操作  <i class="el-icon-arrow-down el-icon--right" />
                </span>
                <!-- 下拉菜单选项 -->
                <el-dropdown-menu>
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑</el-dropdown-item>
                  <el-dropdown-item command="delete">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <!-- 放置弹层 -->
    <!-- 表示会接受子组件的事件 update：showDialog，值=>属性 -->
    <!-- ref可以获取DOM实例对象，也可以获取自定义组件的实例对象 -->
    <add-dept ref="addDept" :current-node-id="currentNodeId" :show-dialog.sync="showDialog" @updateDepartment="getDepartment" />
  </div>
</template>
<script>
import { getDepartment } from '@/api/department' // 导入获取部门数据的接口
import { transListToTreeData } from '@/utils/index' // 导入工具函数
import AddDept from './components/add-dept.vue' // 导入添加部门的组件
export default {
  name: 'Department',
  components: {
    AddDept
  },
  data() {
    return {
      currentNodeId: 'null', // 当前节点的id
      showDialog: false, // 控制弹层的显示和隐藏
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
      this.depts = transListToTreeData(result, 0)
    },
    operateDept(type, id) {
      if (type === 'add') {
        this.showDialog = true
        this.currentNodeId = id
      } else if (type === 'edit') {
        this.showDialog = true
        this.currentNodeId = id
        // 更新props-异步动作
        // 调用子组件的方法是同步动作
        // 要在子组件中获取数据
        // 父组件调用子组件的方法来获取数据
        /**
         * Calls the `getDepartmentDetail` method on the `addDept` component after the next DOM update.
         */
        this.$nextTick(() => {
          this.$refs.addDept.getDepartmentDetail()
        })
        // this.refs.addDept等同于子组件的this
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
.tree-manager {
  font-size: 12px;
  display: inline-block;
  width: 50px;
  margin:20px;
}
</style>
