<script setup lang="ts" name="App">
import { RouterView } from 'vue-router'

import { useCounterStore } from '@/stores/counter'
import { useEncryptStore } from '@/stores/encrypt'
import { changeFavicon } from './utils/common'

const encryptStore = useEncryptStore()

const { aesKey } = storeToRefs(useEncryptStore())
const counterStore = useCounterStore()
counterStore.$persist()

watch(
  () => aesKey.value,
  (aesKeyNew) => {
    if (!aesKeyNew) {
      encryptStore.initAesKey()
    } else {
      counterStore.initCounter()
    }
  },
  { immediate: true }
)

function onResize() {
  if (document.documentElement.clientWidth > 768) {
    //
  }
}

onMounted(() => {
  window.addEventListener('resize', onResize)
  nextTick(() => {
    changeFavicon()
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <RouterView />
  <ToKycModel />
  <To3dsModel />
</template>
