<template>
  <div>
    <van-cell
      v-for="(item, index) in highlightSuggstions"
      :key="index"
      icon="search"
      @click="$emit('changge_keywords', suggstions[index])"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggstionsAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggstions: []
    }
  },
  //   updated() {
  //     this.getSuggstions()
  //   },
  watch: {
    keywords: {
      immediate: true,
      handler: 'getSuggstions'
    }
  },
  computed: {
    highlightSuggstions() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggstions.map((str) => {
        return str.replace(
          reg,
          (match) => `<span style="color:red">${match}</span>`
        )
      })
    }
  },
  methods: {
    getSuggstions: debounce(async function () {
      try {
        const { data } = await getSuggstionsAPI(this.keywords)
        this.suggstions = data.data.options.filter(Boolean)
      } catch (error) {
        if (error.response) {
          //   console.log()
          this.$toast.fail('数据获取失败')
        } else {
          throw error
        }
      }
      //   console.log(data)
    }, 300)
  }
}
</script>

<style></style>
