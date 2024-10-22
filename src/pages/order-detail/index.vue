<template>
  <div class="order-detail">
    <div class="info-module">
      <div class="order-status" :class="statusIcon.class">
        <SvgIcon
          v-if="statusIcon.isSvg"
          class="icon-svg"
          :name="statusIcon.icon"
          height="60px"
          width="60px"
        />
        <img width="60px" v-if="!statusIcon.isSvg" :src="statusIcon.icon" alt="" />
        <span>{{ statusIcon.status }}</span>
        <span>{{ statusIcon.text }}</span>
      </div>
      <div class="order-content">
        <div>
          <span>{{ $t('pay_to') }}</span>
          <span>{{ orderDetail.productName }}</span>
        </div>
        <div>
          <span>{{ $t('pay_amount') }}</span>
          <span>{{ userInfo.amount }} {{ userInfo.billCurrency }}</span>
        </div>
        <div>
          <span>{{ $t('pay_from') }}</span>
          <span>{{ maskEmail(orderDetail.email) }}</span>
        </div>
        <div class="order-id">
          <span>{{ $t('order_id') }}</span>
          <div>
            <span>{{ orderDetail.billNo }}</span>
            <SvgIcon
              @click="copyText(orderDetail.billNo)"
              name="copy"
              :style="{ color: 'var(--copy-bg-color)' }"
              height="16px"
              width="16px"
            />
          </div>
        </div>
        <div>
          <span>{{ $t('payment_method') }}</span>
          <div class="card-info">
            <div>{{ maskCreditCard(orderDetail.creditCardNo) }}</div>
            <img
              :src="getImageUrl(`icon${getPayTypeByCardNumber(orderDetail.creditCardNo).payType}`)"
              alt=""
              srcset=""
            />
          </div>
        </div>
      </div>
    </div>
    <el-button class="submit-button" v-waves @click="returnWeb">{{
      $t('return_to_Home')
    }}</el-button>
    <Certificate />
  </div>
</template>

<script setup lang="ts" name="OrderDetail">
import useClipboard from 'vue-clipboard3'
import { useCounterStore } from '@/stores/counter'
import { maskCreditCard, maskEmail } from '@/utils/parseTools'
import orderDetailHook from './orderStatusHook'
import { getImageUrl } from '@/utils/common'
import { useI18n } from 'vue-i18n'
import { getPayTypeByCardNumber } from '@/utils/rules'
import { ElMessage } from 'element-plus'
import messageMixin from '@/utils/messageConfig'
const { statusIcon } = orderDetailHook()

const { t } = useI18n()

const { userInfo, orderDetail } = storeToRefs(useCounterStore())

const { getOrderDetail } = useCounterStore()

const { toClipboard } = useClipboard()

const copyText = async (text: string) => {
  try {
    await toClipboard(text)
    ElMessage(messageMixin({ message: t('common_copy_success'), type: 'success' }))
  } catch (error) {
    ElMessage(messageMixin({ message: t('failed'), type: 'error' }))
  }
}

function returnWeb() {
  userInfo.value.returnUrl && window.open(userInfo.value.returnUrl, '_self')
}

const timer = ref<null | NodeJS.Timeout>()

async function callFunction() {
  await getOrderDetail()
  timer.value && clearTimeout(timer.value)
  timer.value = null
  timer.value = setTimeout(callFunction, 30000)
}

onMounted(() => {
  timer.value = setTimeout(callFunction, 30000)
})

onUnmounted(() => {
  timer.value && clearTimeout(timer.value)
  timer.value = null
})
</script>

<style lang="scss" scoped>
.processing {
  span:first-of-type {
    color: var(--brand-color) !important;
  }
  .icon-svg {
    color: var(--brand-color) !important;
    animation: run 2s ease-in-out infinite;
  }
}
.successful {
  span:first-of-type {
    color: rgba(125, 255, 193, 1) !important;
  }
}
.failed {
  span:first-of-type {
    color: rgba(253, 97, 97, 1) !important;
  }
}
.card-info {
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
  }
  img {
    height: 16px;
    width: 26px;
    margin-left: 8px;
    box-shadow: 0 0 1.2px rgba(0, 0, 0, 0.4);
    border-radius: 1px;
  }
}
.order-detail {
  width: 100%;
  padding: 0 40px;
  margin-top: 24px;
  .info-module {
    height: auto;
    background: var(--card-bg-color);
    border-radius: 10px;
    padding: 50px 16px 40px 16px;
    box-sizing: border-box;
    margin-bottom: 129px;
    .order-status {
      width: 100%;
      text-align: center;
      span {
        display: block;
        color: var(--text-info-color);
      }
      span:first-of-type {
        font-size: 18px;
        margin-top: 24px;
      }
    }
    .order-content {
      margin-top: 20px;
      > div {
        margin-top: 14px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        span:first-of-type {
          color: var(--text-info-color);
        }
      }
      @media (max-width: 540px) {
        div {
          display: inherit;
        }
        .card-info {
          display: flex;
          div {
            display: flex;
            align-items: center;
          }
        }
        span {
          display: block;
        }
        span:first-of-type {
          margin-bottom: 8px;
        }
      }
      .order-id {
        margin-top: 24px;
        padding-top: 24px;
        border-top: 1px solid var(--border-bg-color);
        display: flex;
        align-items: center;
        div {
          display: flex;
          align-items: center;
          margin-top: 0;
          span {
            color: var(--text-main-color);
            display: inline-block;
            max-width: 190px;
            padding-right: 10px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          @media (max-width: 540px) {
            span {
              width: auto;
              overflow: inherit;
            }
          }
        }
      }
      @media (max-width: 540px) {
        .order-id {
          display: inherit;
          span {
            margin-bottom: 8px;
          }
          > div {
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
}
@media (max-width: 540px) {
  .order-detail {
    padding: 0 16px;
    margin-top: 16px;
    .info-module {
      margin-bottom: 68px;
    }
  }
}
@keyframes run {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
