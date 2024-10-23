import dayjs from 'dayjs'
import { getLocal } from './storage'

export function getSystemLang() {
  // 获取首选语言
  const language = navigator.language.slice(0, 2)
  if (language && ['zh', 'ja', 'en'].includes(language)) {
    return language
  } else {
    return 'zh'
  }
}

export function initLang(): string {
  const lang = getLocal('lang') || getSystemLang()
  return lang.slice(0, 2)
}
// 动态加载 /src/assets/images/ 目录下的图片
export const getImageUrl = (imageName: string, type = '.png') => {
  return new URL(`/src/assets/images/pay_type/${imageName}${type}`, import.meta.url).href
}
