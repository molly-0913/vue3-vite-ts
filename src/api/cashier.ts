import service from '@/service'
const url = '/cashier'

/**
 * 获取init信息
 * @returns
 */
export function getOrderInfo() {
  return service({
    url: url + '/orderInfo',
    method: 'post'
  })
}

/**
 * 删除卡
 * @param {*} data
 * @returns
 */
export function orderCreate(data: OrderCreateData) {
  return service({
    url: url + '/orderCreate',
    method: 'post',
    data
  })
}

/**
 * 获取订单详情
 * @returns
 */
export function getOrderDetailApi() {
  return service({
    url: url + '/orderDetail',
    method: 'post'
  })
}
