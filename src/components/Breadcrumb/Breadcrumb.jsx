import React from 'react'
import styled from 'styled-components'

import BreadcrumbSeparator from './BreadcrumbSeparator'

const StyledWrap = styled.ul`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  margin: 0;
  padding: 0;
  overflow: hidden;
  list-style: none;
  user-select: none;
`

const Breadcrumb = ({ children }) => {
  const arrayChildren = React.Children.toArray(children)

  return (
    <StyledWrap>
      {React.Children.map(arrayChildren, (child, index) => {
        const isFirst = index === 0
        const isLast = index === arrayChildren.length - 1
        return (
          <>
            {!isFirst && <BreadcrumbSeparator />}
            {React.isValidElement(child)
              ? React.cloneElement(child, { isLast })
              : child}
          </>
        )
      })}
    </StyledWrap>
  )
}

export default Breadcrumb
