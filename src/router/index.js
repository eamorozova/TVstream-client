import Vue from 'vue';
import Router from 'vue-router';
import Register from '../components/Register';
import Login from '../components/Login';
import Channels from '../components/Channels';
import Favorites from '../components/Favorites';
import Header from "@/components/Header";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'channels',
      component: Channels,
      props: true,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites,
      props: true,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/header',
      name: 'header',
      component: Header,
    },
  ],
});
