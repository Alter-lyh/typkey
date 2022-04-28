import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={//要设置的全局访问的state对象
  wordChapteList: [],
  userId: null,
  userName: null
}

const getters = {   //实时监听state值的变化(最新状态)
  getWordChapteList (state) {
    return state.wordChapteList
  },
  getUserId (state) {
    return state.userId
  },
  getUserName (state) {
    return state.userName
  }
}

const mutations = {
  setWordChapteList(state, _object) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.wordChapteList = _object
  },
  setUserId(state, _object) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.userId = _object
  },
  setUserName(state, _object) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.userName = _object
  }
}

const actions = {
  setWordChapteList(context, _object) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    context.commit('setWordChapteList', _object)
  },
  setUserId(context, _object) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    context.commit('setUserId', _object)
  },
  setUserName(context, _object) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    context.commit('setUserName', _object)
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
 
export default store
