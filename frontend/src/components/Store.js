import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentState: "init",
    roomId: null,
    userName: null,
    waiting: false,
    users: [],
    isCreator: false,
    question: "",
    answer: "",
    submitted: false
  }
})