import { formatCreditCardNumber } from '@/utils/luhn'
import { getPayTypeByCardNumber } from '@/utils/rules'
import type { FormItemInstance } from 'element-plus'
import { ref } from 'vue'
import type { Ref } from 'vue'

// @ts-ignore
export default function formInputHook(): {
  expirationDateFormItemRef: Ref<FormItemInstance | null>
  securityCodeRef: Ref<FormItemInstance | null>
  emailAddressRef: Ref<FormItemInstance | null>
  phoneNumberRef: Ref<FormItemInstance | null>
  creditCardNoRef: Ref<FormItemInstance | null>
  expirationDateChange: (value: string, callBack: (val: string) => void) => void
  securityCodeChange: (value: string, callBack: (val: string) => void) => void
  emailAddressChange: (value: string, callBack?: (val: string) => void) => void
  phoneNumberChange: (value: string, callBack: (val: string) => void) => void
  creditCardNoChange: (value: string, callBack: (val: string) => void) => void
} {
  const expirationDateFormItemRef = ref<FormItemInstance | null>(null)

  const securityCodeRef = ref<FormItemInstance | null>(null)

  const emailAddressRef = ref<FormItemInstance | null>(null)

  const phoneNumberRef = ref<FormItemInstance | null>(null)

  const creditCardNoRef = ref<FormItemInstance | null>(null)

  function creditCardNoChange(value: string, callBack: (value: string) => void) {
    const processedValue = value.replace(/[^0-9]+/g, '')
    callBack(formatCreditCardNumber(processedValue).slice(0, 23))
    if (!getPayTypeByCardNumber(processedValue).hasLowLength) {
      setTimeout(() => creditCardNoRef.value && creditCardNoRef.value.clearValidate())
    } else {
      expirationDateFormItemRef.value?.validate('blur')
    }
  }

  let lastLength = 0

  function expirationDateChange(value: string, callBack: (value: string) => void) {
    if (value[0] && +value[0] > 1) {
      callBack('')
      lastLength = 0
    }
    if (value[1] && +value.slice(0, 2) > 12) {
      callBack(value[0])
      lastLength = 1
      return
    }
    let processedValue = value.replace(/[^0-9]+/g, '').split('')
    if (processedValue.length === 2 && lastLength > 2) {
      processedValue = [processedValue[0]]
    }
    if (processedValue.length >= 2) {
      processedValue.splice(2, 0, '/')
    }
    const temp = processedValue.join('')
    if (/^[0-9/]*$/.test(temp)) {
      callBack(temp.slice(0, 5))
      lastLength = temp.slice(0, 5).length
    }
    if (temp.length < 5) {
      setTimeout(
        () => expirationDateFormItemRef.value && expirationDateFormItemRef.value.clearValidate()
      )
    } else {
      expirationDateFormItemRef.value?.validate('blur')
    }
  }

  function securityCodeChange(value: string, callBack: (value: string) => void) {
    const temp = value.replace(/[^0-9]+/g, '').slice(0, 4)
    callBack(temp)
    if (temp.length < 3) {
      setTimeout(() => securityCodeRef.value && securityCodeRef.value.clearValidate())
    } else {
      securityCodeRef.value?.validate('blur')
    }
  }

  function emailAddressChange(value: string, callBack?: (value: string) => void) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (!value || !emailRegex.test(value)) {
      setTimeout(() => emailAddressRef.value && emailAddressRef.value.clearValidate())
    } else {
      emailAddressRef.value?.validate('blur')
    }
  }

  function phoneNumberChange(value: string, callBack: (value: string) => void) {
    const processedValue = value.replace(/[^0-9]+/g, '').slice(0, 11)
    callBack(processedValue)
    console.log('processedValue=>', processedValue, processedValue.length)
    if (processedValue.length < 6 || processedValue.length > 11) {
      setTimeout(() => phoneNumberRef.value && phoneNumberRef.value.clearValidate())
    } else {
      phoneNumberRef.value?.validate('blur')
    }
  }

  return {
    expirationDateFormItemRef,
    securityCodeRef,
    emailAddressRef,
    phoneNumberRef,
    expirationDateChange,
    securityCodeChange,
    emailAddressChange,
    phoneNumberChange,
    creditCardNoRef,
    creditCardNoChange
  }
}
