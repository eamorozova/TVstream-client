import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import vuetify from './plugins/vuetify';
import { sync } from 'vuex-router-sync';

Vue.config.productionTip = false;

sync(store, router);

new Vue({
  render: h => h(App),
  router,
  vuetify,
  store,
}).$mount('#app');
