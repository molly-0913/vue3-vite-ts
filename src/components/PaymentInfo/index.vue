<template>
  <div class="payment-info">
    <div class="welcome-logo logo-size"></div>
    <div class="user-info">
      {{
        userInfo.email
          ? maskEmail(userInfo.email)
          : maskPhone(userInfo?.countryCode || '', userInfo?.phoneNo || '')
      }}
    </div>
    <div class="bottom-show">
      <div>
        <div>{{ userInfo.amount }}{{ userInfo.billCurrency }}</div>
        <div>{{ $t('amount') }}</div>
      </div>
      <div>
        <SvgIcon name="enter" class="icon-color" />
      </div>
      <div>
        <div>{{ userInfo.productName }}</div>
        <div>{{ $t('to') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="PaymentInfo">
import { useCounterStore } from '@/stores/counter'
import { maskEmail, maskPhone } from '@/utils/parseTools'
const { userInfo } = storeToRefs(useCounterStore())
</script>

<style lang="scss" scoped>
.payment-info {
  width: 100%;
  background-color: var(--card-bg-color);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
  margin-bottom: 16px;
  .icon-color {
    color: var(--icon-color) !important;
    width: 40px !important;
    height: 40px !important;
  }
  .logo-size {
    background-size: auto 56px;
    height: 56px;
    background-position: center;
    // width: 84px;
  }
  .user-info {
    color: var(--text-info-color);
    font-size: 14px;
    margin: 16px 0 24px 0;
  }
  .bottom-show {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    & > div:nth-child(2) {
      width: 20%;
    }
    & > div {
      display: flex;
      width: 40%;
      flex-shrink: 0;
      flex-direction: column;
      align-items: center;
      & > div:nth-child(2) {
        font-size: 14px;
        color: var(--text-info-color);
      }
    }
  }
}

@media (max-width: 540px) {
  .payment-info {
    padding: 16px 0;
    .user-info {
      margin: 8px 0 16px 0;
    }
  }
}
</style>
