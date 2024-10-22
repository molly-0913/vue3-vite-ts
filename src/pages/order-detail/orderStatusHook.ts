import { useCounterStore } from '@/stores/counter'
import OrderSuccessIcon from '@/assets/images/order_success.png'
import OrderFailIcon from '@/assets/images/order_fail.png'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { formatDetailDate } from '@/utils/common'

export default function orderDetailHook() {
  const { bankList, orderDetail } = storeToRefs(useCounterStore())
  const { t } = useI18n()

  const statusIcon = computed(() => {
    switch (orderDetail.value.recordStatus) {
      case 0:
        return {
          icon: 'processing',
          isSvg: true,
          text: t('please_wait'),
          status: t('processing'),
          class: 'processing'
        }
      case 1:
        return {
          icon: OrderSuccessIcon,
          isSvg: false,
          text: formatDetailDate(),
          status: t('successful'),
          class: 'successful'
        }
      case -1:
        return {
          icon: OrderFailIcon,
          isSvg: false,
          text: formatDetailDate(),
          status: t('failed'),
          class: 'failed'
        }
      default:
        return {
          icon: 'processing',
          isSvg: true,
          text: t('please_wait'),
          status: t('processing'),
          class: 'processing'
        }
    }
  })

  //   function getCardIcon

  return { statusIcon }
}
