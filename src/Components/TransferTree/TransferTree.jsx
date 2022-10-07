import { Transfer, Tree, Input } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import search from '../../assets/search.svg'
import './TransferTree.less'

// 树打平
export const generateList = (data, dataList = []) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i]
    const { name, id } = node
    dataList.push({
      id,
      name,
    })
    if (node.list) {
      generateList(node.list, dataList)
    }
  }
  return dataList
}
// 获取父节点
export const getParentKey = (key, tree) => {
  let parentKey

  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]

    if (node.list) {
      if (node.list.some((item) => item.id === key)) {
        parentKey = node.id
      } else if (getParentKey(key, node.list)) {
        parentKey = getParentKey(key, node.list)
      }
    }
  }

  return parentKey
}
// 校验选中
const isChecked = (selectedKeys, eventKey) => selectedKeys.includes(eventKey)
const generateTree = (treeNodes = [], checkedKeys = []) =>
  treeNodes.map(({ list, ...props }) => ({
    ...props,
    disabled: checkedKeys.includes(props.id),
    checkable: !list,
    selectable: !list,
    list: generateTree(list, checkedKeys),
  }))
// 统计右侧选中树节点的叶子节点数量
const countTotal = (data, checkedKeys, count = 0) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i]
    if (node.list) {
      count = countTotal(node.list, checkedKeys, count)
    } else {
      if (checkedKeys.includes(node.id)) {
        count++
      }
    }
  }
  return count
}
// 生成右侧选中树
const generateTargetTree = (treeNodes = [], checkedKeys = []) =>
  treeNodes
    .map(({ list, ...props }) => {
      // 叶子节点id为number，所以除了叶子节点都设置成不可选择，不可多选
      if (
        typeof props.id === 'string' &&
        generateTargetTree(list, checkedKeys).length
      ) {
        return {
          ...props,
          name: `${props.name}（${countTotal(list, checkedKeys)}）`,
          checkable: !list,
          selectable: !list,
          list: generateTargetTree(list, checkedKeys),
        }
      } else {
        if (checkedKeys?.includes(props.id)) {
          return { ...props }
        }
        return null
      }
    })
    .filter(Boolean)
