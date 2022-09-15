<template>
  <div class="result">
    <van-list
      v-model="loading"
      @load="getResults"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
    >
      <van-cell
        v-for="item in ResultsListt"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: { artcleId: item.art_id }
          })
        "
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultsAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      perpage: 10,
      ResultsListt: [],
      finished: false,
      error: false
    }
  },
  methods: {
    async getResults() {
      try {
        //模拟加载失败
        // if (Math.random() < 0.8) {
        //   throw new Error()
        // }
        const { data } = await getResultsAPI(
          this.page++,
          this.perpage,
          this.keywords
        )
        const ResultsListt = data.data.results
        if (ResultsListt.length === 0) {
          this.finished = true
        }
        this.ResultsListt = [...this.ResultsListt, ...data.data.results]
      } catch {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.result {
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>
