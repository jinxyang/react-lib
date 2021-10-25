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

const getItems = (list = [], data = {}, utils = {}, onAction = () => {}) => {
  return list
    .map((item, index) => {
      const column = typeof item === 'function' ? item(data) : item
      if (!column) return null
      const { label, key, props = {} } = column
      return (
        <Menu.Item
          key={index}
          {...props}
          onClick={() => onAction(key, data, utils)}
        >
          <StyledAction>{label}</StyledAction>
        </Menu.Item>
      )
    })
    .filter(Boolean)
}

const Actions = ({
  data = {},
  list = [],
  utils = {},
  onAction = () => {},
  options = {},
}) => {
  const items = getItems(list, data, utils, onAction)
  return items.length ? (
    <Dropdown
      overlay={<Menu>{items}</Menu>}
      placement="bottomRight"
      trigger={['click']}
      {...options}
    >
      <StyledIcon>
        <MoreIcon size={18} />
      </StyledIcon>
    </Dropdown>
  ) : null
}

const actionRender =
  (list = [], options = {}) =>
  (data, utils = {}, onAction = () => {}) => {
    const actionList = typeof list === 'function' ? list(data) : list
    return (
      <Actions
        data={data}
        list={actionList ?? []}
        utils={utils}
        onAction={onAction}
        options={options}
      />
    )
  }

export default actionRender
