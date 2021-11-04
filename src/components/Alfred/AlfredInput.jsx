import React from 'react'
import styled from 'styled-components'
import { Spin } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import App from '../App'
import Space from '../Space'
import styles from '../../styles'

const StyledWrap = styled.div`
  width: 420px;
  margin: 0 auto;
`
const StyledInner = styled.div`
  margin: ${styles.getGap(-0.8)} 0;
  padding: 0 ${styles.getGap(0.2)};
`
const StyledInput = styled.input`
  flex: 1;
  font-size: 2em;
  background-color: transparent;
  border: none;
  outline: none;
  caret-color: ${({ theme }) => theme.colors.blue.default};
`
const StyledIcon = styled.div`
  padding: ${styles.getGap(0.5)} 0;
  font-size: 2em;
  cursor: ${({ $loading, $disabled }) =>
    $loading || $disabled ? 'default' : 'pointer'};
  opacity: ${({ $disabled }) => ($disabled ? 0.3 : 1)};
  transition: all 150ms;
`

const AlfredInput = ({
  value = '',
  loading = false,
  onChange = () => {},
  onSearch = () => {},
}) => {
  return (
    <StyledWrap>
      <App fill={false} opacity={0.8}>
        <StyledInner>
          <Space>
            <StyledInput
              value={value}
              autoFocus={true}
              onKeyDown={({ key }) => key === 'Enter' && onSearch()}
              onChange={(e) => onChange(e.target.value)}
            />
            {loading ? (
              <StyledIcon $loading={true}>
                <Spin />
              </StyledIcon>
            ) : (
              <StyledIcon $disabled={!value} onClick={onSearch}>
                <SearchOutlined />
              </StyledIcon>
            )}
          </Space>
        </StyledInner>
      </App>
    </StyledWrap>
  )
}

export default AlfredInput
