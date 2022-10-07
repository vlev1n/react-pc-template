import React from 'react'
import { Empty } from 'antd'
import emptyImg from '../../assets/empty.png'

const emptyText = {
  color: 'rgba(0, 0, 0, 0.45)',
}

class EmptyComp extends React.Component {
  render() {
    const { description } = this.props
    return (
      <Empty image={emptyImg} style={emptyText} description={description} />
    )
  }
}

export default EmptyComp
