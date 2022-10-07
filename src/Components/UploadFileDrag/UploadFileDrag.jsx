import React from 'react'
import { Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { getOrigin } from '@/utils/url'

const { Dragger } = Upload
const props = {
  name: 'file',
  multiple: true,
  action: getOrigin() + '/Community-Volunteer/manage/uploadVolunteerExcel',
  onChange(info) {
    const { status } = info.file
    if (status === 'done') {
      if (info.file.response.code === '0000') {
        this.setState(
          {
            importState: true,
          },
          () => {
            message.success(
              `上传成功${info.file.response.data.successCount}条，失败${info.file.response.data.errorCount}条`
            )
          }
        )
      } else {
        message.error(info.file.response.message)
      }
    } else if (status === 'error') {
      message.error(`上传失败`)
    }
  },
}
class UploadFileDrag extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined style={{ color: '#3D7FFF' }} />
        </p>
        <p className="ant-upload-text"></p>
        <p className="ant-upload-hint" style={{ color: '#3D7FFF' }}>
          请将Excel表格拖放到此处导入或点击上传
        </p>
      </Dragger>
    )
  }
}

export default UploadFileDrag
