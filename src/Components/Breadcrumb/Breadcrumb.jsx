import React from 'react'
import { Breadcrumb, Button } from 'antd'
import './Breadcrumd.less'
import backIconImg from '../../assets/backIcon.svg'
class BreadCrumbComp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  back = (num) => {
    const { history } = window
    history.go(num)
  }
  getHref(index, item) {
    const length = this.props.BreadList.length
    if (index === length - 1) {
      return item
    } else {
      return (
        <a
          href="#/"
          onClick={() => {
            this.back(1 + index - length)
          }}
        >
          {item}
        </a>
      )
    }
  }
  render() {
    return (
      <div className="Breadcrumb">
        <Breadcrumb separator="/">
          <img src={backIconImg} alt="" />
          {this.props.BreadList.map((item, index) => {
            return (
              <Breadcrumb.Item key={index}>
                {this.getHref(index, item)}
              </Breadcrumb.Item>
            )
          })}
        </Breadcrumb>
        <Button
          className="backButton"
          onClick={() => {
            this.back(-1)
          }}
        >
          返回上一级
        </Button>
      </div>
    )
  }
}

export default BreadCrumbComp
