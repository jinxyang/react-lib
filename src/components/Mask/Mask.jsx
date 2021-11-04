import React from 'react'
import styled from 'styled-components'

import Portal from '../Portal'
import Scroll from '../Scroll'
import styles from '../../styles'
import useKeypress from '../../hooks/useKeypress'

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

const defaultContentStyle = {
  display: 'flex',
  alignItems: 'flex-start',
}

const Mask = ({
  show = false,
  fixed = true,
  width = 'auto',
  closable = true,
  onClose = () => {},
  style = {},
  children,
}) => {
  const [keyboard, keyboardToggle] = useKeypress('Escape')
  const [innerShow, setShow] = React.useState(false)

  const handleClick = (event) => {
    const isContent = event.target.dataset.mask === 'content'
    isContent && closable && onClose()
  }

  const close = React.useCallback(() => {
    keyboardToggle(false)
    setTimeout(() => {
      setShow(false)
    }, 300)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closable])

  React.useEffect(() => {
    keyboard.Escape && closable && onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyboard])

  React.useEffect(() => {
    if (show) {
      setShow(true)
      setTimeout(() => {
        closable && keyboardToggle(true)
      }, 300)
    } else {
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  return (
    innerShow && (
      <Portal>
        <StyledMask $fixed={fixed} onMouseDownCapture={handleClick}>
          <StyledBackground $show={show && innerShow} />
          {show && (
            <Scroll
              y={true}
              data-mask="content"
              style={{ ...defaultContentStyle, ...style }}
            >
              {children}
            </Scroll>
          )}
        </StyledMask>
      </Portal>
    )
  )
}

export default Mask
