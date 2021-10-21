import React from 'react'
import styled from 'styled-components'
import { CloseOutlined } from '@ant-design/icons'

import styles from '../../styles'
import Mask from '../Mask'

const StyledModal = styled.div`
  @keyframes showModal {
    from {
      transform: translate(0, -100%);
    }
    to {
      transform: translate(0, 0);
    }
  }

  @keyframes hideModal {
    from {
      transform: translate(0, 0);
    }
    to {
      transform: translate(0, -100%);
    }
  }

  display: flex;
  justify-content: center;
  padding: ${styles.getGap()};
  animation: ${({ $show }) => ($show ? 'showModal' : 'hideModal')} 200ms
    ease-out forwards;
`
const StyledWrap = styled.div`
  width: ${({ $width }) => $width || 'auto'};
  overflow: hidden;
  background-color: ${styles.getFore()};
  border-radius: ${styles.getRadius()};
`
const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${styles.getGap(0.8)} ${styles.getGap()};

  /* background-color: ${styles.getBack()}; */
`

const StyledTitle = styled.p`
  margin: 0;
  padding-right: ${styles.getGap(1.5)};
  font-weight: bold;
  font-size: 1.1em;
`
const StyledContent = styled.div`
  padding: ${styles.getGap()};
`

const Modal = ({
  show = false,
  title = '',
  width = '',
  hideClose = false,
  onClose = () => {},
  footer,
  children,
}) => {
  return (
    <Mask show={show}>
      <StyledModal $show={show}>
        <StyledWrap $width={width}>
          {title && (
            <StyledHeader>
              <StyledTitle>{title}</StyledTitle>
              {!hideClose && <CloseOutlined onClick={onClose} />}
            </StyledHeader>
          )}
          <StyledContent>{children}</StyledContent>
          {footer}
        </StyledWrap>
      </StyledModal>
    </Mask>
  )
}

export default Modal
