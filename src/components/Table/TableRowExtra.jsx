import React from 'react'
import styled, { withTheme } from 'styled-components'
import { get } from 'lodash'

import styles from '../../styles'
import TableVerticalCol from './TableVerticalCol'
import ArrowIcon from '../icons/ArrowIcon'

const StyledExtra = styled.article`
  position: relative;
  margin-left: ${({ $indent }) => styles.getGap($indent * 2)};
  padding: 0 ${styles.getGap(0.6)} 0;
`
const StyledExtraButton = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  display: flex;
  padding: 0 ${styles.getGap(0.5)};
  transform: translate(-50%, -70%);
  cursor: pointer;
  user-select: none;
`
export const StyledExtraContent = styled.div`
  padding: ${styles.getGap(0.5)} ${styles.getGap()};
  background-color: ${({ theme }) => theme.colors.transparent[1]};
  border-radius: 0 0 ${styles.getRadius()} ${styles.getRadius()};
  transition: background-color 150ms;
`

const TableExtra = ({
  columns = [],
  data = {},
  history = {},
  indent = 0,
  theme = {},
  onAction = () => {},
}) => {
  const [open, setOpen] = React.useState(false)
  return (
    <StyledExtra $indent={indent}>
      <StyledExtraButton onClick={() => setOpen(!open)}>
        <ArrowIcon
          size={24}
          thickness={2}
          rotate={open ? 90 : -90}
          angle={15}
          color={theme.colors.gray[theme.darkMode ? 12 : 2]}
        />
      </StyledExtraButton>
      {open && (
        <StyledExtraContent>
          {columns.map(({ label, key, render }, index) => (
            <TableVerticalCol key={index} label={label}>
              {render ? render(data, { history, onAction }) : get(data, key)}
            </TableVerticalCol>
          ))}
        </StyledExtraContent>
      )}
    </StyledExtra>
  )
}

export default withTheme(TableExtra)
