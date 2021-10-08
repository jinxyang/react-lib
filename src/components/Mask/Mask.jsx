import React from 'react'
import styled from 'styled-components'

import Portal from '../Portal'
import Scroll from '../Scroll'
import styles from '../../styles'

const StyledMask = styled.div`
  ${styles.zIndex.mask};

  position: ${({ $fixed }) => ($fixed ? 'fixed' : 'absolute')};
  top: 0;
  left: 0;
  width: ${({ $fixed }) => ($fixed ? '100vw' : '100%')};
  height: ${({ $fixed }) => ($fixed ? '100vh' : '100%')};
`
const StyledBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0 0 0 / 50%);
  opacity: ${({ $show }) => ($show ? 0 : 1)};
  animation: ${({ $show }) => `${$show ? 'show' : 'hide'} 300ms forwards`};
`
const StyledContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Mask = ({ show = false, fixed = true, children }) => {
  const [innerShow, setShow] = React.useState(false)

  React.useEffect(() => {
    if (show) {
      setShow(true)
    } else {
      setTimeout(() => {
        setShow(false)
      }, 300)
    }
  }, [show])

  return (
    innerShow && (
      <Portal>
        <StyledMask $fixed={fixed}>
          <StyledBackground $show={show && innerShow} />
          {show && (
            <StyledContent>
              <Scroll y={true}>{children}</Scroll>
            </StyledContent>
          )}
        </StyledMask>
      </Portal>
    )
  )
}

export default Mask
