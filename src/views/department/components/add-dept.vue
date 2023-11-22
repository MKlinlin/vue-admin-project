<template>
  <el-dialog :title="title" :visible="showDialog" @close="close">
    <!-- 放置弹层内容 -->
    <el-form ref="addDept" :model="formData" label-width="120px" :rules="rules">
      <el-form-item prop="name" label="部门名称">
        <el-input v-model="formData.name" placeholder="2-10个字符" style="width:80%" size="mini " />
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input v-model="formData.code" placeholder="2-10个字符" style="width:80%" size="mini" />
      </el-form-item>
      <el-form-item prop="managerId" label="部门负责人">
        <el-select v-model="formData.managerId" placeholder="请选择负责人" style="width: 80%" size="mini">
          <!-- 下拉选项 循环 负责人数据 label表示显示的字段 value 存储字段 -->
          <el-option v-for="item in managerList" :key="item.id" :label="item.username" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input v-model="formData.introduce" placeholder="2-10个字符" type="textarea" :rows="4" style="width:80%" size="mini" />
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary" size="mini" @click="btnOK">提交</el-button>
            <el-button size="mini" @click="close">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getDepartment, getManagerList, addDepartment, getDepartmentDetail, updateDepartment } from '@/api/department' // 导入获取部门数据的接口
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    currentNodeId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      managerList: [], // 存储部门负责人列表
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        managerId: '', // 部门负责人
        introduce: '', // 部门介绍
        pid: '' // 父级部门id
      },
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }, {
          min: 2,
          max: 10,
          message: '部门名称长度为2-10个字符',
          trigger: 'blur'
        }, {
          trigger: 'blur',
          validator: async(rule, value, callback) => {
            let result = await getDepartment()
            // 判断result数组中部门名称是否已存在
            // 判断当前是否是编辑模式
            if (this.formData.id) {
              result = result.filter(item => item.id !== this.formData.id) // 排除掉result中当前编辑的部门
            }

            const isExist = result.some(item => item.name === value)
            if (isExist) {
              callback(new Error('部门名称已存在'))
            } else {
              callback()
            }
          }
        }
        ],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' }, {
          min: 2,
          max: 10,
          message: '部门编码长度为2-10个字符',
          trigger: 'blur'
        }, {
          validator: async(rule, value, callback) => {
            let result = await getDepartment()
            // 判断当前是否是编辑模式
            if (this.formData.id) {
              result = result.filter(item => item.id !== this.formData.id) // 排除掉result中当前编辑的部门
            }
            const isExist = result.some(item => item.code === value)
            if (isExist) {
              callback(new Error('部门编码已存在'))
            } else {
              callback()
            }
          }
        }],
        managerId: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' }, {
          min: 1,
          max: 100,
          message: '部门介绍长度为1-100个字符',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  created() {
    this.getManagerList()
  },
  methods: {
    close() {
      // 修改父组件的值 子传父
      // 只能重置模板中绑定的数据，手动重置id属性
      this.formData = {
        name: '',
        code: '',
        managerId: '',
        introduce: '',
        pid: ''
      }
      this.$refs.addDept.resetFields() // 重置表单
      this.$emit('update:showDialog', false)
    },
    async getManagerList() {
      this.managerList = await getManagerList()
    },
    btnOK() {
      this.$refs.addDept.validate(async isOK => {
        if (isOK) {
          // 验证通过
          let msg = '新增'
          if (this.formData.id) {
            // 编辑场景
            msg = '编辑'
            await updateDepartment(this.formData)
          } else {
            // 新增场景
            await addDepartment({ ...this.formData, pid: this.currentNodeId })
          }

          // 通知父组件更新
          this.$emit('updateDepartment')
          this.$message.success(`${msg}部门成功`)
          this.close()
        }
      })
    },
    // 获取组织部门详情
    async getDepartmentDetail() {
      // 根据id获取部门详情
      const result = await getDepartmentDetail(this.currentNodeId)
      this.formData = result
    }
  }
}

</script>

<style>

</style>
