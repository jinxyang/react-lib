import React from 'react'
import styled from 'styled-components'

import App from '../App'
import Container from '../Container'
import Pagination from '../Pagination'
import Scroll from '../Scroll'

const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`

const AlfredResult = ({
  list = [],
  pagination = {},
  onPageChange = () => {},
  onClose = () => {},
  children,
}) => {
  return (
    <App opacity={0.5}>
      <Container fill={true} column={true}>
        <Container.Item fixed={true}>
          <Scroll y={true}>
            {React.isValidElement(children) &&
              React.cloneElement(children, {
                list,
                onClose,
              })}
          </Scroll>
        </Container.Item>
        <Container.Item flex="0 0 auto">
          <StyledFooter>
            <Pagination {...pagination} onChange={onPageChange} />
          </StyledFooter>
        </Container.Item>
      </Container>
    </App>
  )
}

export default AlfredResult
