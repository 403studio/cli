<template>
  <van-checkbox v-model="checked" v-bind="$attrs" v-on="$listeners"><slot></slot></van-checkbox>
</template>

<script>
export default {
  name: 'ZvCheckbox',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Boolean],
      default: false
    },
    checkedValue: {
      type: [String, Boolean],
      default: true
    },
    unCheckedValue: {
      type: [String, Boolean],
      default: false
    }
  },
  data () {
    return {
      checked: false
    }
  },
  mounted () {
    if (this.value === this.checkedValue) {
      this.checked = true
    }
  },
  watch: {
    checked (newVal, oldVal) {
      const value = newVal ? this.checkedValue : this.unCheckedValue
      this.$emit('change', value)
    },
    value: {
      immediate: true,
      handler: function (newVal, oldVal) {
        if (newVal === this.checkedValue) {
          this.checked = true
        }
      }
    }
  }
}
</script>
