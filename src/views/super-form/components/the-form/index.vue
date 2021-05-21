<!--
 * @Description: 表单组件入口，在这里组装子表单
 * @Author: wyh19
 * @Date: 2021-05-21
-->
<template>
  <div class="form-wrapper">
    <el-button type="primary" @click="handleSave">保存</el-button>
    <el-form ref="form1" :model="form1" :rules="rules1" label-width="80px" size="small">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form1.name" />
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form1.age" />
      </el-form-item>
    </el-form>
    <el-form ref="form2" :model="form2" :rules="rules2" label-width="80px" size="small">
      <el-form-item label="公司" prop="company">
        <el-input v-model="form2.company" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'TheForm',
  data() {
    return {
      form1: {
        name: '',
        age: ''
      },
      form2: {
        company: ''
      },
      rules1: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      rules2: {
        company: [
          { required: true, message: '请输入公司', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSave() {
      let validResult1
      let validResult2
      this.$refs['form1'].validate(valid => { validResult1 = valid })
      this.$refs['form2'].validate(valid => { validResult2 = valid })
      if (validResult1 && validResult2) {
        // 校验通过，打印表单数据
        console.log(this.form1, this.form2)
      } else {
        this.$message.warning('校验未通过')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.form-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 16px;
  overflow-y: auto;
  ::v-deep input {
    width: 280px;
  }
}
</style>
