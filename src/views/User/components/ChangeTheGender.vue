<template>
  <div>
    <van-picker
      show-toolbar
      title="更新性别"
      :default-index="value"
      :columns="columns"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onChange"
    />
  </div>
</template>

<script>
import { getPostCodeAPI } from '@/api'
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true // 禁止背景点击
      })
      try {
        await getPostCodeAPI({ gender: this.localGender }) // 更新视图
        this.$emit('input', this.localGender) // 关闭弹窗
        this.$emit('close') // 提示成功
        this.$toast.success('修改性别成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    },
    onChange(picker, value, index) {
      this.localGender = index
    }
  }
}
</script>

<style scoped lang="less"></style>
