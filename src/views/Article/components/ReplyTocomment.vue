<template>
  <div>
    <van-nav-bar
      :title="
        commitItem[0].reply_count > 0
          ? `${commitItem[0].reply_count}条回复`
          : '暂无回复'
      "
      left-arrow
      @click-left="$emit('isisRelty')"
    />
    <!-- <van-nav-bar
      v-else
      :title="
        commitItem[0].reply_count > 0
          ? `${commitItem[0].reply_count + 1}条回复`
          : '暂无回复'
      "
      left-arrow
      @click-left="$emit('isisRelty', false)"
    /> -->
    <div class="maintwo">
      <Comment :GetcommentsList="commitItem"></Comment>
      <p style="font-size: 15px">全部回复</p>
      <hr />
      <Comment :GetcommentsList="ReplyList"></Comment>
      <p class="more">没有更多了</p>
    </div>
    <van-button
      type="primary"
      color="#3296fa"
      size="large"
      @click="isShow = true"
      >评论</van-button
    >
    <van-popup v-model="isShow" position="bottom" :style="{ height: '30%' }">
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
    </van-popup>
  </div>
</template>

<script>
import { GetcommentsAPI, postcommentsAPI } from '@/api'
import Comment from './Comment.vue'
export default {
  name: 'reply',
  props: {
    commitItem: {
      //   type: [Object, Array],
      required: true
    },
    articleId: { type: String }
  },
  components: {
    Comment
  },
  data() {
    return {
      ReplyList: [],
      isShow: false,
      content: '',
      isDisabled: false,
      loading: false
    }
  },
  created() {
    // console.log(this.articleId)
    this.getGetcomments()
    // this.commitItem[0].reply_count + 1
    console.log(this.commitItem)
  },
  methods: {
    async getGetcomments() {
      const { data } = await GetcommentsAPI({
        type: 'c',
        source: this.commitItem[0].com_id,
        //         //offsetParent：获取带有定位的最近父元素
        offset: this.offset
      })
      console.log(data)
      this.ReplyList = data.data.results
    },
    async commentBtn() {
      const { data } = await postcommentsAPI(
        this.commitItem[0].com_id,
        this.content,
        this.articleId
      )
      console.log(data)
      this.ReplyList.unshift(data.data.new_obj)
      this.$toast.success('评论成功')
      // this.getGetcomments()
      // this.commitItem[0].reply_count = this.commitItem[0].reply_count + 1
      this.$emit('commitItemreplycount', 1)
      this.content = ''
      this.isShow = false
      // this.iscommit = true
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
  //   methods: {
  //       isisReply() {
  //         this.$emit()
  //       }
  //   }
}
</script>

<style scoped lang="less">
.more {
  font-size: 26px;
  color: #969799;
  text-align: center;
}

// height: calc(100vh - 50px);
// overflow: auto;
.maintwo {
  height: calc(100vh - 100px - 100px);
  overflow: auto;
}
</style>
