<script setup lang="ts" name="App">
import { RouterView } from 'vue-router'

import { useCounterStore } from '@/stores/counter'
import { useEncryptStore } from '@/stores/encrypt'

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
</script>

<template>
  <RouterView />
  <ToKycModel />
  <To3dsModel />
</template>
