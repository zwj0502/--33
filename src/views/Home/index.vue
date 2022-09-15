<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title
        ><van-button
          icon="search"
          block
          round
          size="small"
          type="default"
          @click="$router.push('/search')"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in channelList" :key="item.id">
        <!-- 文章详情 -->
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <!-- <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab> -->
      <span class="toutiao toutiao-gengduo" @click="isShow = true"></span>
    </van-tabs>
    <van-popup
      closeable
      close-icon-position="top-left"
      v-model="isShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channelEndth
        v-if="isShow"
        @channel-bask=";[(isShow = false), (active = $event)]"
        :mychannelList="channelList"
        @del-chanel="delchannel"
        @add-channel="addchnnel"
      ></channelEndth>
    </van-popup>
  </div>
</template>

<script>
import channelEndth from '@/views/Home/components/channelEndth.vue'

import { channelAPI, delChannelsAPI, addChannelsAPI } from '@/api'
import ArticleList from './components/ArticleList.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: { ArticleList, channelEndth },
  data() {
    return {
      active: 2,
      channelList: [],
      isShow: false
    }
  },
  created() {
    this.istorygetChannel()
  },
  methods: {
    ...mapMutations(['TO_MY_CHANNELS']),
    istorygetChannel() {
      if (this.isLogin) {
        //已经登录
        this.getChannel()
      } else {
        const chnnels = this.$store.state.Mychannels
        if (chnnels.length === 0) {
          this.getChannel()
        } else {
          this.channelList = chnnels
        }
      }
    },
    async getChannel() {
      try {
        const { data } = await channelAPI()
        console.log(data)
        this.channelList = data.data.channels
      } catch (error) {
        if (!error.response) {
          throw error
        } else {
          const status = error.response.status
          status === 507 && this.$toast.fail('刷新再试')
        }
      }
    },
    async delchannel(id) {
      try {
        const newChannels = this.channelList.filter((item) => item.id !== id)
        if (this.isLogin) {
          await delChannelsAPI(id)
        } else {
          this.TO_MY_CHANNELS(newChannels)
        }
        this.channelList = newChannels
        this.$toast.success('删除成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录后删除')
        } else {
          throw error
        }
      }
    },
    async addchnnel(channel) {
      try {
        if (this.isLogin) {
          await addChannelsAPI(channel.id, this.channelList.length)
        } else {
          this.TO_MY_CHANNELS([...this.channelList, channel])
        }
        this.channelList.push(channel)
        this.$toast.success('添加成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录后添加')
        } else {
          throw error
        }
      }
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>
<style scoped lang="less">
.navbar {
  background-color: #3296fa;

  // inherit 继承
  // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
