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
export default {
  name: 'Form2',
  data() {
    return {
      formData: {},
      rules: {
        company: [
          { required: true, message: '请输入公司', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    validForm() {
      let result = false
      this.$refs['form'].validate((valid) => { result = valid })
      return result
    }
  }
}
</script>

<style scoped lang="scss">
</style>
