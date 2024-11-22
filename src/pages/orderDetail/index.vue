<template>
  <div>test-{{ test }}</div>
  <div>
    hooks --
    <p>width -- {{ objSize.width }}</p>
    <p>height -- {{ objSize.height }}</p>
  </div>
  <div>
    <div>
      <span>stroe -- add {{ number }}</span>
      <span @click="() => addNumber()">+</span>
    </div>
    <div>
      <span>stroe -- less {{ lessNumber }}</span>
      <span @click="() => lessNumberFun()">-</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import testHooks from '@/hooks/test'
import { usetestStroe } from '@/stores/test'

const { number, lessNumber } = storeToRefs(usetestStroe())
const { addNumber, lessNumberFun } = usetestStroe()
const { objSize } = testHooks()
const test = ref('123333333')
</script>
