import Vue from 'vue';
import Vuex from 'vuex';
import AuthenticationService from '../services/AuthenticationService';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    channels: [],
    favorites: [],
    token: null,
    user: null,
    isLoggedIn: false,
  },
  mutations: {
    SET_CHANNELS_TO_STATE: (state, channels) => {
      state.channels = channels;
    },
    SET_LIKE: (state, channel) => {
      const exist = state.favorites.some(item => item.id === channel.id);
      if (!exist) {
        state.favorites.push(channel);
      }
    },
    REMOVE_FAVORITE: (state, index) => {
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
    GET_CHANNELS({ commit }) {
      AuthenticationService.getChannels()
        .then(channels => {
          commit('SET_CHANNELS_TO_STATE', channels.data);
          return channels;
        })
        .catch(error => {
          console.log(error);
          return error;
        });
    },
    LIKE({ commit }, channel) {
      commit('SET_LIKE', channel);
    },
    DELETE_FAVORITE({ commit }, index) {
      commit('REMOVE_FAVORITE', index);
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
