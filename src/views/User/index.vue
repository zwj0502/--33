<template>
  <div>
    <van-nav-bar
      class="navbar"
      title="标题"
      left-arrow
      @click-left="$router.back()"
    />
    <input
      type="file"
      ref="file"
      hidden
      accept=".png,pdf,jpg"
      @change="selectPhoto"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="avator" />
    </van-cell>
    <van-popup
      closeable
      v-model="isShowPhoto"
      position="bottom"
      :style="{ height: '100%' }"
      ><UpdateAvator
        v-if="isShowPhoto"
        :photo="photo"
        :avator.sync="avator"
      ></UpdateAvator
    ></van-popup>
    <!-- 昵称 -->
    <van-cell
      title="昵称"
      is-link
      @click="isShowUserName = true"
      :value="userInformation.name"
    />
    <van-popup
      v-model="isShowUserName"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <ModifyTheNickname
        v-if="isShowUserName"
        @onClickLeft="onClickLeft(isShowUserName)"
        v-model="userInformation.name"
      ></ModifyTheNickname>
    </van-popup>

    <!-- 性别 -->
    <van-cell
      title="性别"
      :value="userInformation.gender == 0 ? '男' : '女'"
      is-link
      @click="isShowUserSex = true"
    />
    <van-popup
      v-model="isShowUserSex"
      position="bottom"
      :style="{ height: '40%' }"
      ><ChangeTheGender
        v-if="isShowUserSex"
        @close="isShowUserSex = false"
        v-model="userInformation.gender"
      ></ChangeTheGender
    ></van-popup>
    <!-- 生日 -->
    <van-cell
      title="生日"
      :value="userInformation.birthday"
      is-link
      @click="isShowUserTime = true"
    ></van-cell>
    <van-popup
      v-model="isShowUserTime"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <userDateTime
        v-if="isShowUserTime"
        @close="isShowUserTime = false"
        v-model="userInformation.birthday"
      ></userDateTime
    ></van-popup>
  </div>
</template>

<script>
//.点击修改头像
//手动触发
import UpdateAvator from './components/UpdateAvator.vue'
import ModifyTheNickname from './components/ModifyTheNickname.vue'
import ChangeTheGender from './components/ChangeTheGender.vue'
import userDateTime from './components/userTime.vue'
import { resolveToBase64 } from '@/utils'
import { getCodeAPI } from '@/api'
export default {
  components: {
    UpdateAvator,
    ModifyTheNickname,
    ChangeTheGender,
    userDateTime
  },
  data() {
    return {
      isShowPhoto: false,
      isShowUserName: false,
      isShowUserSex: false,
      isShowUserTime: false,
      photo: '',
      avator: '',
      userInformation: []
    }
  },
  created() {
    this.getCode()
  },
  methods: {
    async selectPhoto() {
      const file = this.$refs.file.files[0]
      const base64 = await resolveToBase64(file)
      // console.log(base64)
      this.photo = base64
      //打开弹窗
      this.isShowPhoto = true
      //   console.dir(this.$refs.file)
      //解决不能连续选中同一张图片的bug
      this.$refs.file.value = ''
    },
    async getCode() {
      const { data } = await getCodeAPI()
      console.log(data)
      this.userInformation = data.data
    }
  },
  onClickLeft() {
    this.isShowUserName = false
  }
}
</script>

<style scoped lang="less">
.navbar {
  background: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff !important;
  }
  :deep(.van-icon) {
    color: #fff !important;
  }
}
</style>
