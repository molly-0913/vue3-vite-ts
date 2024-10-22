<script setup lang="ts" name="CurrentCard">
import { useCounterStore } from '@/stores/counter'
import { validateSecurityCode, validatePhoneNumber } from '@/utils/rules'
import { maskCreditCard } from '@/utils/parseTools'
import { getImageUrl } from '@/utils/common'
import { useCommonStore } from '@/stores/common'
import { orderCreate } from '@/api/cashier'
import beforeTo3ds from '@/hooks/beforeTo3ds'
import formInputHook from '@/hooks/formInput'
const validateForm = reactive({ securityCode: '', phoneNumber: '' })

const { securityCodeRef, securityCodeChange, phoneNumberChange, phoneNumberRef } = formInputHook()

const { loading, beforeTo3dsInit, paymentNuveiOption, nuveiFormRef } = beforeTo3ds()

const { bankList, userInfo, billingAddrInfo } = storeToRefs(useCounterStore())
const { lang } = storeToRefs(useCommonStore())

function getDefaultBankId() {
  const defaultBank = bankList.value.find((item) => item.isDefault)
  return defaultBank ? defaultBank.id : bankList.value[0].id
}

const disabled = ref(true)

const useBankId = ref<number>(getDefaultBankId())

const validateFormRef = ref<HTMLFormElement>() // 绑定表单元素
async function submitForm() {
  validateFormRef.value &&
    validateFormRef.value.validate(async (valid: boolean) => {
      if (valid) {
        loading.value = true
        try {
          const orderStatus = await orderCreate({
            countryCode: userInfo.value.countryCode,
            phoneNo: userInfo.value.phoneNo,
            payType: usedBankInfo.value!.payType,
            saveCard: true,
            creditCard: {
              country: billingAddrInfo.value.country,
              state: billingAddrInfo.value.state,
              city: billingAddrInfo.value.city,
              firstName: usedBankInfo.value!.firstName,
              lastName: usedBankInfo.value!.lastName,
              zipCode: billingAddrInfo.value.zipCode,
              address: billingAddrInfo.value.address,
              phoneNumber: userInfo.value.phoneNo || validateForm.phoneNumber,
              creditCardNo: usedBankInfo.value!.creditCardNo,
              expirationDate: `${usedBankInfo.value!.expireMonth}/${usedBankInfo.value!.expireYear.slice(2, 4)}`,
              expireMonth: usedBankInfo.value!.expireMonth,
              expireYear: usedBankInfo.value!.expireYear,
              emailAddress: userInfo.value.email || billingAddrInfo.value.emailAddress,
              securityCode: validateForm.securityCode
            }
          })
          if (orderStatus.data.head?.code === '0000') {
            beforeTo3dsInit(orderStatus.data.body)
          }
        } catch (e) {
          throw new Error('error')
        } finally {
          loading.value = false
        }
      } else {
        console.log('error submit!!')
        return false
      }
    })
}

function formValidateHandler() {
  const valid = validateFormRef.value?.fields.every((item: any) => {
    return item.validateState === 'success'
  })
  disabled.value = !valid
}

const usedBankInfo = computed(() => {
  return bankList.value.find((item) => +item.id === +useBankId.value)
})

watch(
  () => validateForm,
  () => {
    setTimeout(() => {
      const valid = validateFormRef.value?.fields.every((item: any) => {
        return item.validateState === 'success'
      })
      disabled.value = !valid
    })
  },
  { deep: true }
)

watch(
  () => lang.value,
  () => {
    const hasValid = validateFormRef.value?.fields
      .filter((item: any) => {
        return item.validateState
      })
      .map((v: any) => v.prop)
    if (hasValid && hasValid.length > 0) {
      validateFormRef.value && validateFormRef.value.validateField(hasValid)
    }
  }
)
</script>

