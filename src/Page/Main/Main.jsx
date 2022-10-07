import React from 'react'
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Button,
  Rate,
  Typography,
  Space,
  Divider,
  Tag,
  Dropdown,
  Menu,
  Input,
  Tabs,
  Steps,
  TimePicker,
  Alert,
  message,
  Tooltip,
  Modal,
  Popconfirm,
  notification,
} from 'antd'
import './Main.less'
import { DownOutlined, UserOutlined } from '@ant-design/icons'

import moment from 'moment'

import Table from '../../Components/Table/Table'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import TreeComp from '../../Components/TreeComp/TreeComp'
import TreeSelectComp from '../../Components/TreeSelectComp/TreeSelectComp'
import DatePickerComp from '../../Components/DatePickerComp/DatePickerComp'
import RangePicker from '../../Components/RangePicker/RangePicker'
import UploadFile from '../../Components/UploadFile/UploadFile'
import UploadImage from '../../Components/UploadImage/UploadImage'
import UploadFileDrag from '../../Components/UploadFileDrag/UploadFileDrag'
import EmptyComp from '../../Components/EmptyComp/EmptyComp'
import EncryptionIdCardInput from '../../Components/EncryptionIdCardInput/EncryptionIdCardInput'
import StreetCommunity from '../../Components/StreetCommunity/StreetCommunity'
import EncryptNameOrPhone from '../../Components/EncryptNameOrPhone/EncryptNameOrPhone'
import TransferTree from '../../Components/TransferTree/TransferTree'
import logoImg from '../../assets/iCityLogo.png'
import searchSvg from '../../assets/search.svg'

const { Option } = Select
const { Title } = Typography
const { TabPane } = Tabs
const { TextArea } = Input
const { Step } = Steps
const { Search } = Input

const menu = (
  <Menu>
    <Menu.Item key="1">1st menu item</Menu.Item>
    <Menu.Item key="2" icon={<UserOutlined />}>
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3" icon={<UserOutlined />}>
      3rd menu item
    </Menu.Item>
  </Menu>
)

const BreadList = ['一级菜单', '二级菜单', '三级菜单', '四级菜单']

