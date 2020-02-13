import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import axios from "axios";
export default new Vuex.Store({
  state: {
    user: {
      loggedIn: localStorage.getItem("x-token") ? true : false
    }
  },
  getters: {
    auth(state) {
      return state.user;
    }
  },
  mutations: {
    UPDATE_LOGIN: (state, boo) => {
      state.user.loggedIn = boo;
    },
    UPDATE_ACTIVATE: (state, value = true) => {
      state.user.isActivated = value;
    }
  },
  actions: {
    VERIFY_TOKEN: async function(state) {
      axios
        .get("http://localhost:3000/api/brand/verifytoken")
        .then(res => {
          this.commit("UPDATE_LOGIN", true);
        })
        .catch(err => {
          this.commit("UPDATE_LOGIN", false);
        });
    }
  }
});
