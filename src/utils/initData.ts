import { getQueryString } from './parseUrl'
import { setLocal } from './storage'

const appId = getQueryString('appId')

const lang = getQueryString('lang')

// const token = getQueryString('token')

if (appId) {
  setLocal('appId', appId)
}

// if (token) {
//   setLocal('logger', token)
// }
if (lang) {
  console.log('lang.slice(0, 2)', lang.slice(0, 2))
  setLocal('lang', lang.slice(0, 2))
}
