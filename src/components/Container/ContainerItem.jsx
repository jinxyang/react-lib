import React from 'react'
import styled, { css } from 'styled-components'

const gridMediaQueryStyle = (point, mediaQueryString) => css`
  @media (${mediaQueryString}) {
    grid-column: ${'span ' + point};
  }
`

const flexStyle = css`
  flex: ${({ $flex }) => $flex};
`

const gridStyle = css`
  grid-column: ${({ $span }) => ($span ? 'span ' + $span : 'auto')};

  ${({ $sm }) => ($sm ? gridMediaQueryStyle($sm, 'min-width: 576px') : '')}
  ${({ $md }) => ($md ? gridMediaQueryStyle($md, 'min-width: 768px') : '')}
  ${({ $lg }) => ($lg ? gridMediaQueryStyle($lg, 'min-width: 992px') : '')}
  ${({ $xl }) => ($xl ? gridMediaQueryStyle($xl, 'min-width: 1200px') : '')}
  ${({ $xxl }) => ($xxl ? gridMediaQueryStyle($xxl, 'min-width: 1400px') : '')}
`

const StyledWrap = styled.div`
  overflow: ${({ $fixed }) => ($fixed ? 'hidden' : 'visible')};
  ${({ $mode }) => ($mode === 'flex' ? flexStyle : '')}
  ${({ $mode }) => ($mode === 'grid' ? gridStyle : '')}
`

const ContainerItem = ({
  as = 'div',
  mode = 'flex',
  hide = false,
  flex = 1,
  span = 0,
  sm = 0,
  md = 0,
  lg = 0,
  xl = 0,
  xxl = 0,
  fixed = false,
  children,
}) => {
  return (
    !hide && (
      <StyledWrap
        as={as}
        $mode={mode}
        $flex={flex}
        $span={span}
        $sm={sm}
        $md={md}
        $lg={lg}
        $xl={xl}
        $xxl={xxl}
        $fixed={fixed}
      >
        {children}
      </StyledWrap>
    )
  )
}

export default ContainerItem
