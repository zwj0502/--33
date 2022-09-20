<template>
  <van-button
    v-if="this.is_followed"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    :loading="loading"
    size="small"
    icon="plus"
    @click="getFocusOn"
    >关注</van-button
  >
  <van-button @click="getFocusOn" v-else class="follow-btn" round size="small"
    >已关注</van-button
  >
</template>

<script>
import { getFocusOnAPI, DeleteOnAPI } from '@/api'
export default {
  name: 'follow-user',
  data() {
    return {
      loading: false
    }
  },
  props: {
    aut_id: {
      type: String,
      required: true
    },
    is_followed: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    // 关注用户
    async getFocusOn() {
      // 如果已关注，则取消关注
      this.loading = true
      try {
        if (this.is_followed) {
          await DeleteOnAPI(this.aut_id)
          // eslint-disable-next-line vue/no-mutating-props
        } else {
          await getFocusOnAPI(this.aut_id)
        }
        // 更新视图
        this.$emit('is_collectedbtn', !this.is_followed)
      } catch (error) {
        if (error.message && error.response.status === 401) {
          this.$toast.fail('未认证')
        } else {
          throw error
        }
      } finally {
        // 关闭按钮的 loading 状态
        this.loading = false
      }
    }
  }
}
</script>

<style></style>
