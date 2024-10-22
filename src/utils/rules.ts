import { i18n } from '@/locale'
import { luhnCheck } from './luhn'

export const validateName = (rule: any, value: string, callback: Function) => {
  const nameRegex = /^[a-zA-Z\s]*$/
  if (!value || !nameRegex.test(value)) {
    return callback(new Error(i18n.global.t('card_add_valid_name')))
  } else {
    callback()
  }
}

export const validateEmail = (rule: any, value: string, callback: Function) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  if (!value || !emailRegex.test(value)) {
    return callback(new Error(i18n.global.t('email_wrong')))
  } else {
    callback()
  }
}

export const validateExpirationDate = (rule: any, value: string, callback: Function) => {
  const expirationDate = /^[0-9/]*$/
  const checkDate = /^(0[1-9]|1[0-2])\/\d{2}$/
  if (!value || !expirationDate.test(value)) {
    return callback(new Error(i18n.global.t('card_add_invalid_date')))
  } else if (value.length < 5 || !checkDate.test(value)) {
    return callback(new Error(i18n.global.t('card_add_invalid_date')))
  } else {
    callback()
  }
}

export const validateSecurityCode = (rule: any, value: string, callback: Function) => {
  if (!value || value.toString().length < 3) {
    return callback(new Error(i18n.global.t('card_add_valid_number')))
  } else {
    callback()
  }
}

export const validateCreditCardNo = (rule: any, value: string, callback: Function) => {
  const typeRegex = /^[0-9\s]*$/
  const { hasErr, hasLowLength } = getPayTypeByCardNumber(value)
  if (!value || !typeRegex.test(value) || !hasLowLength || hasErr) {
    return callback(new Error(i18n.global.t('card_add_invalid')))
  } else {
    callback()
  }
}

export const validatePhoneNumber = (rule: any, value: string, callback: Function) => {
  const typeRegex = /^[0-9\s]*$/
  if (!value || !typeRegex.test(value) || value.length < 6 || value.length > 11) {
    return callback(new Error(i18n.global.t('mobile_wrong')))
  } else {
    callback()
  }
}

