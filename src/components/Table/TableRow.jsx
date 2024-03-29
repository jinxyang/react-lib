import React from 'react'
import styled from 'styled-components'
import { CaretRightOutlined } from '@ant-design/icons'
import { get, isFunction } from 'lodash'

import useNavigate from '../../hooks/useNavigate'
import styles from '../../styles'

import Skeleton from '../Skeleton'
import TableCol, { StyledColInner } from './TableCol'
import TableVerticalCol, { StyledVerticalCol } from './TableVerticalCol'
import TableRowExtra, { StyledExtraContent } from './TableRowExtra'

const StyledRow = styled.div`
  padding-left: ${({ $indent }) => ($indent ? styles.getGap(2) : 0)};
  overflow: hidden;

  &:hover {
    ${StyledColInner} {
      background-color: ${({ theme }) => theme.colors.transparent[2]};
    }

    ${StyledExtraContent} {
      background-color: ${({ theme }) => theme.colors.transparent[2]};
    }
  }
`
const StyledRowInner = styled.div`
  display: flex;
  flex-direction: ${({ $vertical }) => ($vertical ? 'column' : 'row')};
  width: 100%;
  padding: ${({ $vertical }) => ($vertical ? styles.getGap() : 0)};

  & > ${StyledVerticalCol} {
    flex-direction: column;
  }
`
const StyledArrow = styled.span`
  display: inline-flex;
  align-items: center;
  width: 1.5em;
  height: 2em;
  cursor: pointer;

  & > * {
    transform: ${({ $rotate }) => ($rotate ? 'rotate(90deg)' : 'none')};
    transition: all 150ms;
  }
`

const TableRow = ({
  search = '',
  align: commonAlign = null,
  vertical = false,
  list = [],
  columns = [],
  extraColumns = [],
  data = {},
  background = false,
  loading = false,
  indent = 0,
  utils = {},
  expanded = false,
  enableExpand = true,
  onExpand = null,
  onSelect = null,
  disabledSelection = () => false,
  onChange = () => {},
  onAction = () => {},
  renders = {},
}) => {
  const navigate = useNavigate()
  return loading ? (
    <Skeleton height="38px" duration="1.5s" />
  ) : (
    <StyledRow $background={background} $indent={!!onSelect}>
      <StyledRowInner $vertical={vertical}>
        {columns.map(
          ({ label, key, render, align, width, flex, ...column }, index) =>
            vertical ? (
              <TableVerticalCol
                key={index}
                label={label}
                isFirst={index === 0}
                isLast={index === columns.length - 1}
              >
                {render
                  ? (typeof render === 'string'
                      ? isFunction(renders[render])
                        ? renders[render]
                        : renders[render]?.render
                      : render)(
                      data,
                      { ...utils, navigate, list, onChange, key },
                      onAction,
                    )
                  : get(data, key)}
              </TableVerticalCol>
            ) : (
              <TableCol
                key={index}
                search={search}
                align={align || commonAlign}
                flex={flex}
                width={width}
                indent={index === 0 ? indent : 0}
                isFirst={index === 0}
                isLast={index === columns.length - 1}
                selected={!!data.SELECTED}
                onSelect={onSelect && ((v) => onSelect(data, v))}
                style={{
                  ...column.style,
                  ...(data.style?.[key] ?? data.style),
                }}
                disabledSelect={disabledSelection(data)}
              >
                {enableExpand && onExpand && !index && (
                  <StyledArrow
                    $rotate={expanded}
                    onClick={() => onExpand?.(data)}
                  >
                    <CaretRightOutlined />
                  </StyledArrow>
                )}
                {render
                  ? (typeof render === 'string'
                      ? isFunction(renders[render])
                        ? renders[render]
                        : renders[render]?.render
                      : render)(
                      data,
                      { ...utils, navigate, list, onChange, key },
                      onAction,
                    )
                  : get(data, key)}
              </TableCol>
            ),
        )}
      </StyledRowInner>
      {!loading && !!extraColumns.length && (
        <TableRowExtra
          columns={extraColumns}
          data={data}
          loading={loading}
          navigate={navigate}
          indent={indent}
          onAction={onAction}
        />
      )}
    </StyledRow>
  )
}

export default TableRow
