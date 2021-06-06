import Router from 'vue-router';
import Vue from 'vue';
import Channels from '../components/Channels';
import CreateChannel from '../components/CreateChannel';
import Favorites from '../components/Favorites';
import Login from '../components/Login';
import Register from '../components/Register';
import ViewChannel from '../components/ViewChannel';
import AddStream from '../components/AddStream';
import UserProfile from '../components/UserProfile';
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
      path: '/channels/:channelId',
      name: 'channel',
      component: ViewChannel,
    },
    {
      path: '/create',
      name: 'createChannel',
      component: CreateChannel,
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
      path: '/addstream',
      name: 'addstream',
      component: AddStream,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/user',
      name: 'userprofile',
      component: UserProfile,
    },
  ],
});
