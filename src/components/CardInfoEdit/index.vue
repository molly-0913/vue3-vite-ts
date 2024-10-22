<script setup lang="ts" name="CardInfoEdit">
import { defaultCardInfoForm } from '@/defaultValue'
import { useCounterStore } from '@/stores/counter'
import { getCountryName } from '@/utils/countries'
import { formatCreditCardNumber } from '@/utils/luhn'
import {
  validateEmail,
  validateName,
  validateExpirationDate,
  validateSecurityCode,
  validateCreditCardNo,
  validateCreditCardNoChange,
  getPayTypeByCardNumber,
  validatePhoneNumber
} from '@/utils/rules'
import { useI18n } from 'vue-i18n'
import { getImageUrl } from '@/utils/common'
import { useCommonStore } from '@/stores/common'
import { orderCreate } from '@/api/cashier'
import beforeTo3ds from '@/hooks/beforeTo3ds'
import formInputHook from '@/hooks/formInput'

const { t } = useI18n()

const {
  securityCodeRef,
  securityCodeChange,
  expirationDateFormItemRef,
  expirationDateChange,
  phoneNumberChange,
  phoneNumberRef,
  emailAddressChange,
  emailAddressRef,
  creditCardNoRef,
  creditCardNoChange
} = formInputHook()

const { loading, beforeTo3dsInit, paymentNuveiOption, nuveiFormRef } = beforeTo3ds()

const validateForm = reactive(Object.assign({}, defaultCardInfoForm))

const { userInfo, billingAddrInfo } = storeToRefs(useCounterStore())
const { lang } = storeToRefs(useCommonStore())

const validateRules = {
  firstName: [{ validator: validateName, trigger: 'change' }],
  lastName: [{ validator: validateName, trigger: 'change' }],
  creditCardNo: [
    { validator: validateCreditCardNo, trigger: 'blur' },
    { validator: validateCreditCardNoChange, trigger: 'change' }
  ],
  expirationDate: [{ validator: validateExpirationDate, trigger: 'blur' }],
  securityCode: [{ validator: validateSecurityCode, trigger: 'blur' }],
  information: [{ required: true, message: '', trigger: 'blur' }],
  emailAddress: [{ validator: validateEmail, trigger: 'blur' }],
  phoneNumber: [{ validator: validatePhoneNumber, trigger: 'blur' }]
}

function setInformation(info: BillingAddress) {
  if (info.address) {
    validateForm.information = `${info.address} ${info.city} ${info.state} ${getCountryName(info.country)}`
    validateFormRef.value && validateFormRef.value?.validateField('information')
  }
}

onMounted(() => {
  nextTick(() => {
    setInformation(billingAddrInfo.value)
  })
})

watch(
  () => billingAddrInfo.value,
  (newValue) => {
    setInformation(newValue)
  },
  {
    deep: true
  }
)

const disabled = ref(true)

const validateFormRef = ref<HTMLFormElement>() // 绑定表单元素

