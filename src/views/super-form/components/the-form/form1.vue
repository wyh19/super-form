import { easyClone } from '@/utils';
<!--
 * @Description:
 * @Author: wyh19
 * @Date: 2021-05-21
-->
<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="80px" size="small">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="formData.name" />
    </el-form-item>
    <el-form-item label="年龄">
      <el-input v-model="formData.age" />
    </el-form-item>
  </el-form>
</template>

<script>
import SuperFormMixin from '@/mixins/super-form-mixin'
export default {
  name: 'Form1',
  mixins: [SuperFormMixin],
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
