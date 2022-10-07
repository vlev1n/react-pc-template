export const regExps = {
  phone: /^1[3-9]\d{9}$/,
  telephone: /^0\d{2,3}-?\d{7,8}$/,
  mobileOrFixed: /(^1[3-9]\d{9}$|^0\d{2,3}-?\d{7,8}$)/,
  url: /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/,
  password:
    /^(?!\d+$)(?![A-Za-z]+$)(?![-.!@#$%^&*()+?><_]+$)[a-zA-Z0-9-.!@#$%^&*()+?><_]{6,}$/,
  email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
  chineseChars: /^\p{Unified_Ideograph}+$/u,
  chineseCharsLetters: /^[A-Za-z\p{Unified_Ideograph}]+$/u,
  chineseName: /^[·\p{Unified_Ideograph}]+$/u,
  residentId:
    /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  // vlevin @ 2020-06-30 企业信用代码，老的15位，新的18位
  coCode: /^([A-Z0-9]{15}|[A-Z0-9]{18})$/,
  ip: /(2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2}(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/,
  httpsUrl: /https:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/,
}
