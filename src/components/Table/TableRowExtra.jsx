import React from 'react'
import styled, { withTheme } from 'styled-components'
import { get } from 'lodash'

import styles from '../../styles'
import TableVerticalCol from './TableVerticalCol'
import ArrowIcon from '../icons/ArrowIcon'

const StyledExtra = styled.article`
  position: relative;
`
const StyledAction = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  display: flex;
  padding: 0 ${styles.getGap(0.5)};
  transform: translate(-50%, -70%);
  cursor: pointer;
  user-select: none;
`
const StyledContent = styled.div`
  padding: ${styles.getGap(0.5)} ${styles.getGap()};
  background-color: ${({ theme }) => theme.colors.transparent[0]};
  border-radius: 0 0 ${styles.getRadius()} ${styles.getRadius()};
`

const TableExtra = ({
  columns = [],
  data = {},
  history = {},
  onAction = () => {},
  theme = {},
}) => {
  const [open, setOpen] = React.useState(false)
  return (
    <StyledExtra>
      <StyledAction onClick={() => setOpen(!open)}>
        <ArrowIcon
          size={24}
          thickness={2}
          rotate={open ? 90 : -90}
          angle={15}
          color={theme.colors.gray[theme.darkMode ? 12 : 2]}
        />
      </StyledAction>
      {open && (
        <StyledContent>
          {columns.map(({ label, key, render }, index) => (
            <TableVerticalCol key={index} label={label}>
              {render ? render(data, { history, onAction }) : get(data, key)}
            </TableVerticalCol>
          ))}
        </StyledContent>
      )}
    </StyledExtra>
  )
}

export default withTheme(TableExtra)
