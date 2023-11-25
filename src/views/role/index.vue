<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理内容 -->
      <div class="role-operate">
        <el-button @click="showDialog=true " type="primary" size="mini">添加角色</el-button>
      </div>
      <el-table :data="list">
        <!-- 放置列 -->
        <el-table-column prop="name" align="center" width="200" label="角色" />
        <el-table-column prop="state" align="center" width="200" label="启用 ">
          <!-- 自定义列结构 -->
          <template v-slot="{ row }">
            {{ row.state ? '已启用' : '未启用' }}
          </template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述" />
        <el-table-column align="center" label="操作">
          <!-- 自定义列结构 -->
          <template>
            <el-button type="text" size="mini"> 分配权限</el-button>
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">删除</el-button>
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
  <el-dialog title="添加角色" :visible.sync="showDialog" width="500px">
    <el-form label-width="120px">
      <el-form-item label="角色名称">
        <el-input size="mini" style="width:300px" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-switch size="mini" />
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input type="textarea" :rows="3" size="mini" style="width:300px" placeholder="请输入角色描述">

        </el-input>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="12">
            <el-button type="primary" size="mini">确定</el-button>
            <el-button size="mini" @click="showDialog = false">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
  </div></template>
<script>
import { getRoleList } from '@/api/role'
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
    },
    // 切换分页时请求新数据
    changePage(newPage) {
      this.pageParams.page = newPage // 赋值当前页码
      this.getRoleList()
    }
  }
}
</script>
<style>
.role-operate{
  padding: 10px;
}
  </style>
