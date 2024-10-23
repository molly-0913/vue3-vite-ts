<script setup lang="ts" name="DefaultHeader">
import LogoIcon from '@/assets/images/common/LOGO.png'
import ProfileIcon from '@/assets/images/common/profile-circle.png'
import ServiceIcon from '@/assets/images/common/service.png'

const route = useRoute()
const router = useRouter()

function toRouter(name: string) {
  if (route.name === name) {
    return
  }
  router.push({ name })
}
</script>

<template>
  <div class="default-header">
    <img :src="LogoIcon" alt="" @click="toRouter('Home')" />
    <div>
      <img :src="ProfileIcon" alt="" />
      <img :src="ServiceIcon" alt="" />
    </div>
  </div>
</template>

<style lang="scss">
@import './style.scss';
</style>
