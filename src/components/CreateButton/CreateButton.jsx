import React from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import useNavigate from '../../hooks/useNavigate'

const CreateButton = ({
  url = '',
  type = 'dashed',
  onClick = () => {},
  children,
}) => {
  const navigate = useNavigate()
  const handleClick = () => {
    if (url) {
      navigate(url)
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

export default CreateButton
