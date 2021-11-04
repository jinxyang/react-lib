import React from 'react'
import { Empty } from 'antd'

import App from '../App'

const AlfredEmpty = () => {
  return (
    <App opacity={0.8}>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无搜索结果" />
    </App>
  )
}

export default AlfredEmpty
