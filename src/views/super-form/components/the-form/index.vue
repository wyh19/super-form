<!--
 * @Description: 表单组件入口，在这里组装子表单
 * @Author: wyh19
 * @Date: 2021-05-21
-->
<template>
  <div class="form-wrapper">
    <el-button type="primary" @click="handleSave">保存</el-button>
    <form1 ref="form1" />
    <form2 ref="form2" />
  </div>
</template>

<script>
import Form1 from './form1'
import Form2 from './form2'
export default {
  name: 'TheForm',
  components: {
    Form1,
    Form2
  },
  methods: {
    handleSave() {
      const validResult1 = this.$refs['form1'].validForm()
      const validResult2 = this.$refs['form2'].validForm()
      if (validResult1 && validResult2) {
        // 校验通过，打印表单数据
        console.log(this.$refs['form1'].formData)
        console.log(this.$refs['form2'].formData)
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