const TreeTransfer = ({ dataSource, targetKeys, ...restProps }) => {
  const [searchValue, setSearchValue] = useState('')
  const [expandedKeys, setExpandedKeys] = useState(['all'])
  const [autoExpandParent, setAutoExpandParent] = useState(true)
  const [defaultExpandAll, setDefaultExpandAll] = useState(false)
  const dataList = generateList(dataSource)

  useEffect(() => {
    if (targetKeys?.length) {
      const expKeys = dataList
        ?.map((item) => {
          if (targetKeys.includes(item.id)) {
            return getParentKey(item.id, dataSource)
          }
          return null
        })
        .filter((item, i, self) => item && self.indexOf(item) === i)

      setExpandedKeys(expKeys)
      setAutoExpandParent(true)
      setDefaultExpandAll(true)
    } else {
      setDefaultExpandAll(false)
      setExpandedKeys(['all'])
    }
  }, [targetKeys])
  const transferDataSource = []
  function flatten(list = []) {
    list.forEach((item) => {
      transferDataSource.push(item)
      flatten(item.list)
    })
  }
  flatten(dataSource)
  const onChange = (e) => {
    const { value } = e.target
    const newExpandedKeys = dataList
      ?.map((item) => {
        if (item.name.indexOf(value) > -1) {
          return getParentKey(item.id, dataSource)
        }
        return null
      })
      .filter((item, i, self) => item && self.indexOf(item) === i)

    setExpandedKeys(newExpandedKeys)
    setSearchValue(value)
    setAutoExpandParent(true)
  }
  const onExpand = (newExpandedKeys) => {
    setExpandedKeys(newExpandedKeys)
    setAutoExpandParent(false)
  }
  const treeData = useMemo(() => {
    const loop = (data) =>
      data.map((item) => {
        const strTitle = `${item.name}${item.count ? `（${item.count}）` : ''}`
        const index = strTitle.indexOf(searchValue)
        const beforeStr = strTitle.substring(0, index)
        const afterStr = strTitle.slice(index + searchValue.length)
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className="site-tree-search-value">{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{strTitle}</span>
          )

        if (item.list) {
          return {
            id: item.id,
            name: title,
            list: loop(item.list),
            count: item.count,
          }
        }
        return {
          id: item.id,
          name: title,
        }
      })

    return loop(dataSource)
  }, [searchValue])

  return (
    <Transfer
      {...restProps}
      style={{ height: 442 }}
      targetKeys={targetKeys}
      dataSource={transferDataSource}
      className="tree-transfer"
    >
      {({ direction, onItemSelect, selectedKeys }) => {
        if (direction === 'left') {
          const checkedKeys = [...selectedKeys, ...targetKeys]
          return (
            <>
              <Input
                style={{ marginBottom: 8 }}
                placeholder="请输入单位名称或姓名搜索"
                onChange={onChange}
                suffix={<img src={search} alt="" />}
              />
              <Tree
                height={360}
                checkable
                fieldNames={{
                  title: 'name',
                  key: 'id',
                  children: 'list',
                }}
                defaultExpandAll={defaultExpandAll}
                autoExpandParent={autoExpandParent}
                expandedKeys={expandedKeys}
                onExpand={onExpand}
                checkedKeys={checkedKeys}
                treeData={generateTree(treeData, targetKeys)}
                onCheck={(_, { node: { key } }) => {
                  onItemSelect(key, !isChecked(checkedKeys, key))
                }}
                onSelect={(_, { node: { key } }) => {
                  onItemSelect(key, !isChecked(checkedKeys, key))
                }}
              />
            </>
          )
        }
        if (direction === 'right') {
          return (
            <Tree
              height={360}
              blockNode
              checkable
              checkStrictly
              defaultExpandAll
              autoExpandParent
              expandedKeys={targetKeys}
              checkedKeys={selectedKeys}
              fieldNames={{
                title: 'name',
                key: 'id',
                children: 'list',
              }}
              treeData={generateTargetTree(dataSource, targetKeys)}
              onCheck={(_, { node: { key } }) => {
                onItemSelect(key, !isChecked(selectedKeys, key))
              }}
              onSelect={(_, { node: { key } }) => {
                onItemSelect(key, !isChecked(selectedKeys, key))
              }}
            />
          )
        }
      }}
    </Transfer>
  )
}

/**
 * 部分逻辑与数据源树结构绑定
 * 需要根据情况改动
 */
const TreeTransferApp = ({ onChange, value }) => {
  const [targetKeys, setTargetKeys] = useState([])

  useEffect(() => {
    if (value?.length) {
      setTargetKeys(value)
      onChange && onChange(value)
    } else {
      setTargetKeys([])
      onChange && onChange([])
    }
  }, [value])
  const onTransferChange = (keys) => {
    setTargetKeys(keys)
    onChange && onChange(keys)
  }
  // 数据源
  const treeData = [
    {
      name: '全部',
      id: 'all',
      count: 3,
      list: [
        {
          name: '市直',
          id: 'sz',
          count: 2,
          list: [
            {
              name: '0-0-0',
              id: '0-0-0',
              count: 1,
              list: [
                {
                  name: '0-0-0-0',
                  id: '0-0-0-0',
                },
              ],
            },
            {
              name: '0-0-1',
              id: '0-0-1',
              count: 1,
              list: [
                {
                  name: '0-0-1-0',
                  id: '0-0-1-0',
                },
              ],
            },
          ],
        },
        {
          name: '区直',
          id: 'qz',
          count: 1,
          list: [
            {
              name: '0-1-0',
              id: '0-1-0',
              count: 1,
              list: [
                {
                  name: '0-1-0-0',
                  id: '0-1-0-0',
                },
              ],
            },
          ],
        },
      ],
    },
  ]

  return (
    <TreeTransfer
      dataSource={treeData}
      targetKeys={targetKeys}
      onChange={onTransferChange}
    />
  )
}

export default TreeTransferApp
