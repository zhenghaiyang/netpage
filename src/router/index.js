import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '@/page/User/User.vue';
Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
      {
        path: '/user',
        name: 'user',
        component: User
      }
    ]
  })

export default router;