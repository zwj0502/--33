<template>
  <div class="channel-enid">
    <!-- 我的频道 -->
    <!-- 标题 -->
    <van-cell title="我的频道">
      <van-button
        class="btn"
        size="mini"
        round
        style="color: red; border-color: red"
        @click="isEnde = !isEnde"
        >{{ isEnde ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <div class="my-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="(item, index) in mychannelList"
          :key="item.id"
          :text="item.name"
          :class="{ active: item.name === '推荐' }"
          :icon="isEnde && item.name !== '推荐' ? 'cross' : ''"
          @click="handleMychannel(item, index)"
        >
        </van-grid-item>
      </van-grid>
    </div>
    <van-cell title="推荐频道"></van-cell>

    <div class="recommend-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="item in recomendChannels"
          :key="item.id"
          :text="item.name"
          icon="plus"
          @click="$emit('add-channel', item)"
        >
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannelsAPI } from '@/api'
export default {
  props: {
    mychannelList: Array
  },
  data() {
    return {
      isEnde: false,
      allchannels: []
    }
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels() {
      const { data } = await getAllChannelsAPI()
      this.allchannels = data.data.channels
    },
    handleMychannel({ name, id }, index) {
      if (this.isEnde && name !== '推荐') {
        this.$emit('del-chanel', id)
        console.log('删除' + name)
      } else {
        this.$emit('channel-bask', index)
        //关闭弹窗
        //2.切换频道
      }
    }
  },
  computed: {
    recomendChannels() {
      return this.allchannels.filter((allchannelItem) => {
        return !this.mychannelList.find(
          (mychannelItem) => mychannelItem.id === allchannelItem.id
        )
      })
    }
  }
}
</script>

<style scoped lang="less">
:deep(.active) {
  .van-grid-item__text {
    color: red;
  }
}
.channel-enid {
  padding-top: 92px;
}
:deep(.btn) {
  width: 100px;
  font-size: 25px;
}
:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
// 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  transform: translate(20%, -35%);
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
