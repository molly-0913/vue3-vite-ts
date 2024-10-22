<template>
  <div class="layout-default app-bg">
    <Header />
    <el-scrollbar class="scrollbar">
      <router-view />
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts" name="LayoutDefault">
const Header = defineAsyncComponent(() => import('./components/Header/index.vue'))
</script>

<style lang="scss" scoped>
.layout-default {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.scrollbar {
  flex-grow: 1;
  width: 100%;
}
</style>
