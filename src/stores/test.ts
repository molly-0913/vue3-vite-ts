import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usetestStroe = defineStore(
  'testStroe',
  () => {
    const number = ref<number>(0)
    const lessNumber = ref<number>(20)

    const addNumber = () => {
      number.value++
    }

    const lessNumberFun = () => {
      lessNumber.value--
    }

    return {
      number,
      addNumber,
      lessNumber,
      lessNumberFun
    }
  },
  {
    //配置持久化
    persist: {
      key: 'testStroe', // 在 localStorage 中保存的 key
      storage: localStorage, // 使用 localStorage 进行存储
      pick: ['number']
    }
  }
)
