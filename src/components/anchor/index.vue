<!--
 * @Description:锚点组件
 * @Author: wyh19
 * @Date: 2021-05-22
-->
<template>
  <div class="anchor">
    <div v-for="node in sections" :key="node.label" :label="node.index"
         :class="[node.ismain?'anchor-main-node':'anchor-sub-node']">
      {{ node.label }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageBlock: HTMLElement
  },
  data() {
    return {
      sections: []
    }
  },
  mounted() {
    this.sections = this.getSectionsData(this.pageBlock)
    this.pageBlock.addEventListener('scroll', this.handlePageScroll)
  },
  beforeDestroy() {
    this.pageBlock.removeEventListener('scroll', this.handlePageScroll)
  },
  methods: {
    // 从pageBlock中获取章节信息
    getSectionsData(pageBlock) {
      let mainIndex = 0 // 主节点的数字序号
      let subIndex = 0 // 子节点的数字序号
      // 查询出data-section的节点，并转化成数组
      const sections = Array.from(pageBlock.querySelectorAll('[data-section]'))
      // map转化节点数组为最终的数据
      return sections.map((item, index) => {
        let ismain = false
        if ('ismain' in item.dataset) {
          ismain = true
          mainIndex++
          // 遇到新的主节点，重置subIndex
          subIndex = 0
        } else {
          subIndex++
        }
        return {
          ismain,
          index: ismain ? mainIndex : `${mainIndex}.${subIndex}`,
          label: item.dataset.section
        }
      })
    },
    // 页面的滚动事件处理函数
    handlePageScroll(e) {
      e.stopPropagation()
      this.currentSection = this.getCurrentSection()
    },
    // 计算出当前滚动到的章节
    getCurrentSection() {

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
