import React from 'react'
import styled from 'styled-components'
import { Dropdown, Menu } from 'antd'

import styles from '../../styles'
import MoreIcon from '../icons/MoreIcon'

const StyledAction = styled.div`
  padding: 0 ${styles.getGap(0.5)};
`

const StyledIcon = styled.div`
  display: flex;
  padding: ${styles.getGap(0.5)};
  border-radius: ${styles.getRadius(0.5)};
  transition: all 200ms;

  &:hover {
    background: ${({ theme }) => theme.colors.transparent[1]};
  }
`

const Actions = ({ data = {}, list = [], utils = {}, options = {} }) => {
  return (
    <Dropdown
      overlay={
        <Menu>
          {list.map(({ label, key, props = {} }, index) => (
            <Menu.Item
              key={index}
              {...props}
              onClick={() => utils.onAction(key, data)}
            >
              <StyledAction>{label}</StyledAction>
            </Menu.Item>
          ))}
        </Menu>
      }
      placement="bottomRight"
      trigger={['click']}
      {...options}
    >
      <StyledIcon>
        <MoreIcon size={18} />
      </StyledIcon>
    </Dropdown>
  )
}

const actionRender =
  (list = [], options = {}) =>
  (data, utils = {}) => {
    return <Actions data={data} list={list} utils={utils} options={options} />
  }

export default actionRender
