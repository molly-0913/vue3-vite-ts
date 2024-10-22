/* eslint-disable no-console */
/* eslint-disable prefer-promise-reject-errors */
// noinspection JSIgnoredPromiseFromCall
import axios, { type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios'
import router from '@/router'
import { setEncryptConfig } from './handlers/encryptHandler'
import { useCounterStore } from '@/stores/counter'
import { useEncryptStore } from '@/stores/encrypt'
import { MD5 } from 'crypto-js'
import { getLocal } from '@/utils/storage'
import { useCommonStore } from '@/stores/common'
import { ElMessage } from 'element-plus'
import messageMixin from '@/utils/messageConfig'

const baseURL = window.location.origin + '/api'

// 配置新建一个 axios 实例
const service = axios.create({
  baseURL,
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 50000,
  responseType: import.meta.env.VITE_OPEN_ENCRYPT ? 'arraybuffer' : 'json',
  ...(import.meta.env.VITE_OPEN_ENCRYPT ? setEncryptConfig() : {})
})

// 添加请求拦截器
service.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const { aesKey, device } = useEncryptStore()
    const { lang } = useCommonStore()
    if (!aesKey) {
      router.push('/welcome')
      return Promise.reject()
    }
    const { token, isExpired } = useCounterStore()
    if (!token || isExpired()) {
      router.push('/welcome')
      return Promise.reject()
    }

    const data = config.data || {}
    const s0 = token
    const platformString = 'H5'
    const productId = 'P93'
    const language = lang.startsWith('zh') ? 'zh_TW' : lang.startsWith('ja') ? 'ja_JP' : 'en_US'

    const qid = MD5(Date.now() + String(Math.random()))

    Object.assign(data, {
      s0,
      terminalType: data.terminalType || platformString,
      domainName: window.origin,
      productId,
      appId: data.appId || getLocal('appId'),
      language
    })
    config.data = data
    config.headers['s1'] = device.fingerprint
    config.headers['deviceId'] = device.fingerprint
    config.headers['qid'] = qid
    config.headers['language'] = language

    // 存在token，设置token过期日期，30分钟
    // s0 && setTokenExpiredDate()

    console.log(`${config.url} 请求参数：`, config.data)

    return config
  },
  (error: AxiosError) => {
    // 对请求错误做些什么
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (res: AxiosResponse): any => {
    console.log(`${res.config.url} 结果：`, res.data)

    const { code } = res.data.head

    if (code !== '0000') {
      if (['2222'].includes(code)) {
        return Promise.reject(res)
      }
      // 如果s1为空或者AES KEY 过期，则重新生成AES_KEY
      if (['400002', '400003'].includes(code)) {
        router.push('/welcome')
      }
      // 如果s1为空或者AES KEY 过期，则重新生成AES_KEY
      if (['1005', '1006'].includes(code)) {
        ElMessage(messageMixin({ message: res.data.head.message, type: 'warning' }))
        router.push(`/welcome?code=${code}`)
      }
      ElMessage(messageMixin({ message: res.data.head.message, type: 'warning' }))
      return Promise.reject(res)
    }
    return res
  },
  (error: AxiosError) => {
    if (error.toJSON) {
      const errData = error.toJSON() as any
      const msg = errData.message
      ElMessage(messageMixin({ message: msg, type: 'error' }))
      return Promise.reject(msg)
    }
    if (error.response) {
      ElMessage(
        messageMixin({
          message: error.response.status + ':' + error.response.statusText,
          type: 'error'
        })
      )
    }
    return Promise.reject(error)
  }
)

export default service
