import React from 'react'
import { Tree } from 'antd'

const treeData = [
  {
    title: '街道1',
    key: '0-0',
    children: [
      {
        title: '社区1',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: '小区1',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: '小区2',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: '社区2',
        key: '0-0-1',
        children: [
          {
            title: <span style={{ color: '#3D7FFF' }}>sss</span>,
            key: '0-0-1-0',
          },
        ],
      },
    ],
  },
]

class TreeComp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
  }

  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info)
  }
  render() {
    return (
      <Tree
        defaultExpandedKeys={['0-0-0', '0-0-1']}
        defaultSelectedKeys={['0-0-0', '0-0-1']}
        defaultCheckedKeys={['0-0-0', '0-0-1']}
        onSelect={this.onSelect}
        onCheck={this.onCheck}
        treeData={treeData}
      />
    )
  }
}

export default TreeComp
