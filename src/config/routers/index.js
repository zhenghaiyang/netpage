import Vue from 'vue';
import VueRouter from 'vue-router';
import User from '@/page/User/User.vue';
import Main from '@/page/Main/Index.vue';
import Login from '@/page/Login/index.vue';
Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Main,
    },
  ],
});

export default router;
