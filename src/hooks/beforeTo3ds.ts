import { useCounterStore } from '@/stores/counter'
import type { ComponentInternalInstance, FormHTMLAttributes } from 'vue'
import { storeToRefs } from 'pinia'
import { getCurrentInstance, reactive, ref, watch, onUnmounted } from 'vue'
import { getNuveiMethodUrl } from '@/api/naticPay'
import { useRouter } from 'vue-router'

export default function beforeTo3ds() {
  const nuveiFormRef = ref<HTMLFormElement>()
  const loading = ref(false)
  const router = useRouter()
  const { billNo, tokenUsed } = storeToRefs(useCounterStore())
  const { getOrderDetail } = useCounterStore()
  const { proxy } = getCurrentInstance() as ComponentInternalInstance
  const paymentNuveiOption = reactive<PaymentOptionType>({
    methodUrl: '',
    methodPayload: '',
    isNuvei: 0
  })
  async function beforeTo3dsInit(orderStatus: OrderStatus) {
    if (!orderStatus.success) {
      router.push('/order/detail')
      return
    }
    tokenUsed.value = true
    billNo.value = orderStatus.billNo
    await getOrderDetail()
    if (+orderStatus.isNuvei === 1) {
      Object.assign(paymentNuveiOption, {
        methodUrl: orderStatus.methodUrl,
        methodPayload: orderStatus.methodPayload,
        isNuvei: orderStatus.isNuvei
      })
      getNuveiMethodUrlFun()
    } else {
      orderStatus.url && proxy?.mittBus.emit('to3DsBus', { url: orderStatus.url, isNuvei: false })
    }
  }

  function getNuveiMethodUrlFun() {
    timer.value && clearTimeout(timer.value)
    timer.value = null
    // Nuvei渠道获取3d认证url
    getNuveiMethodUrl({ billNo: billNo.value }).then((res) => {
      if (res.data?.body) {
        if (+res.data?.body?.status === 1) {
          if (res.data?.body?.url) {
            // 需要3d认证
            proxy?.mittBus.emit('to3DsBus', {
              url: res.data?.body?.url,
              isNuvei: true,
              nuveiCreq: res.data?.body?.creq
            })
          } else {
            router.push('/order/detail')
          }
        } else {
          !timer.value &&
            (timer.value = setTimeout(() => {
              getNuveiMethodUrlFun()
            }, 2000))
        }
      }
    })
  }

  const timer = ref<NodeJS.Timeout | null>(null)

  watch(
    () => nuveiFormRef.value,
    (formRef) => {
      if (formRef) {
        formRef.submit()
      }
    }
  )

  onUnmounted(() => {
    timer.value && clearTimeout(timer.value)
    timer.value = null
  })

  return { beforeTo3dsInit, loading, paymentNuveiOption, nuveiFormRef }
}
