import React from 'react'
import { Button } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'

import useUpload from '../../hooks/useUpload'
import selectFile from '../../utils/selectFile'
import getExtensions from '../../utils/getExtensions'

const UploadButton = ({
  url = '',
  type = 'default',
  shape = 'round',
  filetype,
  onSuccess = () => {},
  children,
}) => {
  const [{ loading }, upload] = useUpload(url, ({ code }) => {
    !code && onSuccess()
  })
  const handleClick = async () => {
    const accept = filetype && getExtensions(filetype, { formatter: 'accept' })
    const file = await selectFile(accept)
    upload(file)
  }

  return (
    <Button
      type={type}
      shape={shape}
      loading={loading}
      icon={<CloudUploadOutlined />}
      onClick={handleClick}
    >
      {children}
    </Button>
  )
}

export default UploadButton
