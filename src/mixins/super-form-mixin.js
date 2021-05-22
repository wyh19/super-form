/**
 * @Description:
 * @Author: wyh19
 * @Date: 2021-05-21
 */
import { easyClone } from '@/utils'
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      formData: {}
    }
  },
  watch: {
    data: {
      handler(newValue) {
        this.formData = easyClone(newValue) || {}
      },
      immediate: true
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
