import React from 'react'
import './CommunityTree.less'
import { Tree, Button, Input } from 'antd'
import { request } from '@/utils/request'
import searchSvg from '../../assets/search.svg'

let expendKeys = []
let expandedKeysAll = []
let treeData = []

// 获取开通社区的树形结构列表
function getCommunityTree(params) {
  return request.post(`/htime/portal/community/getCommunityTree`, params)
}

class CommunityTree extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      params: {},
      treeData: [],
      checkedKeys: [],
      keyWords: '',
      ankeyWords: '',
      expendKeys: null,
    }
  }
  async componentDidMount() {
    this.getList()
  }
  getList = () => {
    getCommunityTree().then((data) => {
      treeData = data
      let checkedKeys = [data[0].id]
      this.setAllExpendid(data)
      this.setState(
        {
          treeData: [...data],
          expendKeys: [...expandedKeysAll],
          checkedKeys: checkedKeys,
        },
        () => {
          this.props.getList(data[0].id, data[0].org_id)
          this.render()
        }
      )
    })
  }
  onSelect = (val, row) => {
    this.props.getList(val[0], row.node.org_id)
  }
  onCheck = (val) => {
    // console.log("onCheck",val)
  }
  onChange = (e) => {
    this.setState({
      keyWords: e.target.value,
    })
  }
  setAllExpendid = (arr) => {
    for (let i in arr) {
      if (arr[i] && arr[i].id) {
        expandedKeysAll.push(arr[i].id)
        if (arr[i].children && arr[i].children.length) {
          this.setAllExpendid(arr[i].children)
        }
      }
    }
  }
  handleArr = (arr, j) => {
    for (let i in arr) {
      if (arr[i] && arr[i].name) {
        if (arr[i].name.includes(this.state.ankeyWords)) {
          if (j && arr[j]) {
            expendKeys.push(arr[j].id)
          } else {
            expendKeys.push(arr[0].id)
          }
        } else {
          if (arr[i].children && arr[i].children.length) {
            this.handleArr(arr[i].children, i)
          }
        }
      }
    }
  }
  unique(arr) {
    let newArr = []
    for (let i in arr) {
      if (newArr.indexOf(arr[i]) === -1) {
        newArr.push(arr[i])
      }
    }
    return newArr
  }
  goSearch = () => {
    if (!this.state.keyWords) {
      this.setState({
        expendKeys: [...expandedKeysAll],
        ankeyWords: this.state.keyWords,
      })
      return
    }
    this.setState(
      {
        ankeyWords: this.state.keyWords,
        treeData: [],
      },
      () => {
        this.handleArr(treeData)
        expendKeys = this.unique(expendKeys)
        this.setState({
          treeData: treeData,
          expendKeys: expendKeys,
        })
      }
    )
  }
  onExpand = (allid, val) => {
    let id = val.node.id
    let sKeys = [...this.state.expendKeys]
    if (sKeys.includes(id)) {
      let index = sKeys.indexOf(id)
      sKeys.splice(index, 1)
    } else {
      sKeys.push(id)
    }
    this.setState({
      expendKeys: sKeys,
    })
  }
  renderTitle = (e) => {
    const { ankeyWords } = this.state
    let name = e.name
    if (!name) {
      return ''
    }
    if (!ankeyWords || !name.includes(ankeyWords)) {
      return e.name
    } else {
      let index = name.indexOf(ankeyWords)
      let beforeValue = name.substring(0, index)
      let afterValue = name.substring(index + ankeyWords.length, name.length)
      return (
        <>
          {beforeValue}
          <span className="or_color">{ankeyWords}</span>
          {afterValue}
        </>
      )
    }
  }
  render() {
    return (
      <div className="tree_com_">
        <div className="nav">
          <Input
            className="input"
            prefix={<img src={searchSvg} alt="" />}
            onChange={(e) => this.onChange(e)}
            placeholder="请输入关键词进行查找"
          />
          <Button
            type="primary"
            onClick={() => {
              this.goSearch()
            }}
          >
            搜索
          </Button>
        </div>
        <div className="tree_box">
          {this.state.treeData.length > 0 ? (
            <Tree
              expandedKeys={this.state.expendKeys}
              onExpand={this.onExpand}
              fieldNames={{ title: 'name', key: 'id' }}
              onSelect={(val, row) => {
                this.onSelect(val, row)
              }}
              onCheck={(val) => {
                this.onCheck(val)
              }}
              titleRender={this.renderTitle}
              treeData={this.state.treeData}
            />
          ) : null}
        </div>
      </div>
    )
  }
}

export default CommunityTree
