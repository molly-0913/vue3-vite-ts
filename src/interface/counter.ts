interface BankItem {
  payType: string
  creditCardNo: string
  expirationDate: string
  expireMonth: string
  expireYear: string
  // securityCode: string,
  id: number
  cardGroup: string
  isDefault?: boolean
  firstName: string
  lastName: string
}

interface UserInfo {
  amount: number
  billNo?: string
  billCurrency: string
  needKyc: boolean
  productId: string
  productLoginName: string
  returnUrl: string
  creditCurrency: string
  countryCode: string
  phoneNo: string
  email: string
  productName: string
  calledRisk: boolean
  loginName: string
  creditCardNo?: string
  starLevel?: number
  trustLevel?: number
}

interface BillingAddress {
  country: string
  state: string
  city: string
  zipCode: string
  address: string
  emailAddress: string
}

interface OrderDetail {
  billNo: string
  countryCode: string
  creditCardNo: string
  email: string
  phoneNo: string
  productId: string
  productLoginName: string
  productName: string
  recordStatus: 0 | 1 | -1
  payType: number
}

interface OrderCreateData {
  countryCode: string
  phoneNo: string
  payType: string
  saveCard: boolean
  creditCard: {
    country: string
    state: string
    city: string
    zipCode: string
    address: string
    phoneNumber: string
    firstName: string
    lastName: string
    creditCardNo: string
    expirationDate: string
    expireMonth: string
    expireYear: string
    emailAddress: string
    securityCode: string
  }
}

interface OrderStatus {
  authUrl: string
  billNo: string
  channelCode: string
  isNuvei: number
  methodPayload: string
  methodUrl: string
  url: string
  success: boolean
}

interface PaymentOptionType {
  methodUrl: string
  methodPayload: string
  isNuvei: number // 1-- Nuvei 0-- 非Nuvei
}
