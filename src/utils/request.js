import icp from 'js-icp-sdk'
import { getFullURL } from './url.js'
import { message } from 'antd'

export const request = {
  async get(url, params) {
    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`${getFullURL(url)}?${queryString}`)
    const json = await response.json()
    return json
  },
  async post(url, params) {
    const response = await fetch(getFullURL(url), {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: localStorage.getItem('token'),
      }),
      body: new URLSearchParams(params).toString(),
    })
    if (response.ok) {
      const json = await response.json()
      if (json.code === '0000') {
        return json
      } else {
        message.error(json.message)
      }
    } else if (response.status === 700) {
      message.error('请登录基层智慧治理平台后查看')
      icp?.relogin()
    } else {
      message.error(response.statusText)
    }
  },
}
