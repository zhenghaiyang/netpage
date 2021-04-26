import { RouteView } from '@components';
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: () => import('@components/Layout'),
    meta: {
      title: '主页',
    },
    redirect: '/dashboard',
    children: [
      // dashboard
      {
        path: 'dashboard',
        name: 'dashboard',
        fullPath: '/dashboard',
        component: () => import('@/page/Main'),
        meta: {
          title: '订单统计',
          keepAlive: true,
          icon: '',
          permission: ['dashboard'],
        },
      },
    ],
  },
];

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: RouteView,
    redirect: '/login',
    hidden: true,
    children: [
      {
        path: '/login',
        name: 'login',
        meta: {
          title: '登录',
        },
        component: () => import(/* webpackChunkName: "user" */ '@/page/Login'),
      },
      // {
      //   path: 'register',
      //   name: 'register',
      //   component: () =>
      //     import(/* webpackChunkName: "user" */ '@/views/user/Register'),
      // },
      // {
      //   path: 'register-result',
      //   name: 'registerResult',
      //   component: () =>
      //     import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult'),
      // },
      {
        path: 'recover',
        name: 'recover',
        component: undefined,
      },
    ],
  },
];
