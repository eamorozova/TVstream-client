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
  },
  mutations: {
    setLike(state, channel) {
      const exist = state.favorites.some(item => item.id === channel.id);
      if (!exist) {
        state.favorites.push(channel);
      }
    },
    removeFavorite(state, index) {
      state.favorites.splice(index, 1);
    },
    setToken(state, token) {
      state.token = token;
      state.isLoggedIn = !!token;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    setLike({ commit }, channel) {
      commit('setLike', channel);
    },
    removeFavorite({ commit }, index) {
      commit('removeFavorite', index);
    },
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    setUser({ commit }, user) {
      commit('setUser', user);
    },
  },
  getters: {
    CHANNELS(state) {
      return state.channels;
    },
    FAVORITES(state) {
      return state.favorites;
    },
  },
});
