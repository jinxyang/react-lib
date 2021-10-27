import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { get } from 'lodash'

import Container from '../Container'
import StyledTitle from '../styled/StyledTitle'

const StyledChildren = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`
const StyledItem = styled.div`
  padding-left: 0.9em;
`
const StyledLabel = styled.span`
  font-size: 0.9em;
  opacity: 0.7;
`
const StyledContent = styled.div`
  padding-top: 0.2em;
`

const Preview = ({
  title = '',
  data = {},
  columns = [],
  history,
  children,
}) => {
  console.log(data, columns)
  return (
    <Container column={true}>
      {(title || children) && (
        <Container.Item flex="0 0 auto">
          <Container>
            {title && (
              <Container.Item flex="0 0 auto">
                <StyledTitle>{title}</StyledTitle>
              </Container.Item>
            )}
            <Container.Item>
              <StyledChildren>{children}</StyledChildren>
            </Container.Item>
          </Container>
        </Container.Item>
      )}
      <Container.Item>
        <Container column={true}>
          {columns.map((item, index) => (
            <Container.Item key={index}>
              <StyledItem>
                <StyledLabel>{item.label}</StyledLabel>
                <StyledContent>
                  {item.render?.(data, { history }) ??
                    (get(data, item.key) || '-')}
                </StyledContent>
              </StyledItem>
            </Container.Item>
          ))}
        </Container>
      </Container.Item>
    </Container>
  )
}

export default withRouter(Preview)
