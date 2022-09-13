<template>
  <div class="article">
    <van-pull-refresh v-model="refreshloading" @refresh="getNextPageArticle">
      <van-list
        v-model="loading"
        offset="100"
        :immediate-check="false"
        @load="getNextPageArticle"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
//发送请求拿到文章数据
import { getNewsAPI } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'Article',
  components: {
    ArticleItem
  },
  props: {
    id: [String.apply, Number]
  },
  data() {
    return {
      articles: [],
      preTimestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshloading: false
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      // eslint-disable-next-line no-useless-catch
      try {
        //时间戳
        //new Date()
        const { data } = await getNewsAPI(this.id, +new Date())
        this.preTimestamp = data.data.pre_timestamp
        console.log(data)
        this.articles = data.data.results
      } catch (error) {
        //js的错误，上抛，507原封不动上抛。400上抛中文
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async getNextPageArticle() {
      try {
        const { data } = await getNewsAPI(this.id, this.preTimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        //添加到articles
        if (this.loading) {
          this.articles.push(...data.data.results)
        } else {
          this.articles.unshift(...data.data.results)
          this.refreshloading = false
        }
        this.preTimestamp = data.data.pre_timestamp

        // console.log('getNextPageArticle')
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;
}
</style>
