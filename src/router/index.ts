import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Index', redirect: '/index' },
    {
      path: '/index',
      name: 'Index',
      redirect: '/index/home',
      component: () => import(/* webpackChunkName: "layout" */ '@/layouts/default.vue'),
      children: [
        {
          path: 'home',
          name: 'Home',
          component: () => import(/* webpackChunkName: "home" */ '@/pages/home/index.vue'),
          meta: {
            title: 'router.home'
          }
        },
        {
          path: 'order-list',
          name: 'OrderList',
          component: () =>
            import(/* webpackChunkName: "order_list" */ '@/pages/order-list/index.vue'),
          meta: {
            title: 'router.order_list'
          }
        },
        {
          path: 'browser',
          name: 'Browser',
          component: () => import(/* webpackChunkName: "browser" */ '@/pages/browser/index.vue'),
          meta: {
            title: 'router.browser'
          }
        }
      ]
    },
    {
      path: '/kyc-sumsub',
      component: () => import('@/pages/kyc-sumsub/index.vue'),
      name: 'KycSumsub',
      meta: {
        title: 'router.kyc_sumsub',
        auth: true
      }
    },
    {
      path: '/:pathMatch(.*)*', // 捕获所有未匹配的路由
      name: 'unknown',
      redirect: '/index'
    }
  ]
})

export default router
