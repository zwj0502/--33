import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
//封装本地存储，vuex-persistedstate
//调用
//  plugins: [createPersistedState()],
export default new Vuex.Store({
  // ...
  plugins: [
    createPersistedState({
      key: 'HEIMA_TOUTIAO',
      //storage:window.sessionStorage
      reducer({ objtoken, Mychannels }) {
        return { objtoken, Mychannels }
      }
    })
  ],

  state: {
    objtoken: {},
    Mychannels: []
  },
  getters: {
    isLogin(state) {
      return !!state.objtoken.token
    }
  },

  mutations: {
    TO_TOKEN(state, token) {
      state.objtoken = token
    },
    /**
     *
     * @param {*} channels 传过来的处理过的数组
     */
    TO_MY_CHANNELS(state, channels) {
      state.Mychannels = channels
    }
  }
})
