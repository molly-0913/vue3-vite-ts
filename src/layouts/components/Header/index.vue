<template>
  <div class="header">
    <div class="user-info">
      <img :src="Avatar" alt="" class="avatar-img" />
      <div>
        {{
          userInfo.email
            ? maskEmail(userInfo.email)
            : maskPhone(userInfo?.countryCode || '', userInfo?.phoneNo || '')
        }}
      </div>
    </div>
    <LangSelect />
  </div>
</template>

<script setup lang="ts" name="Header">
import Avatar from '@/assets/images/avatar.png'
import LangSelect from '../LangSelect/index.vue'
import { maskEmail, maskPhone } from '@/utils/parseTools'
import { useCounterStore } from '@/stores/counter'

const { userInfo } = storeToRefs(useCounterStore())
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 56px;
  background-color: var(--header-bg-color);
  flex-shrink: 0;
  color: var(--header-text-color);
  display: flex;
  padding: 0 36px;
  justify-content: space-between;
  align-items: center;
  .user-info {
    display: flex;
    align-items: center;
    .avatar-img {
      height: 32px;
      width: 32px;
      margin-right: 8px;
    }
  }
}

@media (max-width: 540px) {
  .header {
    padding: 0 18px;
  }
}
</style>
