import { createI18n } from 'vue-i18n'

// 导入自定义根语言文件
import rootZhTw from './lang/zh-TW'
import rootEn from './lang/en-US'
import rootJp from './lang/ja-JP'
import { getLocal, setLocal } from '@/utils/storage'
import { initLang } from '@/utils/common'

const messages = {
  zh: {
    ...rootZhTw
  },
  en: {
    ...rootEn
  },
  ja: {
    ...rootJp
  }
}

const lang = initLang()

setLocal('lang', lang)

// 导出语言国际化
export const i18n = createI18n({
  legacy: false,
  locale: lang,
  fallbackLocale: lang,
  warnHtmlMessage: 'off',
  messages
})

export function setLocale() {
  const langId = getLocal('lang') || 'zh'
  i18n.global.locale = langId as any
}
