<template>
  <div class="page">
    <the-form />
  </div>
</template>

<script>
import TheForm from '../components/the-form'
export default {
  name: 'SuperFormAdd',
  components: {
    TheForm
  }
}
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
