<template>
  <div class="layout-default app-bg">
    <Header />
    <el-scrollbar class="layout-scrollbar">
      <router-view />
    </el-scrollbar>
    <BottomNavigationBar />
  </div>
</template>

<script setup lang="ts" name="LayoutDefault">
import Header from './components/Header/index.vue'
import BottomNavigationBar from './components/BottomNavigationBar/index.vue'
</script>

<style lang="scss" scoped>
.layout-default {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.layout-scrollbar {
  flex-grow: 1;
  width: 100%;
}
</style>
