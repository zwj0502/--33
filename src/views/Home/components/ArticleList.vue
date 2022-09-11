<template>
  <div>
    <ArticleItem v-for="item in articles" :key="item.art_id" :article="item" ></ArticleItem>
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
      articles: []
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
    }
  }
}
</script>

<style></style>
