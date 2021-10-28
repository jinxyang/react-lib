import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

import AntIcon from '../AntIcon'
import Container from '../Container'
import Modal from '../Modal'
import Square from '../Square'
import styles from '../../styles'

import options from './options'

const StyledIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 26px;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary.default : theme.colors.transparent[1]};
  border-radius: ${styles.getRadius(0.5)};
  cursor: pointer;
  transition: all 150ms;

  &:hover {
    opacity: 0.8;
  }
`

const StyledClose = styled(CloseOutlined)`
  position: absolute;
  top: 3px;
  right: 3px;
  font-size: 13px;
  cursor: pointer;
`

const Icon = ({ name = '', active = false, onClick = () => {} }) => {
  return (
    <StyledIcon $active={active} onClick={onClick}>
      <AntIcon name={name} />
    </StyledIcon>
  )
}

const IconSelect = ({ value = '', onChange = () => {} }) => {
  const [show, setShow] = React.useState(false)

  const handleSelect = (value) => {
    onChange(value)
    setShow(false)
  }

  return (
    <>
      {value ? (
        <Square style={{ width: '60px' }}>
          <Icon name={value} onClick={() => setShow(true)} />
          <StyledClose onMouseUp={() => onChange('')} />
        </Square>
      ) : (
        <Button onClick={() => setShow(true)}>选择图标</Button>
      )}
      <Modal
        show={show}
        title="选择图标"
        width="500px"
        onClose={() => setShow(false)}
      >
        <Container mode="grid">
          {options.map((icon, index) => {
            return (
              <Container.Item key={index} span={2}>
                <Square>
                  <Icon
                    name={icon.value}
                    active={icon.value === value}
                    onClick={() => handleSelect(icon.value)}
                  />
                </Square>
              </Container.Item>
            )
          })}
        </Container>
      </Modal>
    </>
  )
}

export default IconSelect
