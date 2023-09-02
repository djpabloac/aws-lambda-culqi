export const isValidCardNumber = (cardNumber: number): boolean => {
  const lengthCardNumber = cardNumber.toString().length
  if (lengthCardNumber < 13 && lengthCardNumber > 16) return false

  const numbers = cardNumber
    .toString()
    .split('')
    .reverse()
    .map(x => parseInt(x))

  const [lastDigit] = numbers.splice(0, 1)

  const sum = numbers
    .reduce((acc, val, i) => (!(i % 2) ? acc + ((val * 2) % 9) || 9 : acc + val), 0)

  return !((sum + lastDigit) % 10);
}

export const isValidCvv = (cvv: number) => [3, 4].includes(cvv.toString().length)

export const isValidExpirationMonth = (strMonth: string) => {
  if (![1, 2].includes(strMonth.length)) return false

  const month = parseInt(strMonth)

  if (isNaN(month)) return false

  return month > 0 && month < 13
}

export const isValidExpirationYear = (strYear: string) => {
  const year = parseInt(strYear)

  if (isNaN(year)) return false

  const currentYear = (new Date()).getFullYear()

  return year >= currentYear && year <= currentYear + 5
}

export const isValidDomainEmail = (email: string) => {
  const domains = [
    'gmail.com',
    'hotmail.com',
    'yahoo.es'
  ]

  const [, domain] = email.split('@')

  return domains.includes(domain)
}