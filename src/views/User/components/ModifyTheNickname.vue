<template>
  <div>
    <van-nav-bar
      title="更改昵称"
      left-text="取消"
      right-text="保存"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-field
      v-model.trim="name"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入新昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { getPostCodeAPI } from '@/api'
export default {
  name: 'ModifyTheNickname',
  props: {
    value: String
  },
  created() {
    // this.name = this.userInformation.name
  },
  data() {
    return {
      name: this.value
    }
  },
  methods: {
    onClickLeft() {
      this.$parent.$parent.isShowUserName = false
    },
    async onClickRight() {
      if (this.name !== '') {
        const { data } = await getPostCodeAPI({ name: this.name })
        this.$emit('input', this.name)
        this.$parent.$parent.isShowUserName = false

        console.log(data)
      } else {
        alert('请输入内容')
      }
    }
  }
}
</script>

<style></style>
