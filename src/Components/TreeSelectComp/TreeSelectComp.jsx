import React from 'react'
import { TreeSelect } from 'antd'

const { SHOW_PARENT } = TreeSelect

const treeData = [
  {
    title: '节点1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: '节点1子节点1',
        value: '0-0-0',
        key: '0-0-0',
      },
      {
        title: '节点1子节点2',
        value: '0-0-1',
        key: '0-0-1',
      },
      {
        title: '节点1子节点2',
        value: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '节点2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: '节点1子节点1',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: '节点1子节点2',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: '节点1子节点3',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
]

class TreeSelectComp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  onChange = (value, item, extra) => {
    console.log('onChange ', value, item, extra)
    this.setState({ value })
  }
  render() {
    const tProps = {
      treeData,
      maxTagCount: 1,
      allowClear: true,
      value: this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      treeDefaultExpandAll: true,
      showCheckedStrategy: SHOW_PARENT,
      placeholder: '请选择',
      style: {
        width: '100%',
      },
    }
    return <TreeSelect style={{ width: 120 }} {...tProps} />
  }
}

export default TreeSelectComp
