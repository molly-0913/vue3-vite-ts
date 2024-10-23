<script setup lang="ts" name="BottomNavigationBar">
import HomeActiveIcon from '@/assets/images/common/home_active.png'
import HomeUnIcon from '@/assets/images/common/home_un.png'
import OrderActiveIcon from '@/assets/images/common/order_active.png'
import OrderUnIcon from '@/assets/images/common/order_un.png'
import BrowserActiveIcon from '@/assets/images/common/browser_active.png'
import BrowserUnIcon from '@/assets/images/common/browser_un.png'
import type { RouteLocationNormalized } from 'vue-router'

const router = useRouter()

const route = useRoute()

const barList: BarItem[] = [
  { name: '资产', activeIcon: HomeActiveIcon, unIcon: HomeUnIcon, router: 'Home', id: 1 },
  {
    name: '账单',
    activeIcon: OrderActiveIcon,
    unIcon: OrderUnIcon,
    router: 'OrderList',
    id: 2
  },
  {
    name: '浏览器',
    activeIcon: BrowserActiveIcon,
    unIcon: BrowserUnIcon,
    router: 'Browser',
    id: 3
  }
]

const activeId = ref(1)

function toRouter(item: BarItem) {
  if (item.id === activeId.value) {
    return
  }
  router.push({ name: item.router })
}

function setActiveId(to: RouteLocationNormalized) {
  const findRoute = barList.find((item) => item.router === to.name)
  if (findRoute) {
    activeId.value = findRoute.id
  }
}

router.afterEach((to, from) => {
  setActiveId(to)
})

onMounted(() => {
  setActiveId(route)
})
</script>

<template>
  <div class="bottom-navigation-bar">
    <div v-for="item in barList" :key="item.id">
      <div @click="toRouter(item)">
        <div>
          <img v-show="activeId === item.id" height="20" width="20" :src="item.activeIcon" alt="" />
          <img v-show="activeId !== item.id" height="20" width="20" :src="item.unIcon" alt="" />
        </div>
        <div class="name-text" :class="{ 'name-text-active': activeId === item.id }">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './style.scss';
</style>
