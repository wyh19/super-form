<!--
 * @Description:锚点组件
 * @Author: wyh19
 * @Date: 2021-05-22
-->
<template>
  <div class="anchor">
    <div v-for="node in sections" :key="node.label" :label="node.index"
         :class="[node.ismain?'anchor-main-node':'anchor-sub-node',{'anchor-node-active':currentSection===node.label}]"
         @click="handleClick(node.label)">
      {{ node.label }}
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
export default {
  props: {
    pageBlock: HTMLElement
  },
  data() {
    return {
      currentSection: '',
      sections: []
    }
  },
  mounted() {
    this.sections = this.getSectionsData(this.pageBlock)
    // 初始化时高亮第一个
    this.currentSection = this.getCurrentSection()
    this.debouncedPageScrollHandler = debounce(this.handlePageScroll, 100)
    this.pageBlock.addEventListener('scroll', this.debouncedPageScrollHandler)
  },
  beforeDestroy() {
    this.pageBlock.removeEventListener('scroll', this.debouncedPageScrollHandler)
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
          label: item.dataset.section,
          top: item.offsetTop
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
      // 当前表单的的scrollTop
      const currentScrollTop = this.pageBlock.scrollTop
      const sections = this.sections
      const length = sections.length
      let currentSection
      // 依次和各节点原先的offsetTop进行比较
      for (let i = 0; i < length; i++) {
        // 如果scrollTop正好和某节点的offsetTop相等
        // 或者scrollTop介于当前判断的节点和下一个节点之间
        // 由于需要下一个节点，所以当前节点不能是最后一个节点
        if (currentScrollTop === sections[i].top ||
          (i < length - 1 &&
            currentScrollTop > sections[i].top &&
            currentScrollTop < sections[i + 1].top)) {
          currentSection = sections[i].label
          break
        } else if (i === length - 1) {
          // 如果判断到一个节点，只要 scrollTop大于节点的offsetTop即可
          if (currentScrollTop > sections[i].top) {
            currentSection = sections[i].label
            break
          }
        }
      }
      return currentSection
    },
    handleClick(label) {
      // 设置当前锚点对应章节
      this.currentSection = label
      // 查找到到该章节的dom
      const section = this.pageBlock.querySelector(`[data-section=${label}]`)
      // 平滑滚动至该章节
      // setTimeout(() => {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      // })
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
.anchor-node-active {
  color: #38f;
}
</style>
