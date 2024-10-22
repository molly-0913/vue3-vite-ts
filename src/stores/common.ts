import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { initLang } from '@/utils/common'

export const useCommonStore = defineStore('common', () => {
  const lang = ref(initLang())

  const showLangChar = computed(() => {
    const langArr = lang.value.split('')
    langArr[0] = langArr[0].toUpperCase()
    return langArr.join('')
  })

  return { lang, showLangChar }
})
