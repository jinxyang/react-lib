import React from 'react'
import styled from 'styled-components'
import { LeftOutlined, RightOutlined, MoreOutlined } from '@ant-design/icons'

import Container from '../Container'
import styles from '../../styles'

const at = (array, index) => {
  return array[array.length + index]
}

const StyledText = styled.p`
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0;
  white-space: nowrap;
  user-select: none;
`
const StyledItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5em;
  height: 2.5em;
  color: ${({ theme, $disabled, $active }) => {
    if ($active) return '#fff'
    return $disabled ? theme.colors.transparent[3] : 'inherit'
  }};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary.default : theme.colors.transparent[1]};
  border-radius: ${styles.getRadius(0.5)};
  cursor: ${({ $active, $disabled }) =>
    $active || $disabled ? 'default' : 'pointer'};
  opacity: ${({ $disabled }) => ($disabled ? 0.8 : 1)};
  user-select: none;

  &:hover {
    opacity: ${({ $active }) => ($active ? 1 : 0.8)};
  }
`

const steps = 5

const getList = ({ list, current, totalPages, mode = 'normal' }) => {
  const firstItem = list[0]
  const lastItem = at(list, -1)
  const prevItem = {
    page: current - 1,
    icon: <LeftOutlined />,
    title: '上一页',
    disabled: current <= firstItem.page,
  }
  const nextItem = {
    page: current + 1,
    icon: <RightOutlined />,
    title: '下一页',
    disabled: current >= lastItem.page,
  }

  if (mode === 'mini') {
    return [prevItem, { page: current }, nextItem]
  }

  if (list.length < 8) {
    return list
  }

  const currentIndex = current - 1
  const lastIndex = lastItem.page - 1
  const minIndex = 2
  const maxIndex = lastIndex - 2
  const centerIndex =
    currentIndex <= minIndex
      ? minIndex
      : currentIndex >= maxIndex
      ? maxIndex
      : currentIndex
  const centerItems = list.slice(centerIndex - 2, centerIndex + 3)

  const backwardItem = centerItems[0].page - firstItem.page > 1 && {
    page: current - steps > 0 ? current - steps : 1,
    icon: <MoreOutlined style={{ transform: 'rotate(90deg)' }} />,
    title: `向前${steps}页`,
  }
  const forwardItem = lastItem.page - at(centerItems, -1).page > 1 && {
    page: current + steps < totalPages ? current + steps : totalPages,
    icon: <MoreOutlined style={{ transform: 'rotate(90deg)' }} />,
    title: `向后${steps}页`,
  }
  const resultList = [
    ...new Set(
      [
        prevItem,
        firstItem,
        backwardItem,
        ...centerItems,
        forwardItem,
        lastItem,
        nextItem,
      ].filter(Boolean),
    ),
  ]

  return resultList
}

const Pagination = ({
  mode = 'normal',
  current = 1,
  pageSize = 10,
  total = 0,
  showTotal = null,
  onChange = () => {},
  onPageSizeChange = () => {},
}) => {
  const length = React.useMemo(() => {
    return Math.ceil(total / pageSize)
  }, [pageSize, total])

  const list = React.useMemo(() => {
    return Array.from({ length }).map((_, index) => ({ page: index + 1 }))
  }, [length])

  if (!length) {
    return null
  }

  return (
    <Container as="ul" gap={0.5}>
      {showTotal && (
        <Container.Item>
          <StyledText>{showTotal(total)}</StyledText>
        </Container.Item>
      )}
      {getList({ list, current, totalPages: length, mode }).map(
        ({ page, icon, title, disabled }, index) => (
          <Container.Item key={index} as="li">
            <StyledItem
              $active={current === page}
              $disabled={disabled}
              title={title}
              onClick={() => !disabled && current !== page && onChange(page)}
            >
              {icon || page}
            </StyledItem>
          </Container.Item>
        ),
      )}
    </Container>
  )
}

export default Pagination
