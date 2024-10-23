export function maskPhone(code: string, phone: string) {
  // 6-12位
  if (code && phone) {
    const phoneStr = String(phone)
    return `+${code} ${phoneStr.slice(0, -8)}****${phoneStr.slice(-4)}`
  }
  return ''
}

export function maskEmail(email?: string) {
  // 显示@前2位，剩余显示为*，@后全隐藏
  // 12****@gmail.com
  // 如果@前位数过短，如仅为1/2位，则默认@前全为*
  if (email) {
    const emailStr = String(email)
    const idx = emailStr.indexOf('@')
    const front = emailStr.slice(0, idx)
    const last = emailStr.slice(idx)
    if (front.length <= 2) {
      return '****' + last
    } else {
      return front.slice(0, 2) + '****' + last
    }
  }
  return ''
}

export function maskCreditCard(card: string) {
  return `**** ${card.slice(-4)}`
}

export const getQueryString = (name: string) => {
  const url_string = window.location.href
  const url = new URL(url_string)
  return url.searchParams.get(name)
}
