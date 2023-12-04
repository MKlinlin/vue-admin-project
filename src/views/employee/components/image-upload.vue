<template>
  <el-upload
    class="avatar-uploader"
    action=""
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
    :http-request="uploadImage"
  >
    <!-- (自动上传)action是上传地址，该项目不需要 -->
    <!-- show-file-list不展示上传列表 -->
    <img v-if="value" :src="value" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon" />
  </el-upload>
</template>

<script>
import COS from 'cos-js-sdk-v5'
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 检查函数 判断文件类型和大小
    beforeAvatarUpload(file) {
      // jpeg png gif bmp

      const isJPG = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'].includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 5 // 5M

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG PNG GIF BMP 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isJPG && isLt2M
    },
    uploadImage(params) {
      const cos = new COS({
        SecretId: 'AKIDCD0cIn590e4GyUnsjLLAl8btxnOltpX1',
        SecretKey: 'ILAG7j6GI8FBpIWX1IK9lALHyTpwofKn'
      })// 完成cos对象初始化
      cos.putObject({
        Bucket: 'mklinlin-1322899666', // 存储桶名称
        Region: 'ap-nanjing',
        Key: params.file.name, // 对象键
        StorageClass: 'STANDARD',
        Body: params.file // 上传文件对象
      }, (err, data) => {
        if (data.statusCode === 200 && data.Location) {
          // 拿到腾讯云返回的地址
          // 通过input自定义事件传出地址
          this.$emit('input', 'http://' + data.Location)
        } else {
          this.$message.error(err.Message)
        }
      })
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
