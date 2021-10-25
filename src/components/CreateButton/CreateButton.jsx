import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const CreateButton = ({
  history,
  type = 'dashed',
  url = '',
  onClick = () => {},
  children,
}) => {
  const handleClick = () => {
    if (url) {
      history.push(url)
    } else {
      onClick()
    }
  }

  return (
    <Button type={type} icon={<PlusOutlined />} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default withRouter(CreateButton)
