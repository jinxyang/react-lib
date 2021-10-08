import React from 'react'
import styled from 'styled-components'
import { Button, Space } from 'antd'

import styles from '../../styles'
import Modal from '../Modal'

const StyledContent = styled.div`
  font-size: 1.1em;
  text-align: center;
`

const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${styles.getGap(0.75)};
  background-color: ${({ theme }) => theme.colors.transparent[1]};
`

const Confirm = ({
  show = false,
  title = '',
  width = '',
  okText = '确定',
  cancelText = '取消',
  okProps = {},
  cancelProps = {},
  onOk = () => {},
  onCancel = () => {},
  footer,
  children,
}) => {
  return (
    <Modal
      show={show}
      title={title}
      width={width}
      onClose={onCancel}
      footer={
        footer || (
          <StyledFooter>
            <Space>
              <Button type="text" {...cancelProps} onClick={onCancel}>
                {cancelText}
              </Button>
              <Button type="primary" {...okProps} onClick={onOk}>
                {okText}
              </Button>
            </Space>
          </StyledFooter>
        )
      }
    >
      <StyledContent>{children}</StyledContent>
    </Modal>
  )
}

export default Confirm
