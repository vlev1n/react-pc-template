import React from 'react'
import { Input, message } from 'antd'
import hideEyeSvg from '../../assets/hide_eye.svg'
import eyeSvg from '../../assets/eye.svg'
import { EditOutlined } from '@ant-design/icons'
import icp from 'js-icp-sdk'
import { MobileVerify } from 'rui5'
import { request } from '@/utils/request'

// 获取身份证号接口
const queryIdCardApi = `/community-resident-autonomy/Community-Volunteer/manage/queryIdCardById`
function queryIdCardById(params) {
  return request.post(queryIdCardApi, params)
}
// 验证手机号后四位接口、返回ticket
function fetchMobileCodeApi(condition) {
  return request.post(
    '/community-baseinfo-saas/community-house/common/checkPhoneNo',
    condition
  )
}

function mobile() {
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

class EncryptionIdCardInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      idCard: '',
      preIdCard: '',
    }
  }
  componentDidMount() {
    const { idCard } = this.props
    this.setState({
      idCard: idCard,
      preIdCard: idCard,
    })
  }
  showCompleteidCard = (b) => {
    const { type } = this.props
    if (!b && type === 'text_idcard') {
      this.setState({
        idCard: this.state.preIdCard,
      })
      return
    }
    mobile().then(async (token) => {
      // const info = await icp.getUserInfo();
      queryIdCardById({
        auth: token,
        id: '300', //人员id
        phoneNo: '13365403030', //info.mobile
      }).then((res) => {
        this.setState({
          idCard: res,
        })
      })
    })
  }
  setSuffix = (b) => {
    let imgUrl = b ? hideEyeSvg : eyeSvg
    return (
      <img
        onClick={() => {
          this.showCompleteidCard(b)
        }}
        style={{ cursor: 'pointer', marginLeft: '10px' }}
        alt=""
        src={imgUrl}
      ></img>
    )
  }
  setEditIcon = (b) => {
    if (!b) return null
    return (
      <EditOutlined
        onClick={() => {
          this.showCompleteidCard(b)
        }}
        style={{ cursor: 'pointer' }}
      />
    )
  }
  onChange = (val, value) => {
    console.log(val, value)
    // this.setState({
    //     idCard:val.target
    // })
  }
  render() {
    const { placeholder, type } = this.props
    const { idCard } = this.state
    const b = idCard.includes('****')
    if (type === 'input_idcard') {
      return (
        <Input
          key={idCard}
          placeholder={placeholder}
          defaultValue={idCard}
          disabled={b}
          maxLength={18}
          onChange={(val) => this.props.onChange(val)}
          suffix={this.setEditIcon(b)}
        />
      )
    } else {
      return (
        <div>
          <i style={{ fontStyle: 'normal' }}>{idCard}</i>
          {this.setSuffix(b)}
        </div>
      )
    }
  }
}

export default EncryptionIdCardInput
