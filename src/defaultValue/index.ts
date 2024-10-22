export const defaultBillingAddressForm: BillingAddress = {
  country: '',
  state: '',
  city: '',
  zipCode: '',
  address: '',
  emailAddress: ''
}

export const defaultCardInfoForm = {
  firstName: '',
  lastName: '',
  creditCardNo: '',
  expirationDate: '',
  securityCode: '',
  information: '',
  emailAddress: '',
  phoneNumber: '',
  saveCard: true,
  phone: ''
}

export const defaultUserInfo: UserInfo = {
  amount: 0,
  billCurrency: 'JPY',
  needKyc: false,
  productId: 'A22',
  productLoginName: '',
  returnUrl: '',
  creditCurrency: '',
  countryCode: '',
  phoneNo: '',
  email: '',
  productName: '',
  calledRisk: true,
  loginName: ''
}

export const defaultBankItem: BankItem = {
  payType: '',
  creditCardNo: '',
  expireMonth: '',
  expireYear: '',
  id: 0,
  cardGroup: '',
  expirationDate: '',
  firstName: '',
  lastName: ''
}

export const defaultOrderDetail: OrderDetail = {
  billNo: '',
  countryCode: '',
  creditCardNo: '',
  email: '',
  phoneNo: '',
  productId: '',
  productLoginName: '',
  productName: '',
  recordStatus: 0,
  payType: 0
}
