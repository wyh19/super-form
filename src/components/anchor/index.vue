<!--
 * @Description:锚点组件
 * @Author: wyh19
 * @Date: 2021-05-22
-->
<template>
  <div class="anchor">
    <div v-for="node in anchorNodes" :key="node.label" :label="node.index"
         :class="[node.ismain?'anchor-main-node':'anchor-sub-node']">
      {{ node.label }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      anchorNodes: [
        { label: '基础信息', ismain: true, index: '1' },
        { label: '个人信息', index: '1.1' },
        { label: '其他信息', index: '1.2' },
        { label: '高级信息', ismain: true, index: '2' },
        { label: 'xxx信息', index: '2.1' }
      ]
    }
  },
  methods: {
    handleClick(label) {

    }
  }
}
</script>

<style scoped lang="scss">
.anchor-main-node {
  position: relative;
  margin: 8px 0;
  font-size: 14px;
  font-weight: bold;
  color: #555;
  cursor: pointer;
  &::before {
    content: attr(label);
    margin-left: 6px;
    margin-right: 6px;
  }
}
.anchor-sub-node {
  position: relative;
  margin: 8px 0;
  padding-left: 22px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  &::before {
    content: attr(label);
    margin-right: 4px;
  }
}
</style>
