<template>
  <div>
    <router-view></router-view>
    <div>{{ count }}</div>
    <h1>count的十倍:{{ bigNum }}</h1>
    <button @click="SET_COUNT(10)">++1</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
// rem适配
// 1.让rem动起来
// -yarn add amfe-flexible
//2.盒子使用rem告诉postcss
//-自动识别css中px，并将其转成rem
//post-css  css 的预处理器
//postcss 自己能干的事很少，下载插件

//1.下载yarn add postcss-pxtorem
//2.告诉postcss ,我要使用这个插件, .postcssrc.js
export default {
  methods: {
    // btn() {
    //   this.$store.commit('SET_COUNT', 10)
    // }
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
  }
}
</script>

<style scoped lang="less">
.app {
  width: 2rem;
  height: 2rem;
  background-color: red;
}
</style>