<template>
  <div class="current-card">
    <div class="current-card-title">
      <div>{{ $t('payment_card') }}</div>
      <ChangePayType
        @change="
          (id: number) => {
            useBankId = id
            validateForm.securityCode = ''
          }
        "
        :useBankId="useBankId"
      />
    </div>
    <el-form
      :model="validateForm"
      ref="validateFormRef"
      @validate="formValidateHandler"
      class="normal-form"
      :hide-required-asterisk="true"
      style="width: 100%"
      label-position="top"
    >
      <div class="current-card-title current-card-info">
        <div class="info-box">
          <img :src="getImageUrl(`icon${usedBankInfo?.payType}`)" alt="" class="card-img" />
          <div class="card-number">{{ maskCreditCard(usedBankInfo?.creditCardNo || '') }}</div>
          <div class="used-color">{{ $t('recently_used') }}</div>
        </div>
        <div class="info-input">
          <el-form-item
            ref="securityCodeRef"
            prop="securityCode"
            class="current-form"
            :show-message="false"
            :rules="[{ validator: validateSecurityCode, trigger: 'blur' }]"
          >
            <el-input
              v-model="validateForm.securityCode"
              placeholder="CVV/CVC"
              autocomplete="off"
              @input="
                (value: string) =>
                  securityCodeChange(value, (val) => (validateForm.securityCode = val))
              "
            ></el-input>
          </el-form-item>
        </div>
      </div>
      <el-form-item
        v-if="!userInfo.phoneNo"
        ref="phoneNumberRef"
        prop="phoneNumber"
        :rules="[{ validator: validatePhoneNumber, trigger: 'blur' }]"
        :label="$t('phone_number')"
      >
        <el-input
          type="tel"
          v-model.trim="validateForm.phoneNumber"
          :placeholder="$t('please_enter_phone_number')"
          autocomplete="off"
          @input="
            (value: string) => phoneNumberChange(value, (val) => (validateForm.phoneNumber = val))
          "
        ></el-input>
      </el-form-item>
    </el-form>
    <iframe
      name="paymentIframe"
      v-if="paymentNuveiOption.methodUrl && paymentNuveiOption.methodPayload"
      style="width: 100%; height: 500px; display: none"
    ></iframe>
    <form
      ref="nuveiFormRef"
      v-if="paymentNuveiOption.methodUrl && paymentNuveiOption.methodPayload"
      name="frm"
      method="POST"
      target="paymentIframe"
      :action="paymentNuveiOption.methodUrl"
    >
      <input type="hidden" name="threeDSMethodData" :value="paymentNuveiOption.methodPayload" />
    </form>
  </div>
  <div class="button-fix">
    <!-- :disabled="disabled" -->
    <el-button
      class="submit-button"
      @click="submitForm"
      style="width: 100%"
      v-waves
      :loading="loading"
      :disabled="disabled"
      >{{ $t('pay_now') }}</el-button
    >
  </div>
</template>

<style lang="scss" scoped>
.current-card {
  width: 100%;
  background-color: var(--card-bg-color);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px 8px;
  margin-bottom: 24px;
  .icon-color {
    color: var(--other-icon-color) !important;
    margin-left: 4px;
    font-size: 12px;
  }
  .current-card-info {
    align-items: start !important;
    margin-bottom: 6px !important;
    .info-box {
      flex-grow: 1;
      height: 44px;
      border-radius: 5px;
      border: 1px solid var(--info-box-border-color);
      background-color: var(--info-box-bg-color);
      padding: 0 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .card-img {
        width: 26px;
        height: 16px;
      }
      .card-number {
        flex-grow: 1;
        padding: 0 8px;
        size: 12px;
      }
    }
    .info-input {
      width: 112px;
      // height: 44px;
      flex-shrink: 0;
      margin-left: 16px;
    }
  }
  .current-card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 14px;
    margin-bottom: 15px;
  }
}

.payment-btn {
  margin-top: 200px;
}

.button-fix {
  position: absolute;
  width: calc(100% - 80px);
  bottom: 60px;
}
.used-color {
  color: var(--copy-bg-color);
  size: 10px;
}

@media (max-width: 540px) {
  .current-card {
    padding: 16px 13px 0;
    .current-card-info {
      margin-bottom: 0 !important;
    }
  }
  .button-fix {
    width: calc(100% - 32px);
  }
}
</style>
