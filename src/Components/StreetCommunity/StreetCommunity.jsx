import React from 'react'
import { Select, Row, Col } from 'antd'
import { request } from '@/utils/request'
import { MangeLevel } from './getMangeLevel'

const { Option } = Select
const initParams = {
  streetCode: undefined,
  street: undefined,
  communityCode: undefined,
  communityName: undefined,
}

// 通过街道获取社区
function getCommunityListByStreetCode(params) {
  return request.post(
    `/community-baseinfo-saas/people-management-saas/peoplemanagementsaas/getCommunityListByStreetCode`,
    params
  )
}

class StreetCommunityComp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      params: initParams,
      streetList: [],
      communityList: [],
      // 账号权限 1：区级，2：街道级，3：社区级
      level: '',
    }
  }
  async componentDidMount() {
    const levelObj = await MangeLevel()
    if (levelObj.org_type === '1') {
      this.setState({
        streetList: levelObj.streetList,
        level: levelObj.org_type,
      })
    } else if (levelObj.org_type === '2') {
      let params = { ...this.state.params }
      params.street = levelObj.streetList[0].street
      params.streetCode = levelObj.streetList[0].streetCode
      this.setState(
        {
          params: params,
          streetList: levelObj.streetList,
          level: levelObj.org_type,
        },
        () => {
          this.props.onChangeStreetCommunity(params)
          this.getCommunityList(params.streetCode)
        }
      )
    } else {
      let params = { ...this.state.params }
      params.street = levelObj.streetList[0].street
      params.streetCode = levelObj.streetList[0].streetCode

      params.communityName = levelObj.communityList[0].communityName
      params.communityCode = levelObj.communityList[0].communityCode
      this.setState(
        {
          params: params,
          streetList: levelObj.streetList,
          communityList: levelObj.communityList,
          level: levelObj.org_type,
        },
        () => {
          this.props.onChangeStreetCommunity(params)
        }
      )
    }
  }
  getCommunityList = async (streetCode) => {
    const community = await getCommunityListByStreetCode({
      streetCode: streetCode,
    })
    this.setState({
      communityList: community,
    })
  }
  handleChangeStreet = (val, item) => {
    let params = { ...this.state.params }
    if (!val) {
      params = initParams
    } else {
      params = {
        streetName: item.children,
        streetCode: val,
        communityName: undefined,
        communityCode: undefined,
      }
    }
    this.setState(
      {
        communityList: [],
        params: params,
      },
      () => {
        this.props.onChangeStreetCommunity(params)
        val && this.getCommunityList(val)
        // this.render();
      }
    )
  }
  handleChangeCommunity = (val, item) => {
    let params = { ...this.state.params }
    if (!val) {
      params = {
        ...params,
        communityName: undefined,
        communityCode: undefined,
      }
    } else {
      params = {
        ...params,
        communityName: val,
        communityCode: item.children,
      }
    }
    this.setState(
      {
        params: params,
      },
      () => {
        this.props.onChangeStreetCommunity(params)
      }
    )
  }

  render() {
    return (
      <Row gutter={16}>
        <Col span={12}>
          <Select
            key="streetCode"
            allowClear
            disabled={Number(this.state.level) > 1}
            placeholder="街道"
            value={this.state.params.streetCode}
            onChange={this.handleChangeStreet}
          >
            {this.state.streetList.map((item) => {
              return (
                <Option key={item.streetCode} value={item.streetCode}>
                  {item.street}
                </Option>
              )
            })}
          </Select>
        </Col>
        <Col span={12}>
          <Select
            key={'community'}
            placeholder="社区"
            disabled={Number(this.state.level) === 3}
            allowClear
            value={this.state.params.communityCode}
            onChange={this.handleChangeCommunity}
          >
            {this.state.communityList.map((item) => {
              return (
                <Option key={item.communityCode} value={item.communityCode}>
                  {item.communityName}
                </Option>
              )
            })}
          </Select>
        </Col>
      </Row>
    )
  }
}

export default StreetCommunityComp
