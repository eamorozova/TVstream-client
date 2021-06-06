import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: {
    channels: [],
    favorites: [],
    token: null,
    user: null,
    isLoggedIn: false,
    isAdmin: false,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      state.isLoggedIn = !!token;
    },
    setUser(state, user) {
      state.user = user;
      if (user === null) {
        state.isAdmin = false;
      } else {
        state.isAdmin = user.email === 'admin@admin.admin';
      }
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    setUser({ commit }, user) {
      commit('setUser', user);
    },
  },
});
