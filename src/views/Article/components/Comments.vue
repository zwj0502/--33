<template>
  <van-cell-group inset>
    <van-field
      v-model.trim="content"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="vanButton"
      v-if="isDisabled"
      @click="commentBtn"
      type="primary"
      :loading="loading"
      >发布</van-button
    >
    <van-button disabled v-else type="primary">发布</van-button>
  </van-cell-group>
</template>

<script>
// 获取评论
import { postcommentsAPI } from '@/api'
export default {
  name: 'newComments',
  props: {
    ArticleList: {
      type: (Array, Object),
      required: true
    }
  },
  data() {
    return {
      content: '',
      isDisabled: false,
      loading: false,
      guanbi: false
      // newComments: []
    }
  },
  methods: {
    async commentBtn() {
      this.loading = true
      try {
        const { data } = await postcommentsAPI(
          this.ArticleList.art_id,
          this.content
          // this.ArticleList.art_id
        )
        // console.log(data.data.new_obj)
        this.$emit('CommentsNewobj', data.data.new_obj)
        this.content = ''
        this.$toast.success('发布成功')
        // this.isDisabled = false
        this.$emit('guanbi', this.guanbi)
      } catch (error) {
        this.$toast.fail('用户未认证')
      } finally {
        this.loading = false
      }
    }
  },
  watch: {
    content: {
      handler: function () {
        if (this.content !== '') {
          this.isDisabled = true
        } else {
          this.isDisabled = false
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
:deep(.van-cell) {
  width: 540px;
  margin-top: 20px;
  background-color: #f3f3f3;
}
.van-cell-group--inset {
  display: flex;
  .van-button--disabled {
    margin: 65px 0 0 15px;
    height: 82px;
  }
  .van-button--normal {
    margin: 65px 0 0 15px;
    width: 120px;
  }
}
</style>
