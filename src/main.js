import Vue from 'vue'
// import Vuetify from 'vuetify/lib';
import App from './App.vue'
import router from './router';
import store from './store/store';
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

// Vue.use(Vuetify);

new Vue({
  render: h => h(App),

  // vuetify,
  router,

  vuetify,
  store
}).$mount('#app')
