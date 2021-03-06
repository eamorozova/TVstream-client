import Router from 'vue-router';
import Vue from 'vue';
import AddStream from '../components/AddStream';
import Channels from '../components/Channels';
import CreateChannel from '../components/CreateChannel';
import CreateProgram from '../components/CreateProgram';
import Favorites from '../components/Favorites';
import Login from '../components/Login';
import Register from '../components/Register';
import ViewChannel from '../components/ViewChannel';
import UserProfile from '../components/UserProfile';
import ViewProgram from '../components/ViewProgram';
Vue.use(Router);

export default new Router({
  routes: [
    // канал
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
      path: '/create-channel',
      name: 'createChannel',
      component: CreateChannel,
    },
    // телепередача
    {
      path: '/programs/:programId',
      name: 'viewprogram',
      component: ViewProgram,
    },
    {
      path: '/create-program',
      name: 'createProgram',
      component: CreateProgram,
    },
    // избранное
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites,
      props: true,
    },
    // авторизация
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
      path: '/user',
      name: 'userprofile',
      component: UserProfile,
    },
    {
      path: '/add-stream',
      name: 'addstream',
      component: AddStream,
    },
  ],
});
