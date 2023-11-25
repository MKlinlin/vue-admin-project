<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理内容 -->
      <div class="role-operate">
        <el-button type="primary" size="mini" @click="showDialog=true ">添加角色</el-button>
      </div>
      <el-table :data="list">
        <!-- 放置列 -->
        <el-table-column prop="name" align="center" width="200" label="角色">
          <template v-slot="{ row }">
            <!-- 条件判断 -->
            <el-input v-if="row.isEdit" v-model="row.editRow.name" size="mini" />
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" align="center" width="200" label="启用 ">
          <!-- 自定义列结构 -->
          <template v-slot="{ row }">
            <el-switch v-if="row.isEdit" v-model="row.editRow.state" :active-value="1" :inactive-value="0" size="mini" />
            <span v-else>{{ row.state === 1 ? '启用' : '禁用' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述">
          <template v-slot="{ row }">
            <!-- 条件判断 -->
            <el-input v-if="row.isEdit" v-model="row.editRow.description" size="mini" type="textarea" />
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <!-- 自定义列结构 -->
          <template v-slot="{ row }">
            <!-- 编辑状态 -->
            <template v-if="row.isEdit">
              <el-button type="primary" size="mini">保存</el-button>
              <el-button type="text" size="mini">取消</el-button>
            </template>
            <!-- 非编辑状态 -->
            <template v-else>
              <el-button type="text" size="mini"> 分配权限</el-button>
              <el-button type="text" size="mini" @click="btnEditRow(row)">编辑</el-button>
              <el-button type="text" size="mini">删除</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" style="height:60px" align="middle" justify="end">
        <el-pagination
          :page-size="pageParams.pagesize"
          :current-page="pageParams.page"
          :total="pageParams.total"
          layout="prev, pager, next"
          @current-change="changePage"
        />
      </el-row>
    </div>
    <!-- 放置弹层 -->
    <el-dialog title="添加角色" :visible.sync="showDialog" width="500px" @close="btncancel">
      <el-form ref="roleForm" :rules="rules" :model="roleForm" label-width="120px">
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="roleForm.name" size="mini" style="width:300px" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="启用" prop="state">
          <el-switch v-model="roleForm.state" :active-value="1" :inactive-value="0" size="mini" />
        </el-form-item>
        <el-form-item prop="description" label="角色描述">
          <el-input v-model="roleForm.description" type="textarea" :rows="3" size="mini" style="width:300px" placeholder="请输入角色描述" />
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="12">
              <el-button type="primary" size="mini" @click="btnOK">确定</el-button>
              <el-button size="mini" @click="btncancel">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div></template>
<script>
import { getRoleList, addRole } from '@/api/role'
export default {
  name: 'Role',
  data() {
    return {
      list: [],
      showDialog: false, // 是否显示添加角色弹窗
      // 分页数据
      pageParams: {
        page: 1, // 当前页
        pagesize: 5, // 每页显示条数
        total: 0 // 总条数
      },
      roleForm: {
        name: '',
        description: '',
        state: 0 // 默认未启用
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '角色描述不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows, total } = await getRoleList(this.pageParams)
      this.list = rows
      this.pageParams.total = total
      // 针对每一行数据添加一个编辑标记
      this.list.forEach(item => {
        this.$set(item, 'isEdit', false) // this.$set(对象, 属性名, 初始值)
        // item.isEdit = false
        // 添加的动态属性 不具备响应式特点
        this.$set(item, 'editRow', {
          name: item.name,
          description: item.description,
          state: item.state
        })
      })
    },
    // 切换分页时请求新数据
    changePage(newPage) {
      this.pageParams.page = newPage // 赋值当前页码
      this.getRoleList()
    },
    btnOK() {
      // 表单校验
      this.$refs.roleForm.validate(async isOK => {
        if (isOK) {
          // 校验通过
          await addRole(this.roleForm)
          this.$message.success('添加角色成功')
          this.getRoleList()
          this.showDialog = false
        }
      })
    },
    btncancel() {
      this.$refs.roleForm.resetFields()// 重置表单数据
      this.showDialog = false
    },
    btnEditRow(row) {
      row.isEdit = true // 改变行的编辑标记
      // 更新缓存数据
      row.editRow.name = row.name
      row.editRow.description = row.description
      row.editRow.state = row.state
    }
  }
}
</script>
<style>
.role-operate{
  padding: 10px;
}
  </style>
