import React from 'react'
import styled from 'styled-components'
import { ArrowLeftOutlined } from '@ant-design/icons'

import useNavigate from '../../hooks/useNavigate'
import styles from '../../styles'

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.5em;
`
const StyledBack = styled.span`
  position: relative;
  top: 0.1em;
  padding-right: ${styles.getGap()};
  font-size: 1.4em;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`
const StyledTitle = styled.p`
  margin: 0;
  font-size: 1.8em;
`

const Header = ({ children }) => {
  const navigate = useNavigate()
  return (
    <StyledHeader>
      <StyledBack onClick={() => navigate(-1)}>
        <ArrowLeftOutlined />
      </StyledBack>
      <StyledTitle>{children}</StyledTitle>
    </StyledHeader>
  )
}

export default Header
