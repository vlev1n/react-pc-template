import { message } from 'antd'
import { SmsVerify, MobileVerify } from 'rui5'
import icp from 'js-icp-sdk'

import { sendSmsApi, fetchSmsCodeApi, fetchMobileCodeApi } from 'api/verifyApi'

export async function sms() {
  return new Promise(async (resolve) => {
    const ticket = await icp.getSmsVerifyTicket()
    if (!!ticket) {
      resolve(ticket)
    } else {
      const info = await icp.getUserInfo()
      SmsVerify.show({
        isCloseHide: true,
        mobile: !!info ? info.mobile : '',
        send: () => {
          sendSmsApi()
            .then(() => {
              message.success('短信验证码发送成功')
            })
            .catch((err) => {
              console.error(err)
              // message.error('短信验证码发送失败，请稍后再试~')
            })
        },
        confirm: (code) => {
          fetchSmsCodeApi({ smsCode: code })
            .then((ticket) => {
              SmsVerify.hide()
              icp.setSmsVerifyTicket(ticket)
              resolve(ticket)
            })
            .catch((err) => {
              // message.error(err.message)
            })
        },
      })
    }
  })
}

export async function mobile() {
  return new Promise(async (resolve) => {
    const ticket = await icp.getMobileVerifyTicket()
    if (!!ticket) {
      resolve(ticket)
    } else {
      MobileVerify.show({
        confirm: (code) => {
          fetchMobileCodeApi({ phoneNo: code })
            .then((ticket) => {
              icp.setMobileVerifyTicket(ticket)
              resolve(ticket)
            })
            .catch((err) => {
              message.error(err.message)
            })
        },
      })
    }
  })
}
