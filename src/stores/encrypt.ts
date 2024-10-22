import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { JSEncrypt } from 'encryptlong'
import { hextopem } from '@/utils/aesKeyTools'
import { getPublicKey, getPrivateKey } from '@/api/aesKey'
import { getDeviceInfo } from '@/utils/getDeviceInfo'
import { Base64 } from 'js-base64'
import { detectInfo, type Browser, type Os } from '@/utils/detectInfo'
import { nanoid } from 'nanoid'
import { Buffer } from 'buffer'

export interface DeviceState {
  OS: string
  OSVersion: string
  UUID: string
  date: string
  deviceType: string
  browserInfo: string
  domain: string
  fingerprint: string
  language: string
  netWork: string
  screenHeight: number
  screenWidth: number
  userAgent: string
  is_update_device: boolean
  os?: Os
  browser?: Browser
  deviceName?: string
}

const initState: DeviceState = {
  OS: '',
  OSVersion: '',
  UUID: '',
  date: '',
  deviceType: '',
  browserInfo: '',
  domain: '',
  fingerprint: '',
  language: '',
  netWork: '',
  screenHeight: 0,
  screenWidth: 0,
  userAgent: '',
  is_update_device: false,
  os: undefined,
  browser: undefined,
  deviceName: ''
}

export const useEncryptStore = defineStore(
  'encrypt',
  () => {
    const aesKey = ref('')

    const device = reactive<DeviceState>(Object.assign({}, initState))

    async function initAesKey() {
      await initDeviceInfo()
      const encrypt = new JSEncrypt()
      const key = encrypt.getKey()
      const publicKey = key.getPublicKey()
      const res = await getPublicKey()
      const pubKeyServerHex = Buffer.from(res.data).toString('hex')
      const pubKeyServerPEM = hextopem(pubKeyServerHex, 'PUBLIC KEY')
      const encrypt2 = new JSEncrypt()
      encrypt2.setPublicKey(pubKeyServerPEM)
      const encrypted = encrypt2.encryptLong(publicKey)
      const encryptedBuf = Buffer.from(encrypted, 'base64')
      const res2 = await getPrivateKey(encryptedBuf)
      aesKey.value = encrypt.decrypt(Buffer.from(res2.data).toString('base64'))
    }

    function initDeviceInfo() {
      return new Promise<void>((resolve) => {
        getDeviceInfo(
          {
            info: [
              'deviceType',
              'OS',
              'OSVersion',
              'netWork',
              'language',
              'browserInfo',
              'userAgent',
              'date',
              'fingerprint',
              'UUID',
              'screenWidth',
              'screenHeight'
            ]
          },
          (deviceInfo: any) => {
            const { browser, os } = detectInfo()
            const deviceName = `${deviceInfo.OS}, ${deviceInfo.browserInfo.slice(0, deviceInfo.browserInfo.indexOf('（'))}, ${browser.version}`
            Object.assign(device, deviceInfo, {
              domain: window.location.origin,
              os,
              browser,
              deviceName,
              fingerprint: nanoid()
            })
            resolve()
          }
        )
      })
    }

    return { aesKey, device, initAesKey }
  },
  {
    // 配置持久化
    persist: {
      key: 'encrypt', // 在 localStorage 中保存的 key
      storage: localStorage, // 使用 localStorage 进行存储
      // pick: ['aesKey', 'fingerprint'],
      serializer: {
        // 自定义序列化
        serialize: (state: any) => {
          return Base64.encode(JSON.stringify(state))
        },
        // 自定义反序列化
        deserialize: (storedValue: any) => {
          return JSON.parse(Base64.decode(storedValue))
        }
      }
    }
  }
)
