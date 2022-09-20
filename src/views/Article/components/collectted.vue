<template>
  <van-icon
    v-if="is_collected"
    color="#777"
    name="star-o"
    @click="postcollected"
  />
  <van-icon
    class="vanicon"
    v-else
    color="red"
    name="star"
    @click="postcollected"
  />
</template>

<script>
import { postcollectedAPI, deletecollectedAPI } from '@/api'
export default {
  props: {
    is_collected: {
      // type: Boolean,
      required: true
    },
    art_id: {
      // type: String,
      required: true
    }
  },
  methods: {
    async postcollected() {
      if (this.is_collected) {
        await deletecollectedAPI(this.art_id)
      } else {
        const { data } = await postcollectedAPI(this.art_id)
        console.log(data)
      }
      this.$emit('postcollected', !this.is_collected)
    }
  }
}
</script>

<style scoped lang="less"></style>
