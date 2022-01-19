import React from 'react'
import { Button } from 'antd'
import { CloudDownloadOutlined } from '@ant-design/icons'

import useFetch from '../../hooks/useFetch'
import download from '../../utils/download'

const DownloadButton = ({
  url = '',
  type = 'default',
  shape = 'round',
  children,
}) => {
  const service = React.useCallback(() => {
    return {
      url,
      method: 'get',
      transformResponse: async (response, { message }) => {
        const disposition = response.headers.get('Content-Disposition')
        const list = disposition.split(';').slice(1)
        const params = list.reduce((a, param) => {
          const [prop, value] = param.split('=')
          return {
            ...a,
            [prop.toLowerCase()]: decodeURIComponent(value),
          }
        }, {})

        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const filename = params.filename
        download(url, filename)

        return {
          code: 0,
          data: {},
          message: '下载成功',
        }
      },
    }
  }, [url])

  const [{ loading }, start] = useFetch(service)

  return (
    <Button
      type={type}
      shape={shape}
      loading={loading}
      icon={<CloudDownloadOutlined />}
      onClick={start}
    >
      {children}
    </Button>
  )
}

export default DownloadButton
