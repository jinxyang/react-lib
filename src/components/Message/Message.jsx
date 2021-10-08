import React from 'react'
import {
  InfoCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import styled, { keyframes, css } from 'styled-components'

import styles from '../../styles'

const showAnimation = keyframes`
  0% {
    transform: translate(-50%, calc(-100% - 24px));
  }

  70% {
    transform: translate(-50%, 6px);
  }

  100% {
    transform: translate(-50%, 0);
  }
`
const hideAnimation = keyframes`
  from {
    transform: translate(-50%, 0);
  }
  to {
    transform: translate(-50%, calc(-100% - 24px));
  }
`
const showStyle = css`
  animation: ${showAnimation} 250ms ease-out forwards;
`

const hideStyle = css`
  animation: ${hideAnimation} 250ms ease-out forwards;
`
const StyledMessage = styled.div`
  ${styles.zIndex.message};
  ${({ $hide }) => ($hide ? hideStyle : showStyle)};

  position: fixed;
  top: ${styles.getGap(0.5)};
  left: 50%;
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.size * 3 + 'px'};
  padding-right: ${({ theme }) => theme.size * 1.5 + 'px'};
  padding-left: ${({ theme }) => theme.size * 1.5 + 'px'};
  color: ${({ theme, $color }) => theme.colors[$color].default};
  background-color: ${({ theme, $color }) =>
    theme.darkMode
      ? theme.colors[$color].dark[7]
      : theme.colors[$color].light[1]};
  border-radius: ${({ theme }) => theme.size * 1.5 + 'px'};
  transform: translate(-50%, calc(-100% - 24px));
`
const StyledIcon = styled.span`
  margin-right: ${({ theme }) => theme.gap / 2 + 'px'};
  font-size: 1.3em;
`
const StyledText = styled.p`
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const colors = {
  info: 'blue',
  success: 'green',
  warn: 'yellow',
  error: 'red',
}
const icons = {
  info: <InfoCircleOutlined />,
  success: <CheckCircleOutlined />,
  warn: <ExclamationCircleOutlined />,
  error: <CloseCircleOutlined />,
}

const Message = ({
  type = '',
  text = '',
  duration = 3,
  close = false,
  onClose = () => {},
}) => {
  const [hide, setHide] = React.useState(false)
  const color = colors[type]

  React.useEffect(() => {
    const hideTimer =
      duration && setTimeout(() => setHide(true), duration * 1000)
    const closeTimer = duration && setTimeout(onClose, duration * 1250)
    return () => {
      hideTimer && clearTimeout(hideTimer)
      closeTimer && clearTimeout(closeTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return close ? null : (
    <StyledMessage $color={color} $hide={hide}>
      <StyledIcon>{icons[type]}</StyledIcon>
      <StyledText>{text}</StyledText>
    </StyledMessage>
  )
}

export default Message
