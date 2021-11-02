import React from 'react'
import styled, { css } from 'styled-components'

import styles from '../../styles'

const fillStyle = css`
  width: 100%;
  height: 100%;
`
const flexStyle = css`
  display: flex;
  flex-direction: ${({ $column }) => ($column ? 'column' : 'row')};
  flex-wrap: ${({ $wrap }) => ($wrap ? 'wrap' : 'nowrap')};
  gap: ${styles.getGap()};
  ${({ $fill }) => $fill && fillStyle};
`
const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${styles.getGap()};
  justify-content: stretch;
  align-content: start;
`
const listStyle = css`
  margin: 0;
  padding: 0;
  list-style: none;
`
const StyledWrap = styled.div`
  ${({ as }) => (as === 'ul' || as === 'ol') && listStyle};
  ${({ $mode }) => $mode === 'flex' && flexStyle};
  ${({ $mode }) => $mode === 'grid' && gridStyle};
`

const Container = (
  {
    as = 'div',
    mode = 'flex', // grid
    wrap = false, // for flex
    column = false, // for flex
    fill = false,
    gap = 1,
    gapString = '',
    children,
  },
  ref,
) => {
  return (
    <StyledWrap
      ref={ref}
      as={as}
      $mode={mode}
      $wrap={wrap}
      $column={column}
      $fill={fill}
      $gap={gap}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { mode })
          : child,
      )}
    </StyledWrap>
  )
}

export default React.forwardRef(Container)
