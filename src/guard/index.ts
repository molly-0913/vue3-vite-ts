// 引入 router 实例
import router from '@/router'
import { useCounterStore } from '@/stores/counter'
import { useEncryptStore } from '@/stores/encrypt'

// 路由加载前
router.beforeEach(async (to, from, next) => {
  if (to.meta.auth) {
    const { aesKey } = useEncryptStore()
    const { token, billNo } = useCounterStore()
    console.log('aesKey=>', aesKey)
    if (!aesKey) {
      next('/index')
    }
    if (!token) {
      next('/index')
    }
    if (to.name === 'OrderDetail' && !billNo) {
      next('/index')
    }
  }
  next()
})

// 路由加载后
router.afterEach(async (_, from) => {
  //
})