async function submitForm() {
  validateFormRef.value &&
    validateFormRef.value.validate(async (valid: boolean) => {
      if (valid) {
        try {
          loading.value = true
          const orderStatus = await orderCreate({
            countryCode: userInfo.value.countryCode,
            phoneNo: userInfo.value.phoneNo,
            payType: getPayTypeByCardNumber(validateForm.creditCardNo.replace(/\s/g, '')).payType,
            saveCard: validateForm.saveCard,
            creditCard: {
              country: billingAddrInfo.value.country,
              state: billingAddrInfo.value.state,
              city: billingAddrInfo.value.city,
              firstName: validateForm.firstName,
              lastName: validateForm.lastName,
              zipCode: billingAddrInfo.value.zipCode,
              address: billingAddrInfo.value.address,
              phoneNumber: userInfo.value.phoneNo || validateForm.phoneNumber,
              creditCardNo: validateForm.creditCardNo.replace(/\s/g, ''),
              expirationDate: validateForm.expirationDate,
              expireMonth: validateForm.expirationDate.split('/')[0],
              expireYear: `20${validateForm.expirationDate.split('/')[1]}`,
              emailAddress:
                userInfo.value.email ||
                billingAddrInfo.value.emailAddress ||
                validateForm.emailAddress,
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

let infoFieldHasValid = false

function formValidateHandler() {
  const valid = validateFormRef.value?.fields.every((item: any) => {
    return item.validateState === 'success' || item.prop === 'information'
  })
  const infoField = validateFormRef.value?.fields.find((item: any) => {
    return item.prop === 'information'
  })
  if (valid && !infoFieldHasValid) {
    infoFieldHasValid = true
    validateFormRef.value?.validate()
  }
  disabled.value = !valid || infoField.validateState !== 'success'
}

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

const handleCreditCardNoChange = (value: string) => {
  validateForm.creditCardNo = formatCreditCardNumber(value.replace(/[^0-9]+/g, '')).slice(0, 24)
}

const cardType = computed(() => {
  return getPayTypeByCardNumber(validateForm.creditCardNo).icon
})

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
  <div class="card-info-edit">
    <el-form
      :model="validateForm"
      ref="validateFormRef"
      :rules="validateRules"
      @validate="formValidateHandler"
      class="normal-form"
      label-position="top"
      :hide-required-asterisk="true"
    >
      <el-form-item prop="creditCardNo" ref="creditCardNoRef" :label="$t('card_add_number')">
        <el-input
          v-model="validateForm.creditCardNo"
          :placeholder="$t('card_add_enter_number')"
          autocomplete="off"
          @input="
            (value: string) =>
              creditCardNoChange(value, (val: string) => (validateForm.creditCardNo = val))
          "
        >
          <template #append>
            <div class="hidden"></div>
            <img v-if="cardType" :src="getImageUrl(`icon${cardType}`)" alt="" class="card-img" />
          </template>
        </el-input>
      </el-form-item>
      <div class="inline-form">
        <el-form-item prop="firstName" :label="$t('card_add_first_name')">
          <el-input
            v-model="validateForm.firstName"
            :placeholder="$t('card_add_enter_first_name')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="lastName" :label="$t('card_add_last_name')">
          <el-input
            v-model="validateForm.lastName"
            :placeholder="$t('card_add_enter_last_name')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          ref="expirationDateFormItemRef"
          prop="expirationDate"
          :label="$t('card_add_expiration_date')"
        >
          <el-input
            v-model.trim="validateForm.expirationDate"
            placeholder="MM/YY"
            autocomplete="off"
            @input="
              (value: string) =>
                expirationDateChange(value, (val) => (validateForm.expirationDate = val))
            "
          ></el-input>
        </el-form-item>
        <el-form-item prop="securityCode" label="CVV/CVC" ref="securityCodeRef">
          <el-input
            v-model.trim="validateForm.securityCode"
            placeholder="XXX/XXXX"
            autocomplete="off"
            @input="
              (value: string) =>
                securityCodeChange(value, (val) => (validateForm.securityCode = val))
            "
          ></el-input>
        </el-form-item>
      </div>
      <el-form-item
        v-if="!userInfo.email && !billingAddrInfo.emailAddress"
        ref="emailAddressRef"
        prop="emailAddress"
        :label="$t('email_address')"
      >
        <el-input
          type="email"
          v-model.trim="validateForm.emailAddress"
          :placeholder="$t('please_enter_email')"
          autocomplete="off"
          @input="(value: string) => emailAddressChange(value)"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-if="!userInfo.phoneNo"
        ref="phoneNumberRef"
        prop="phoneNumber"
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
      <el-form-item prop="information" :label="$t('card_information_title')" :show-message="false">
        <el-input
          v-model="validateForm.information"
          :placeholder="$t('card_add_billing')"
          autocomplete="off"
          readonly
        >
          <template #append>
            <div class="hidden"></div>
            <BillingAddress />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item style="margin-bottom: 0">
        <el-checkbox
          v-model="validateForm.saveCard"
          class="form-checkbox"
          :label="$t('card_add_purchase')"
        ></el-checkbox>
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
  <el-button
    class="submit-button"
    @click="submitForm"
    style="width: 100%"
    :disabled="disabled"
    :loading="loading"
    v-waves
    >{{ $t('pay_now') }}</el-button
  >
</template>

<style lang="scss" scoped>
.card-info-edit {
  width: 100%;
  background-color: var(--card-bg-color);
  border-radius: 10px;
  overflow: hidden;
  padding: 24px 16px;
  margin-bottom: 40px;
}
.hidden {
  width: 2px;
  height: calc(100% - 2px);
  background-color: var(--normal-input-bg-color);
  position: absolute;
  left: -1px;
}
@media (max-width: 540px) {
  .card-info-edit {
    padding: 18px 14px;
  }
}
.card-img {
  width: 26px;
  height: 16px;
  box-shadow: 0 0 1.2px rgba(0, 0, 0, 0.4);
  border-radius: 1px;
}
</style>
