import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import dayjs from 'dayjs'
import { Base64 } from 'js-base64'
import { getQueryString } from '@/utils/parseTools'
import { defaultBillingAddressForm, defaultOrderDetail, defaultUserInfo } from '@/defaultValue'
import { getOrderDetailApi, getOrderInfo } from '@/api/cashier'
import { getUserCardList, getCardBillInfo } from '@/api/naticPay'
import { getPayTypeByCardNumber } from '@/utils/rules'
import { ElMessage } from 'element-plus'
import messageMixin from '@/utils/messageConfig'
import { useI18n } from 'vue-i18n'

export const useCounterStore = defineStore(
  'counter',
  () => {
    const { t } = useI18n()
    const token = ref('')

    const tokenUsed = ref(false)

    const billNo = ref('')

    const tokenExpiredDate = ref<string>('')

    const bankList = ref<BankItem[]>([])

    const userInfo = reactive<UserInfo>(Object.assign({}, defaultUserInfo))

    const orderDetail = reactive<OrderDetail>(Object.assign({}, defaultOrderDetail))

    const billingAddrInfo = reactive<BillingAddress>(Object.assign({}, defaultBillingAddressForm))

    // function setTokenExpiredDate() {
    //   tokenExpiredDate.value = dayjs().add(30, 'minute').format()
    // }

    function getBankList() {
      return new Promise<boolean>((resolve) => {
        getUserCardList({ loginName: userInfo.loginName, appId: 'P93' })
          .then((res) => {
            if (res.data.head?.code === '0000') {
              bankList.value = res.data.body
                .filter((item: BankItem) => item.firstName && item.lastName)
                .map((item: BankItem) => {
                  return Object.assign(item, {
                    payType: getPayTypeByCardNumber(item.creditCardNo).payType,
                    isDefault: item.creditCardNo === userInfo.creditCardNo
                  })
                })
              resolve(true)
            } else {
              bankList.value = []
              resolve(false)
            }
          })
          .catch((e) => {
            resolve(false)
          })
      })
    }

    function getUserInfo() {
      return new Promise<boolean>((resolve) => {
        getOrderInfo()
          .then((res) => {
            if (res.data.head?.code === '0000') {
              Object.assign(userInfo, res.data.body)
              resolve(true)
            } else {
              Object.assign(userInfo, defaultUserInfo)
              resolve(false)
            }
          })
          .catch((e) => {
            resolve(false)
          })
      })
    }

    function getOrderDetail() {
      return new Promise<boolean>((resolve) => {
        getOrderDetailApi()
          .then((res) => {
            if (res.data.head?.code === '0000') {
              Object.assign(orderDetail, res.data.body)
              resolve(true)
            } else {
              Object.assign(orderDetail, defaultOrderDetail)
              resolve(false)
            }
          })
          .catch((e) => {
            resolve(false)
          })
      })
    }

    function getBillingAddrInfo() {
      return new Promise<boolean>((resolve) => {
        getCardBillInfo({ loginName: userInfo.loginName, appId: 'P93' })
          .then((res) => {
            if (res.data.head?.code === '0000') {
              if (res.data.body) {
                Object.assign(billingAddrInfo, res.data.body)
              } else {
                Object.assign(billingAddrInfo, defaultBillingAddressForm)
              }
              resolve(true)
            } else {
              Object.assign(billingAddrInfo, defaultBillingAddressForm)
              resolve(false)
            }
          })
          .catch((e) => {
            resolve(false)
          })
      })
    }

    function isExpired() {
      return dayjs(tokenExpiredDate.value).isBefore(dayjs())
    }

    async function initCounter() {
      if (!token.value) {
        ElMessage(messageMixin({ message: t('login_page_err'), type: 'error' }))
        return
      }
      if (isExpired()) {
        ElMessage(messageMixin({ message: t('login_page_err'), type: 'error' }))
        return
      }
      const result = await getUserInfo()
      if (!result) {
        return
      }
      const [result1, result2] = await Promise.all([getBankList(), getBillingAddrInfo()])
      if (!result1 || !result2) {
        return
      }
      if (tokenUsed.value) {
        if (billNo.value) {
          await getOrderDetail()
          router.push('/order/detail')
          router.removeRoute('CounterIndex')
        } else {
          ElMessage(messageMixin({ message: t('login_page_err'), type: 'warning' }))
        }
        return
      }

      setTimeout(() => {
        if (['OrderDetail', 'KycSumsub'].includes((router.currentRoute.value.name as any) || '')) {
          return
        }
        if (bankList.value.length > 0 && billingAddrInfo.address) {
          router.push('/counter/payment')
        } else {
          router.push('/counter/add-card')
        }
      }, 100)
    }

    return {
      token,
      tokenExpiredDate,
      initCounter,
      isExpired,
      bankList,
      userInfo,
      tokenUsed,
      billNo,
      getOrderDetail,
      orderDetail,
      billingAddrInfo,
      getBankList
    }
  },
  {
    // 配置持久化
    persist: {
      key: 'counter', // 在 localStorage 中保存的 key
      storage: localStorage, // 使用 localStorage 进行存储
      pick: ['token', 'tokenExpiredDate', 'tokenUsed', 'billNo', 'orderDetail', 'billingAddrInfo'],
      serializer: {
        // 自定义序列化
        serialize: (state: any) => {
          return Base64.encode(JSON.stringify(state))
        },
        // 自定义反序列化
        deserialize: (storedValue: any) => {
          return JSON.parse(Base64.decode(storedValue))
        }
      },
      afterHydrate: (ctx) => {
        const token = getQueryString('token')
        if (token && ctx.store.$state.token !== token) {
          ctx.store.$state.token = token
          ctx.store.$state.tokenExpiredDate = dayjs().add(30, 'minute').format()
          ctx.store.$state.tokenUsed = false
          ctx.store.$state.billNo = ''
          ctx.store.$state.orderDetail = Object.assign(
            ctx.store.$state.orderDetail,
            defaultUserInfo
          )
          ctx.store.$state.billingAddrInfo = Object.assign(
            ctx.store.$state.billingAddrInfo,
            defaultBillingAddressForm
          )
        }
      },
      debug: true
    }
  }
)
