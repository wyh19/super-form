<!--
 * @Description: 表单组件入口，在这里组装子表单
 * @Author: wyh19
 * @Date: 2021-05-21
-->
<template>
  <div ref="pageBlock" class="form-wrapper">
    <el-button type="primary" @click="handleSave">保存</el-button>
    <div data-section="基础信息" data-ismain></div>
    <div data-section="个人信息"></div>
    <form1 ref="form1" :data="formDataMap.form1" />
    <div data-section="其他信息"></div>
    <div style="width:300px;height:100px;background:#ccc;">占位符</div>
    <div data-section="高级信息" data-ismain></div>
    <div data-section="公司信息"></div>
    <form2 ref="form2" :data="formDataMap.form2" />
    <div class="anchor-wrapper">
      <anchor v-if="pageBlock" :page-block="pageBlock" />
    </div>
  </div>
</template>

<script>
import Anchor from '@/components/anchor'
import Form1 from './form1'
import Form2 from './form2'
export default {
  name: 'TheForm',
  components: {
    Anchor,
    Form1,
    Form2
  },
  data() {
    return {
      pageBlock: null,
      formDataMap: {
        form1: {
          name: 'wyh',
          age: 30
        },
        form2: {}
      }
    }
  },
  mounted() {
    this.pageBlock = this.$refs['pageBlock']
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
  height: 280px;
  padding: 16px;
  overflow-y: auto;
  ::v-deep input {
    width: 280px;
  }
}
.anchor-wrapper {
  position: fixed;
  right: 0px;
  width: 220px;
  height: 300px;
  top: 30%;
  transform: translate(0, -50%);
}
div[data-section] {
  position: relative;
  font-size: 14px;
  font-weight: bold;
  color: #5c658d;
  padding: 14px 0;
  margin-left: 34px;
  &::before {
    content: attr(data-section);
  }
}
div[data-ismain] {
  font-size: 16px;
  font-weight: bold;
  margin-left: 28px;
  &::after {
    content: '';
    position: absolute;
    left: -16px;
    top: 14px;
    width: 4px;
    height: 16px;
    background: #5c658d;
    border-radius: 2px;
  }
}
</style>
