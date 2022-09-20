<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>
<script>
import { getPostCodeAPI } from '@/api'
import dayjs from 'dayjs'
export default {
  name: 'time',
  props: {
    value: String
  },
  data() {
    return {
      minDate: new Date(1900, 1, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },

  methods: {
    async onConfirm() {
      try {
        this.$toast.loading({
          message: '保存中...',
          forbidClick: true // 禁止背景点击
        })
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await getPostCodeAPI({ birthday: currentDate }) // 更新视图
        this.$emit('input', currentDate) // 关闭弹窗
        this.$emit('close') // 提示成功
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style></style>