class Main extends React.Component {
  constructor(props) {
    super(props)
    // 被缓存
    // props.cacheLifecycles.didCache(this.componentDidCache)
    // 被恢复
    // props.cacheLifecycles.didRecover(this.componentDidRecover)
    this.state = {
      pageObj: {
        limit: 10,
        page: 1,
        total: 200,
      },
      imageList: [],
      defaultDate: '2022-02-09',
      defaultRangeDate: ['2022-01-05', '2022-02-09'],
      isModalVisible: false,
    }
  }
  async componentDidMount() {}
  // keep-alive设置下
  // componentDidCache = () => {
  //   console.log('被缓存')
  // }
  // componentDidRecover = () => {
  //   console.log('被恢复')
  // }
  goDetail = () => {
    this.props.history.push({
      pathname: '/Detail',
      query: {
        type: 'add',
      },
    })
  }
  changePage = (params) => {
    let obj = { ...this.state.pageObj }
    obj.page = params.page
    obj.limit = params.limit
    this.setState({
      pageObj: obj,
    })
  }
  handleChangeImage = (imageUrl, status, uid) => {
    let imageList = [...this.state.imageList]
    let imageObj = {
      uid: uid, // antd返回的图片唯一ID
      name: `图片${imageList.length}`, // 图片名称
      status: status, // 图片上传状态
      percent: 60, // 图片上传进度，默认60
      url: imageUrl, // 图片地址
    }
    if (!imageList.length) {
      imageList.push(imageObj)
      this.setState({
        imageList: imageList,
      })
      return
    }
    for (let i in imageList) {
      if (uid === imageList[i].uid) {
        imageList.splice(Number(i), 1, imageObj)
        break
      }
      if (Number(i) === imageList.length - 1) {
        imageList.push(imageObj)
      }
    }
    this.setState({
      imageList: imageList,
    })
  }
  handleRemove = (file) => {
    let imageList = [...this.state.imageList]
    for (let i in imageList) {
      if (file === imageList[i]) {
        imageList.splice(Number(i), 1)
        break
      }
    }
    console.log('handleRemove imageList', imageList)
    this.setState({
      imageList: imageList,
    })
  }
  onSelectedDate = (val) => {
    console.log('日期选择 onSelectedDate', val)
  }
  onSelectedRangeDate = (val) => {
    console.log('时间段选择 onSelectedRangeDate', val)
  }
  showModal = (b) => {
    this.setState({
      isModalVisible: b,
    })
  }
  openNotificationWithIcon = (type) => {
    notification[type]({
      message: '通知提醒框标题',
      description: '通知提醒框内容',
    })
  }
  onChangeIdCard = (val) => {
    console.log('身份证号', val.target.value)
  }
  goTree = () => {
    this.props.history.push({
      pathname: '/TreeLeft',
    })
  }
  onChangeStreetCommunity = (val) => {
    console.log('onChangeStreetCommunity', val)
  }
  render() {
    // 其他组件无特殊要求，都一律按照antd react默认样式开发
    return (
      <div className="Main">
        <div className="Content">
          <section
            style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}
          >
            <Space align="start">
              <img
                style={{ width: 40, height: 40 }}
                src={logoImg}
                alt="Ant Design"
              />
              <Title level={2} style={{ marginBottom: 0 }}>
                community-react-antd-template
              </Title>
            </Space>
          </section>
          <Divider style={{ marginBottom: 20 }}>Form</Divider>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            labelAlign="right"
          >
            {/* link标签  */}
            <Form.Item label="link链接">
              <a href="https://less.bootcss.com/">less官网</a>
            </Form.Item>
            {/* 通用下拉框组件 有样式改动 */}
            <Form.Item label="下拉框">
              <Space align="start">
                <div className="Dropdown_blue">
                  <Dropdown overlay={menu}>
                    <Button>
                      蓝色下拉框 <DownOutlined />
                    </Button>
                  </Dropdown>
                </div>
                <Dropdown overlay={menu}>
                  <Button>
                    普通下拉框 <DownOutlined />
                  </Button>
                </Dropdown>
              </Space>
            </Form.Item>
            {/* 通用开关组件 */}
            <Form.Item label="开关">
              <Switch defaultChecked />
            </Form.Item>
            {/* 通用按钮组件 */}
            <Form.Item label="按钮">
              <Space className="detail_button">
                <Button
                  type="primary"
                  onClick={() => {
                    this.goDetail()
                  }}
                >
                  Go Detail
                </Button>
                {/* 蓝边按钮 新增class */}
                <Button className="c_blue_border">蓝色边框</Button>
                <Button>灰色按钮</Button>
                <Button disabled>失效按钮</Button>
              </Space>
            </Form.Item>
            {/* 输入框组件 */}
            <Form.Item label="搜索框">
              <Space>
                <Search
                  className="input"
                  prefix={<img src={searchSvg} alt="" />}
                  enterButton="查询"
                  onPressEnter={this.goDetail}
                  onSearch={this.goDetail}
                  placeholder="请输入关键字进行搜索，例如姓名/联系方式/证件号码"
                />
              </Space>
            </Form.Item>
            {/* 输入框  */}
            <Form.Item label="输入框">
              <Space>
                <Input placeholder="普通输入框" style={{ width: 150 }} />
                <Input placeholder="带图标输入框" prefix={<UserOutlined />} />
                <Input disabled placeholder="disabled状态" />
                <Input status="error" placeholder="Error状态" />
                <InputNumber
                  placeholder="数字输入框"
                  min={1}
                  max={10}
                  style={{ width: 150 }}
                />
              </Space>
            </Form.Item>
            {/* 文本域  */}
            <Form.Item label="文本域">
              <TextArea placeholder="文本域" showCount maxLength={100} />
            </Form.Item>
            {/* 通用选择器 */}
            <Form.Item label="选择器">
              <Space>
                <Select placeholder="单选" style={{ width: 192 }}>
                  <Option value="jack">jack</Option>
                  <Option value="lucy">lucy</Option>
                  <Option value="disabled" disabled>
                    disabled
                  </Option>
                  <Option value="yiminghe">yiminghe</Option>
                </Select>
                <Select
                  placeholder="多选"
                  mode="multiple"
                  maxTagCount="responsive"
                  style={{ width: 192 }}
                >
                  <Option value="jack">jack</Option>
                  <Option value="lucy">lucy</Option>
                  <Option value="disabled">disabled</Option>
                  <Option value="yiminghe">yiminghe</Option>
                </Select>
              </Space>
            </Form.Item>
            {/* 日期/时间选择 */}
            <Form.Item label="日期/时间选择">
              <Space>
                <DatePickerComp
                  defaultValue={this.state.defaultDate}
                  onSelectedDate={this.onSelectedDate}
                />
                <RangePicker
                  defaultValue={this.state.defaultRangeDate}
                  onSelectedDate={this.onSelectedRangeDate}
                />
                <TimePicker defaultValue={moment('00:00:00', 'HH:mm:ss')} />
              </Space>
            </Form.Item>
            {/* 通用标签组件  */}
            <Form.Item label="标签">
              <div>
                <Tag color="success">成功</Tag>
                <Tag color="processing">normal</Tag>
                <Tag color="error">出错了</Tag>
                <Tag color="warning">提醒一下</Tag>
                <Tag color="default">default</Tag>
              </div>
            </Form.Item>
            {/* 面包屑 */}
            <Form.Item label="面包屑">
              <Breadcrumb BreadList={BreadList}></Breadcrumb>
            </Form.Item>
            {/* 树控件 */}
            <Form.Item label="树控件">
              <TreeComp />
            </Form.Item>
            {/* 树选择 */}
            <Form.Item label="树选择">
              <TreeSelectComp />
            </Form.Item>
            {/* 穿梭树 */}
            <Form.Item label="穿梭树">
              <TransferTree />
            </Form.Item>
            {/* 文件上传 */}
            <Form.Item label="文件上传">
              <UploadFile
                uploadFileDone={(params) => this.uploadFileDone(params)}
              />
            </Form.Item>
            {/* 图片上传 */}
            <Form.Item label="图片上传">
              <UploadImage
                maxLength={3}
                imageList={this.state.imageList}
                onRemove={(file) => this.handleRemove(file)}
                handleChangeImage={this.handleChangeImage}
              />
            </Form.Item>
            {/* 拖拽上传 */}
            <Form.Item label="拖拽上传">
              <UploadFileDrag />
            </Form.Item>

            {/* 通用表格组件 + 通用分页样式 有样式改动 */}
            <Form.Item label="表格"></Form.Item>
            <Table
              changePage={(params) => this.changePage(params)}
              pageObj={this.state.pageObj}
            />
            {/* 步骤条 */}
            <Form.Item label="步骤条">
              <Steps current={1}>
                <Step title="居民发起问题" description="居民XXX发起问题" />
                <Step
                  title="主标题"
                  subTitle="副标题"
                  description="网格员XXX收到问题"
                />
                <Step title="处理中" description="问题正在处理" />
              </Steps>
            </Form.Item>
            {/* Tab切换 */}
            <Form.Item label="Tab切换">
              <Tabs
                defaultActiveKey="1"
                items={[
                  {
                    label: 'Tab 1',
                    key: '1',
                    children: 'Content of Tab Pane 1',
                  },
                  {
                    label: 'Tab 2',
                    key: '2',
                    children: 'Content of Tab Pane 2',
                  },
                  {
                    label: 'Tab 3',
                    key: '3',
                    children: 'Content of Tab Pane 3',
                  },
                ]}
              ></Tabs>
            </Form.Item>
            {/* 警告提示 */}
            <Form.Item label="警告提示">
              <Space
                direction="vertical"
                size="middle"
                style={{ display: 'flex' }}
              >
                <Alert message="成功提示" type="success" />
                <Alert message="信息提示" type="info" />
                <Alert message="警告提示" type="warning" />
                <Alert message="错误提示" type="error" />
              </Space>
            </Form.Item>
            {/* 全局提示 */}
            <Form.Item label="全局提示">
              <Space>
                <Button onClick={() => message.success('成功信息')}>
                  Success
                </Button>
                <Button onClick={() => message.error('错误信息')}>Error</Button>
                <Button onClick={() => message.warning('警告信息')}>
                  Warning
                </Button>
                <Button onClick={() => message.info('普通信息')}>info</Button>
              </Space>
            </Form.Item>
            {/* 文字提示 */}
            <Form.Item label="文字提示">
              <Tooltip title="我是一个没有感情的文字提示">划过我试试</Tooltip>
            </Form.Item>
            {/* 评分 */}
            <Form.Item label="评分">
              <Rate defaultValue={5} />
            </Form.Item>
            {/* 对话框 */}
            <Form.Item label="对话框">
              <Button type="primary" onClick={() => this.showModal(true)}>
                打开对话框
              </Button>
              <Modal
                title="对话框标题"
                centered
                open={this.state.isModalVisible}
                onOk={() => message.success('信息已提交')}
                onCancel={() => this.showModal(false)}
              >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Modal>
            </Form.Item>
            {/* 气泡确认框 */}
            <Form.Item label="气泡确认框">
              <Popconfirm
                title="确定删除此条信息吗?"
                onConfirm={() => {
                  message.success('此条信息已删除')
                }}
                onCancel={() => {
                  message.error('已取消')
                }}
                okText="确定"
                cancelText="取消"
              >
                <a href="#/">删除</a>
              </Popconfirm>
            </Form.Item>
            {/* 通知提醒框 */}
            <Form.Item label="通知提醒框">
              <Space>
                <Button
                  onClick={() => this.openNotificationWithIcon('success')}
                >
                  Success
                </Button>
                <Button onClick={() => this.openNotificationWithIcon('info')}>
                  Info
                </Button>
                <Button
                  onClick={() => this.openNotificationWithIcon('warning')}
                >
                  Warning
                </Button>
                <Button onClick={() => this.openNotificationWithIcon('error')}>
                  Error
                </Button>
              </Space>
            </Form.Item>
            {/* 缺省图 */}
            <Form.Item label="缺省图">
              <EmptyComp description="暂无数据" />
            </Form.Item>
            <Form.Item label="身份证号加解密Input">
              <EncryptionIdCardInput
                key="input_idcard"
                type="input_idcard"
                onChange={(val) => this.onChangeIdCard(val)}
                placeholder="身份证号"
                idCard={'3715******7897'}
              />
            </Form.Item>
            <Form.Item label="身份证号加解密Text">
              <EncryptionIdCardInput
                key="text_idcard"
                type="text_idcard"
                placeholder="身份证号"
                idCard={'3715******7897'}
              />
            </Form.Item>
            <Form.Item label="街道社区二级选择">
              <StreetCommunity
                onChangeStreetCommunity={(val) => {
                  this.onChangeStreetCommunity(val)
                }}
              />
            </Form.Item>
            <Form.Item label="姓名加密">
              {/* 
                            value:需要展示的值
                            type:name / phone
                            algin:left / center / right
                            showEye:是否展示小眼睛
                        */}
              <EncryptNameOrPhone value="张三丰" type="name" showEye />
            </Form.Item>
            <Form.Item label="手机号加密">
              <EncryptNameOrPhone value="13365413030" type="phone" showEye />
            </Form.Item>
            <Form.Item label="权限">
              <EncryptNameOrPhone value="13365413030" type="phone" showEye />
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default Main
