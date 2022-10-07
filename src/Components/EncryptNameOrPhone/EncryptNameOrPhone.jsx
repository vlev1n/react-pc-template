import React from 'react'
import hideEyeSvg from '../../assets/hide_eye.svg'
import eyeSvg from '../../assets/eye.svg'
import './EncryptNameOrPhone.less'
import { MobileVerify } from 'rui5'
import icp from 'js-icp-sdk'
import { message } from 'antd'

// 姓名加密
const encryptName = (name) => {
  if (!name) return '**'
  let nameArr = name.split('')
  if (name.length <= 2) {
    return `*${nameArr[1]}`
  }
  let star = '*'
  for (let i in nameArr) {
    i > 2 && i < 6 && (star += '*')
  }
  return `${nameArr[0]}${star}${nameArr[nameArr.length - 1]}`
}

// 手机号加密
const formatPhone = (value) => {
  if (!value || value.trim() === '') {
    return '--'
  }
  let phone_s = value.substring(0, 3)
  let phone_e = value.substring(7, 11)
  return `${phone_s}****${phone_e}`
}

class encryptNameOrPhone extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showComplete: false,
      completeValue: '',
      encryptValue: '',
    }
  }

  componentDidMount() {
    const { value, type } = this.props
    let encryptValue =
      type === 'phone' ? formatPhone(value) : encryptName(value)
    this.setState({
      completeValue: value,
      encryptValue: encryptValue,
    })
  }

  open = () => {
    const { showComplete } = this.state
    if (showComplete || sessionStorage.getItem('checkPhoneSuccess') === '1') {
      this.setState({
        showComplete: !showComplete,
      })
    } else {
      this.openMobileDialog()
    }
  }

  openMobileDialog = async () => {
    const info = await icp.getUserInfo()
    if (!info) return message.error('请移步社区环境')
    let userPhone = info.mobile
    let fourPhone = userPhone.substring(userPhone.length - 4)
    MobileVerify.show({
      isCloseHide: true,
      confirm: (code) => {
        if (code === fourPhone) {
          sessionStorage.setItem('checkPhoneSuccess', '1')
          MobileVerify.hide()
          this.setState({
            showComplete: true,
          })
        } else {
          message.error('手机号后四位验证错误')
        }
      },
      cancel: () => {},
    })
  }

  render() {
    const { completeValue, encryptValue, showComplete } = this.state
    const { showEye, align } = this.props
    return (
      <div
        className="EncryptNameOrPhone"
        style={{ justifyContent: align ? align : 'left' }}
      >
        {showComplete ? (
          <>
            {completeValue}
            {showEye ? (
              <img alt="" onClick={this.open} src={eyeSvg}></img>
            ) : null}
          </>
        ) : (
          <>
            {encryptValue}
            {showEye ? (
              <img alt="" onClick={this.open} src={hideEyeSvg}></img>
            ) : null}
          </>
        )}
      </div>
    )
  }
}

export default encryptNameOrPhone
