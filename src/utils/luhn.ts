//Luhn算法

export const luhnCheck = (cardNumber: string) => {
  // 将卡号转换为数组，并逆序处理
  const digits = cardNumber
    .split('')
    .reverse()
    .map((digit) => parseInt(digit, 10))

  // 处理偶数位
  for (let i = 1; i < digits.length; i += 2) {
    digits[i] *= 2
    if (digits[i] >= 10) {
      digits[i] -= 9
    }
  }

  // 计算总和
  const sum = digits.reduce((acc, val) => acc + val, 0)

  console.log('sum=>', sum)

  // 判断总和是否能被10整除
  return sum % 10 === 0
}

//号码四位加空格展示
export const formatCreditCardNumber = (value: string) => {
  return value
    .replace(/\s?/g, '')
    .replace(/(\d{4})/g, '$1 ')
    .trim()
}
