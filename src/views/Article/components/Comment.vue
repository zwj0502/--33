<template>
  <div>
    <!-- <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    > -->
    <van-cell v-for="item in GetcommentsList" :key="item.com_id">
      <van-image
        slot="icon"
        round
        width="30"
        height="30"
        style="margin-right: 10px"
        :src="item.aut_photo"
      />
      <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
      <div slot="label">
        <p style="color: #363636">{{ item.content }}</p>
        <p>
          <span style="margin-right: 10px">{{ item.pubdate }}</span>
          <van-button size="mini" @click="replyBtn(item)" type="default"
            >回复{{ item.reply_count }}</van-button
          >
        </p>
      </div>
      <van-icon slot="right-icon" name="good-job-o">赞</van-icon>
    </van-cell>
    <!-- </van-list> -->
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
// import { GetcommentsAPI } from '@/api'
export default {
  props: {
    GetcommentsList: {
      type: Array,
      required: true
    }
    // articleId: {
    //   type: String,
    //   required: true
    // },
    // newCommentsList: {
    //   // type: Array,
    //   required: true
    // }
  },
  data() {
    return {
      loading: false,
      finished: false,
      isReply: false
    }
  },
  computed: {
    label() {
      const { pubdate } = this.GetcommentsList
      console.log(pubdate)
      return `${dayjs(pubdate).fromNow()}`
    }
  },
  methods: {
    replyBtn(item) {
      this.$emit('reply', !this.isReply, item)
      console.log(item)
    }
  }
  //   methods: {
  //     async onLoad() {
  //       this.loading = true
  //       //   console.log(this.articleId)
  //       const { data } = await GetcommentsAPI({
  //         type: 'a',
  //         source: this.articleId,
  //         //offsetParent：获取带有定位的最近父元素
  //         offset: this.offset
  //       })
  //       //   console.log(data)
  //       // eslint-disable-next-line vue/no-mutating-props
  //       this.GetcommentsList = data.data.results
  //       this.loading = false
  //       this.finished = true
  //     }
  //   }
}
</script>

<style scoped lang="less">
.van-card__thumb {
  width: 72px;
  height: 72px;
}
:deep(.van-card__thumb img) {
  border-radius: 0.5rem;
}
.van-card__title {
  color: #466a9c;
}
</style>