export const validateCreditCardNoChange = (rule: any, value: string, callback: Function) => {
  if (value) {
    const { hasErr } = getPayTypeByCardNumber(value)
    if (hasErr) {
      return callback(new Error(i18n.global.t('card_add_invalid')))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

export const validateState = (rule: any, value: string, callback: Function) => {
  const stateRegex = /^[a-zA-Z\s]*$/
  if (!value || !stateRegex.test(value)) {
    return callback(new Error(i18n.global.t('')))
  } else {
    callback()
  }
}

export const validateCity = (rule: any, value: string, callback: Function) => {
  const cityRegex = /^[a-zA-Z\s]*$/
  if (!value || !cityRegex.test(value)) {
    return callback(new Error(i18n.global.t('')))
  } else {
    callback()
  }
}

export const validateZipCode = (rule: any, value: string, callback: Function) => {
  const zipCodeRegex = /^[0-9a-zA-Z\-]*$/
  if (!value || !zipCodeRegex.test(value)) {
    return callback(new Error(i18n.global.t('')))
  } else {
    callback()
  }
}

export function getPayTypeByCardNumber(value: string) {
  let payType = ''
  let icon = null
  let hasErr = true
  let hasLowLength = false
  if (value) {
    value = value.replace(/\s/g, '')
    const [firstChar, secondChar] = [value[0], value[1]]
    if (firstChar === '4') {
      icon = '134'
      if (value.length >= 13 && value.length <= 19) {
        payType = '134'
        hasErr = !luhnCheck(value)
      }
      if (value.length >= 13) {
        hasLowLength = true
      }
    }
    if (
      firstChar === '5' &&
      (secondChar === '0' ||
        secondChar === '1' ||
        secondChar === '2' ||
        secondChar === '3' ||
        secondChar === '4' ||
        secondChar === '5' ||
        secondChar === '9')
    ) {
      // Master 第一种情况
      icon = '135'
      if (secondChar === '0') {
        if (value.length >= 12 && value.length <= 19) {
          // 50 开头的信用卡长度 12-19
          payType = '135'
          hasErr = !luhnCheck(value)
        }
        if (value.length >= 12) {
          hasLowLength = true
        }
      }
      if (value.length >= 16) {
        hasLowLength = true
      }
      if (value.length === 16) {
        payType = '135'
        hasErr = !luhnCheck(value)
      }
    }

    if (firstChar === '2' && value.length >= 6) {
      const firstSixDigits = value.substring(0, 6) // 前六位
      if (parseInt(firstSixDigits) >= 222100 && parseInt(firstSixDigits) <= 272099) {
        //  以2开头 并且输入前六位的值在222100 - 272099 之间
        icon = '135'
        if (value.length === 16) {
          payType = '135'
          hasErr = !luhnCheck(value)
        }
        if (value.length >= 16) {
          hasLowLength = true
        }
      }
    }

    if (firstChar === '3' && (secondChar === '4' || secondChar === '7')) {
      //Amex
      icon = '137'
      if (value.length === 15) {
        payType = '137'
        hasErr = !luhnCheck(value)
      }
      if (value.length >= 15) {
        hasLowLength = true
      }
    }

    if (value.length >= 4) {
      const firstJcbDigits = value.substring(0, 4) // 前四位
      if (firstJcbDigits === '1800' || firstJcbDigits === '2131') {
        // JCB  以1800  2131开头  长度15位
        icon = '136'
        if (value.length === 15) {
          payType = '136'
          hasErr = !luhnCheck(value)
        }
        if (value.length >= 15) {
          hasLowLength = true
        }
      }
      if (
        firstChar === '3' &&
        parseInt(firstJcbDigits) >= 3528 &&
        parseInt(firstJcbDigits) <= 3589
      ) {
        icon = '136'
        if (value.length >= 16 && value.length <= 19) {
          payType = '136'
          hasErr = !luhnCheck(value)
        }
        if (value.length >= 16) {
          hasLowLength = true
        }
      }
    }
    const firstDiscoverTwoDigits = value.substring(0, 2) //Discover  前两位

    if (firstDiscoverTwoDigits === '64' || firstDiscoverTwoDigits === '65') {
      //Discover 以64 65 开头 16-19位
      icon = '138'
      if (value.length >= 16 && value.length <= 19) {
        payType = '138'
        hasErr = !luhnCheck(value)
      }
      if (value.length >= 16) {
        hasLowLength = true
      }
    }

    if (value.length >= 4 && value.substring(0, 4) === '6011') {
      icon = '138'
      if (value.length >= 16 && value.length <= 19) {
        payType = '138'
        hasErr = !luhnCheck(value)
      }
      if (value.length >= 16) {
        hasLowLength = true
      }
    }

    if (firstChar === '6' && value.length >= 6) {
      const firstDiscoverSixDigits = value.substring(0, 6) // 前六位
      // 以6开头
      if (
        parseInt(firstDiscoverSixDigits) >= 622126 &&
        parseInt(firstDiscoverSixDigits) <= 622925
      ) {
        //前六位区间在622126-622925 长度 16-19
        icon = '138'
      }
      if (
        parseInt(firstDiscoverSixDigits) >= 624000 &&
        parseInt(firstDiscoverSixDigits) <= 626999
      ) {
        //前六位区间在624000-626999 长度 16-19
        icon = '138'
      }
      if (
        parseInt(firstDiscoverSixDigits) >= 628200 &&
        parseInt(firstDiscoverSixDigits) <= 628899
      ) {
        //前六位区间在628200-628899 长度 16-19
        icon = '138'
      }

      if (value.length >= 16 && value.length <= 19) {
        payType = '138'
        hasErr = !luhnCheck(value)
      }
      if (value.length >= 16) {
        hasLowLength = true
      }
    }
  }
  return { payType, icon, hasErr, hasLowLength }
}
