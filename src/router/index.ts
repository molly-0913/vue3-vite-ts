// import { createRouter, createWebHistory } from 'vue-router/auto'
// import { setupLayouts } from 'virtual:generated-layouts'
// import { routes } from 'vue-router/auto-routes'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // routes: setupLayouts(routes)
  routes: [
    { path: '/', name: 'Index', redirect: '/counter/welcome' },
    {
      path: '/welcome',
      name: 'Welcome',
      component: () => import('@/pages/welcome/index.vue'),
      meta: {
        title: 'router.welcome'
      }
    },
    {
      path: '/order',
      name: 'OrderIndex',
      component: () => import('@/layouts/default.vue'),
      children: [
        {
          path: 'detail',
          component: () => import('@/pages/order-detail/index.vue'),
          name: 'OrderDetail',
          meta: {
            title: 'router.order_detail',
            auth: true
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
      redirect: '/welcome'
    }
  ]
})
export const authRouter = {
  path: '/counter',
  name: 'CounterIndex',
  component: () => import('@/layouts/default.vue'),
  children: [
    {
      path: 'add-card',
      component: () => import('@/pages/add-card/index.vue'),
      name: 'AddCard',
      meta: {
        title: 'router.add_card',
        auth: true
      }
    },
    {
      path: 'payment',
      component: () => import('@/pages/payment/index.vue'),
      name: 'Payment',
      meta: {
        title: 'router.payment',
        auth: true
      }
    }
  ]
}

export default router
