<template>
  <div>
    <!-- 搜索框 -->

    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        background="#3696fa"
        placeholder="请输入搜索关键词"
        show-action
        @search="OnSearch"
        @focus="isSearchResult = false"
        @cancel="$router.push('/')"
      />
    </form>

    <!-- 搜索历史，搜索建议，搜索结果 -->
    <component
      @changge_keywords="OnSearch"
      :keywords="keywords"
      :is="componentName"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SerachHistory.vue'
import SearchSuggest from './components/SerachSuggestion.vue'
import SearchResult from './components/SerachResult.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    SearchHistory,
    SearchSuggest,
    SearchResult
  },
  data() {
    return {
      keywords: '',
      isSearchResult: false
    }
  },
  computed: {
    ...mapState(['hestories']),
    componentName() {
      // 搜索历史：搜索框为空
      // 搜索建议：搜索框有值，并且不渲染搜索结果
      // 搜索结果：触发搜索框，显示搜索结果

      if (this.keywords === '') {
        return SearchHistory
      } // 搜索历史：搜素框有值，并且不渲染搜索结果
      if (this.isSearchResult) {
        return SearchResult
      }
      return SearchSuggest
    }
  },
  methods: {
    ...mapMutations(['TO_HESTORIES']),

    OnSearch(keywords) {
      const distincHistories = [...new Set([keywords, ...this.hestories])]
      this.TO_HESTORIES(distincHistories)
      this.keywords = keywords
      this.isSearchResult = true
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
