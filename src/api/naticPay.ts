import service from '@/service'
const url = '/naticpay'

/**
 * 获取卡列表
 * @returns
 */
export function getUserCardList(data: { loginName: string; appId: string }) {
  return service({
    url: url + '/getUserCardList',
    method: 'post',
    data
  })
}

/**
 * 删除卡
 * @param {*} data
 * @returns
 */
export function deleteUserCard(data: { id: number }) {
  return service({
    url: url + '/deleteUserCard',
    method: 'post',
    data
  })
}

/**
 * 获取卡号账单信息
 * @param {*} data
 * @returns
 */
export function getCardBillInfo(data: { loginName: string; appId: string }) {
  return service({
    url: url + '/getCreditCardAddrInfo',
    method: 'post',
    data
  })
}

/**
 * 获取 Nuvei Url
 * @param {*} data
 * @returns
 */
export function getNuveiMethodUrl(data: { billNo: string }) {
  return service({
    url: url + '/getNuveiMethodurl',
    method: 'post',
    data
  })
}
