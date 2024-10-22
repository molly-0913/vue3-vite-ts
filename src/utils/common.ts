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

export function formatDetailDate(data?: string) {
  return dayjs(data).format('MMM DD, hh:mm a')
}

export function changeFavicon() {
  const favicon: any = document.getElementById('favicon')

  if (favicon) {
    // 替换 href，动态更新网站图标
    favicon.href = `${getLocal('appId')}.ico`
  } else {
    // 如果没有找到favicon，可以创建新的link标签
    const newFavicon = document.createElement('link')
    newFavicon.rel = 'icon'
    newFavicon.href = `${getLocal('appId')}.ico`
    document.head.appendChild(newFavicon)
  }
}

export function setPayTypeName(payType: string) {
  const obj: any = {
    '138': 'DINERCLUB',
    '137': 'AMEX',
    '136': 'JCB',
    '135': 'MASTERCARD',
    '134': 'VISA'
  }
  return obj[payType] || 'CARD'
}
