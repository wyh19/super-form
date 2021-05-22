<!--
 * @Description: 表单组件入口，在这里组装子表单
 * @Author: wyh19
 * @Date: 2021-05-21
-->
<template>
  <div class="form-wrapper">
    <el-button type="primary" @click="handleSave">保存</el-button>
    <form1 ref="form1" :data="formDataMap.form1" />
    <form2 ref="form2" :data="formDataMap.form2" />
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
  data() {
    return {
      formDataMap: {
        form1: {
          name: 'wyh',
          age: 30
        },
        form2: {}
      }
    }
  },
  methods: {
    handleSave() {
      // 解析出全部表单key值,通过key值获取组件ref
      const formKeys = Object.keys(this.formDataMap)
      const validResults = formKeys.map(formKey => this.$refs[formKey].validForm())
      // 如果所有校验通过
      if (validResults.every(r => r)) {
        // 校验通过，打印表单数据，这里不再单个输出子表单里的数据，
        // 而是组装成完正的表单数据
        const formData = {}
        formKeys.map(formKey => {
          const partFormData = this.$refs[formKey].formData
          Object.assign(formData, partFormData)
        })
        console.log(formData)
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
