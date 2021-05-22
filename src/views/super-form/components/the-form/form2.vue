<!--
 * @Description:
 * @Author: wyh19
 * @Date: 2021-05-21
-->
<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="80px" size="small">
    <el-form-item label="公司" prop="company">
      <el-input v-model="formData.company" />
    </el-form-item>
  </el-form>
</template>

<script>
import SuperFormMixin from '@/mixins/super-form-mixin'
export default {
  name: 'Form2',
  mixins: [SuperFormMixin],
  data() {
    return {
      rules: {
        company: [
          { required: true, message: '请输入公司', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
