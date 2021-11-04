import React from 'react'
import styled from 'styled-components'
import { SearchOutlined } from '@ant-design/icons'

import App from '../App'
import Space from '../Space'
import StyledCenter from '../styled/StyledCenter'

const StyledAlfredButton = styled(App)`
  font-size: 1.1em;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`

const AlfredButton = ({ text = '搜索', icon, onClick = () => {} }) => {
  return (
    <StyledAlfredButton gap={0.6} onClick={onClick}>
      <StyledCenter>
        <Space>
          {icon || <SearchOutlined />}
          {text}
        </Space>
      </StyledCenter>
    </StyledAlfredButton>
  )
}

export default AlfredButton
