import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { ArrowLeftOutlined } from '@ant-design/icons'

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

const Header = ({ history, children }) => {
  return (
    <StyledHeader>
      <StyledBack onClick={() => history.go(-1)}>
        <ArrowLeftOutlined />
      </StyledBack>
      <StyledTitle>{children}</StyledTitle>
    </StyledHeader>
  )
}

export default withRouter(Header)
