import service from '@/service'
const url = '/naticpay'

/**
 * 进行KYC - 获取token并和sumsub建立链接
 * @param {*} data
 * @returns
 */
export function doKyc() {
  return service({
    url: url + '/doKyc',
    method: 'post'
  })
}
