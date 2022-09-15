<template>
  <div>
    <van-cell title="搜索历史">
      <template #extra>
        <van-icon name="delete-o" v-if="!isEnde" @click="isEnde = true" />
        <div v-else>
          <span @click="$store.commit('TO_HESTORIES', [])">全部删除</span>
          &nbsp;
          <span @click="isEnde = false">完成</span>
        </div>
      </template>
    </van-cell>

    <van-cell
      v-for="(item, index) in hestories"
      :key="index"
      :title="item"
      @click="!isEnde && $emit('changge_keywords', item)"
    >
      <template #extra>
        <van-icon
          name="close"
          v-show="isEnde"
          @click="
            $store.commit(
              'TO_HESTORIES',
              hestories.filter((i) => item !== i)
            )
          "
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isEnde: false
    }
  },
  computed: {
    ...mapState(['hestories'])
  }
}
</script>

<style></style>
