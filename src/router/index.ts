import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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

export default router
