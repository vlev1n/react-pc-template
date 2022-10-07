import React from 'react'
import './Table.less'
import { Button, Table, Modal, message, ConfigProvider } from 'antd'
import EmptyComp from '../EmptyComp/EmptyComp'

const reportList = [
  {
    releaseDate: '2011-09-08',
    state: '0',
    name: '阿芳',
    sex: '女',
    id: 0,
  },
  {
    releaseDate: '2012-11-29',
    state: '0',
    name: '后帅',
    sex: '男',
    id: 1,
  },
]

const isEmpty = (val) => {
  return val !== '' ? val : '--'
}

class TableCommon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  columns = [
    {
      title: '序号',
      align: 'center',
      key: 'community',
      fixed: 'left',
      width: '80px',
      render: (text, record, index) => {
        const { limit = 10, page = 1 } = this.props.pageObj
        return `${limit * (page - 1) + index + 1}`
      },
    },
    {
      title: '时间',
      dataIndex: 'releaseDate',
      key: 'releaseDate',
      render(b) {
        return isEmpty(b)
      },
      align: 'center',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render(b) {
        return isEmpty(b)
      },
      align: 'center',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render(b) {
        return isEmpty(b)
      },
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      align: 'center',
      render: (text, record, index) => {
        return (
          <div className="button_box">
            <Button onClick={() => this.error(record)} type="link">
              编辑
            </Button>
            <Button onClick={() => this.warn(record)} type="link">
              查看
            </Button>
            <Button onClick={() => this.remove(record)} type="link">
              删除
            </Button>
          </div>
        )
      },
    },
  ]
  componentDidMount() {}
  error = () => {
    message.error('人气太旺了，请稍后再试')
  }
  warn = () => {
    message.warn('请输入正确的手机号码')
  }
  remove = () => {
    Modal.confirm({
      title: '确认要删除该条数据吗？',
      content: '删除操作不可撤回，请慎重操作。',
      okText: '确定',
      cancelText: '取消',
      centered: true,
      onOk: async () => {
        message.success('删除成功')
      },
    })
  }
  changePage = (page, limit) => {
    // 如果切换条数，则从第一页开始
    if (limit !== this.props.pageObj.limit) {
      page = 1
    }
    this.props.changePage({
      page: page,
      limit: limit,
    })
  }
  paginationProps = (pageObj) => {
    return {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: () => `共 ${pageObj.total} 条`,
      defaultCurrent: pageObj.page,
      current: pageObj.page,
      pageSize: pageObj.limit,
      total: pageObj.total,
      onChange: (page, limit) => this.changePage(page, limit),
    }
  }
  renderEmpty = () => {
    return <EmptyComp description="暂无数据" />
  }
  render() {
    const { pageObj } = this.props
    return (
      <ConfigProvider renderEmpty={this.renderEmpty}>
        <Table
          key={JSON.stringify(pageObj)}
          className="table"
          dataSource={reportList}
          columns={this.columns}
          rowKey={(record) => record.id}
          bordered
          scroll={{ x: 900 }}
          pagination={this.paginationProps(pageObj)}
        />
      </ConfigProvider>
    )
  }
}
export default TableCommon
