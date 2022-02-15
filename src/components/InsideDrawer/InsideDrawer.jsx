import React from 'react'
import styled from 'styled-components'

import Scroll from '../Scroll'
import ArrowIcon from '../icons/ArrowIcon'
import styles from '../../styles'

const StyledWrapper = styled.div`
  position: relative;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  margin-left: ${({ $hide, $width }) => '-' + ($hide ? $width : 0)};
  transition: margin 200ms;
`

const StyledIcon = styled.div`
  position: fixed;
  top: 50%;
  left: ${({ $hide }) => styles.getGap($hide ? -0.3 : -0.55)};
  z-index: 10;
  padding: 8px 0;
  transform: translate(0, -50%);
  cursor: pointer;
`

const InsideDrawer = ({
  value = true,
  width = '200px',
  height = '100%',
  hidden = false,
  onChange = () => {},
  children,
}) => {
  const hide = React.useMemo(() => {
    return hidden || !value
  }, [hidden, value])

  return (
    <StyledWrapper $width={width} $height={height} $hide={hide}>
      <Scroll y>{children}</Scroll>
      {!hidden && (
        <StyledIcon $hide={hide} onClick={() => onChange(hide)}>
          <ArrowIcon size="30" thickness="3" angle="12" rotate={hide * 180} />
        </StyledIcon>
      )}
    </StyledWrapper>
  )
}

export default InsideDrawer
