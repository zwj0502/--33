<template>
  <div>
    <transition name="van-slide-left" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// rem适配
// 1.让rem动起来
// -yarn add amfe-flexible
//2.盒子使用rem告诉postcss
//-自动识别css中px，并将其转成rem
//post-css  css 的预处理器
//postcss 自己能干的事很少，下载插件

//1.下载yarn add postcss-pxtorem
//2.告诉postcss ,我要使用这个插件, .postcssrc.js
export default {}
</script>

<style scoped lang="less">
.app {
  width: 2rem;
  height: 2rem;
  background-color: red;
}
</style>
