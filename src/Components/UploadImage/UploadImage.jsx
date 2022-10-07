import React from 'react'
import { Upload, message, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getOrigin } from '@/utils/url'

// 上传前判断图片格式和大小
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('只允许上传JPG/PNG格式的图片')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('图片不能大于2MB!')
  }
  return isJpgOrPng && isLt2M
}

class UploadImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
    }
  }
  handleChange = (info) => {
    console.log('handleChange', info)
    // 上传中
    if (info.file.status === 'uploading') {
      this.props.handleChangeImage('', 'uploading', info.file.uid)
      return
    }
    // 上传失败
    if (info.file.status === 'error') {
      message.error(info.file.error.message)
      this.props.handleChangeImage('', 'error', info.file.uid)
      return
    }
  }
  // 上传成功
  complate = (res, file) => {
    if (res.code !== '0000') {
      message.error(res.message)
      return
    }
    let imageUrl = res.data
    this.props.handleChangeImage(imageUrl, 'done', file.uid)
  }
  // 预览照片
  handlePreview = async (file) => {
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    })
  }
  handleCancel = () => {
    this.setState({
      previewVisible: false,
    })
  }
  render() {
    const { previewVisible, previewTitle, previewImage } = this.state
    const { maxLength, imageList, onRemove } = this.props
    const uploadButton = (
      <div>
        {<PlusOutlined />}
        <div style={{ marginTop: 8 }}>上传图片</div>
      </div>
    )
    return (
      <>
        <Upload
          name="multipartFile"
          accept="image/jpg, image/png, image/jpeg"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={true}
          fileList={imageList}
          // action={`${getOrigin()}/community-baseinfo-saas/people-management-saas/peoplemanagementsaas/uploadFiles`}
          action={`${getOrigin()}/people-management-changqing/peoplemanagementsaas/uploadFiles`}
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
          onSuccess={this.complate}
          onPreview={this.handlePreview}
          onRemove={onRemove}
        >
          {imageList.length >= maxLength ? null : uploadButton}
        </Upload>
        <Modal
          open={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    )
  }
}

export default UploadImage
