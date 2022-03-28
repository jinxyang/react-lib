import React from 'react'
import styled from 'styled-components'
import Cropper from 'react-cropper'
import { Button } from 'antd'
import { getExtension } from 'mime'
import 'cropperjs/dist/cropper.css'

import Image from '../Image'
import Modal from '../Modal'
import Space from '../Space'
import useUpload from '../../hooks/useUpload'
import selectFile from '../../utils/selectFile'

const StyledImage = styled.div`
  position: relative;
  width: ${({ $width }) => $width + ' !important'};
  height: ${({ $height }) => $height + ' !important'};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allow' : 'pointer')};
  transition: opacity 150ms;

  &:hover {
    opacity: 0.8;
  }
`

const ProCropper = ({
  value = '',
  title = '图片',
  disabled = false,
  imageProps = {},
  cropProps = {},
  uploadProps = {},
  onChange = () => {},
  children,
}) => {
  const [loading, setLoading] = React.useState(false)
  const [cropper, setCropper] = React.useState(null)
  const [image, setImage] = React.useState('')

  const upload = useUpload(uploadProps.url, ({ code, data }) => {
    if (!code) {
      onChange(uploadProps?.onChange(data) ?? data)
      setImage('')
    }
    setLoading(false)
  })[1]

  const handleSelect = async () => {
    if (disabled) return
    const file = await selectFile('image')
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = () => {
    setLoading(true)
    cropper.getCroppedCanvas().toBlob((blob) => {
      const file = new window.File([blob], 'image.' + getExtension(blob.type), {
        type: blob.type,
      })
      upload(file, uploadProps.key)
    })
  }

  return (
    <>
      <StyledImage
        $width={imageProps.width || '100%'}
        $height={imageProps.height || '100%'}
        $disabled={disabled}
        onClick={handleSelect}
      >
        {value ? (
          children || <Image {...imageProps} src={value} />
        ) : (
          <Button type="dashed">选择{title}</Button>
        )}
      </StyledImage>
      <Modal
        show={!!image}
        title={title + '裁剪'}
        hideClose={loading}
        onClose={() => setImage('')}
      >
        <Space>
          <Button type="primary" loading={loading} onClick={handleUpload}>
            确定
          </Button>
          <Cropper
            {...cropProps}
            src={image}
            style={{ width: '100%', height: '70vh' }}
            onInitialized={setCropper}
          />
        </Space>
      </Modal>
    </>
  )
}

export default ProCropper
