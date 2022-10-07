import React from 'react'
import { Skeleton } from 'antd'
import './Detail.less'
import ResultComp from '../../Components/Result/Result'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'

const BreadList = ['一级菜单', '二级菜单']

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showContent: false,
    }
  }
  async componentDidMount() {
    setTimeout(() => {
      this.setState({
        showContent: true,
      })
    }, 500)
  }
  render() {
    return (
      <div className="Detail" ref={this.main}>
        <Breadcrumb BreadList={BreadList}></Breadcrumb>
        {!this.state.showContent ? (
          <Skeleton active />
        ) : (
          <div className="Content">
            <ResultComp />
          </div>
        )}
      </div>
    )
  }
}

export default Detail
