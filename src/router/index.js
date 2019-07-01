import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '@/page/User/User.vue';
import Index from '@/page/Main/Index.vue';

Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
      {
        path: '/',
        name: 'index',
        component: Index
      },
      {
        path: '/user',
        name: 'user',
        component: User
      }
    ]
  })

export default router;