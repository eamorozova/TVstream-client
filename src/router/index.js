import Router from 'vue-router';
import Vue from 'vue';
import Channels from '../components/Channels';
import CreateChannel from '../components/CreateChannel';
import EditChannel from '../components/EditChannel';
import Header from '../components/Header';
import Favorites from '../components/Favorites';
import Login from '../components/Login';
import Register from '../components/Register';
import ViewChannel from '../components/ViewChannel';

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
      path: '/channels/:channelId/edit',
      name: 'editChannel',
      component: EditChannel,
    },
    {
      path: '/create',
      name: 'createChannel',
      component: CreateChannel,
    },
    {
      path: '/header',
      name: 'header',
      component: Header,
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
  ],
});
