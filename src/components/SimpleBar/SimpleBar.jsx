import React from 'react'
import _ from 'lodash'
import { Spin } from 'antd'

import { Flex } from '@jinxyang/seal-react'

import Legend from './Legend'

const defaultColors = [
  '#1890ff',
  '#52c41a',
  '#13c2c2',
  '#fa8c16',
  '#7C4DFF',
  '#795548',
  '#795548',
]
const layoutDirectionMap = {
  top: 'column',
  bottom: 'column-reverse',
  right: 'row-reverse',
  left: 'row',
}
const legendPositionMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
}
const barDirectionMap = {
  top: 'column-reverse',
  bottom: 'column',
  right: 'row',
  left: 'row-reverse',
}
const borderMap = {
  top: 'borderBottom',
  bottom: 'borderTop',
  right: 'borderLeft',
  left: 'borderRight',
}
const radiusMap = {
  top: ['2px', '2px', 0, 0],
  bottom: [0, 0, '2px', '2px'],
  left: ['2px', 0, 0, '2px'],
  right: [0, '2px', '2px', 0],
}
const transition = 'all .2s ease'

const Bar = ({
  loading = true,
  value = [],
  to = 'top',
  barWidth,
  gap = 1,
  itemGap = 0.5,
  boundaryGap = 0.5,
  minBar = '1px',
  legend = 'topCenter',
  colors: customColors = [],
  options = {},
}) => {
  const { labelFormatter } = options

  const [hideNames, setHideNames] = React.useState({})

  const names = React.useMemo(() => {
    return _.flow(_.map(?, 'name'), _.filter(?, Boolean))(value)
  }, [value])

  const legendVisible = React.useMemo(() => {
    return legend && !!names.length
  }, [legend, names.length])

  const [legendOrder, legendPosition] = React.useMemo(() => {
    const [vertical, horizontal] = _.kebabCase(legend).split('-')
    return [vertical === 'top' ? -1 : 1, legendPositionMap[horizontal]]
  }, [legend])

  const layoutDirection = React.useMemo(() => {
    return layoutDirectionMap[to]
  }, [to])

  const direction = React.useMemo(() => {
    return to === 'top' || to === 'bottom' ? 'row' : 'column'
  }, [to])
  const padding = React.useMemo(() => {
    return direction === 'row' ? [0, boundaryGap] : [boundaryGap, 0]
  }, [boundaryGap, direction])

  const colors = React.useMemo(() => {
    return _.zipWith(defaultColors, customColors, (a, b) => b ?? a)
  }, [customColors])

  const maxValue = React.useMemo(() => {
    return _.flow(
      _.map(?, ({ list }) => _.maxBy(list, 'value')?.value),
      _.max(?),
    )(value)
  }, [value])

  const data = React.useMemo(() => {
    return _.flow(
      _.map(?, ({ name, list }) =>
        _.map(list, ({ value }) => ({ value, name: name ?? '' })),
      ),
      (lists) => _.zip(...lists),
    )(value)
  }, [value])

  const labels = React.useMemo(() => {
    return _.map(value[0]?.list ?? [], ({ label, unit }) => ({ label, unit }))
  }, [value])

  const handleLegendClick = React.useCallback((name) => {
    setHideNames((names) => ({
      ...names,
      [name]: !names[name],
    }))
  }, [])

  if (!_.flatten(data).length) {
    return (
      <Flex
        main="center"
        cross="center"
        styles={{ width: '100%', height: '100%' }}
      >
        {loading ? <Spin /> : '暂无数据'}
      </Flex>
    )
  }

  return (
    <Flex seal direction="column" styles={{ width: '100%', height: '100%' }}>
      {legendVisible && (
        <Flex main={legendPosition} styles={{ order: legendOrder }}>
          <Legend
            names={names}
            hideNames={hideNames}
            colors={colors}
            onClick={handleLegendClick}
          />
        </Flex>
      )}
      <Flex direction={layoutDirection} gap="4px" styles={{ flex: 1 }}>
        <Flex
          direction={direction}
          gap={gap}
          styles={{
            flex: '0 0 auto',
            padding,
          }}
        >
          {_.map(data, (items, index) => (
            <Flex
              key={index}
              direction={direction}
              main="center"
              gap={itemGap}
              styles={{ flex: 1 }}
            >
              {_.map(items, ({ value }, index) => (
                <Flex
                  key={index}
                  direction={barDirectionMap[to]}
                  main="center"
                  styles={{
                    flex: hideNames[name]
                      ? 0
                      : barWidth != null
                      ? `0 0 ${barWidth}px`
                      : 1,
                    width: hideNames[name] ? 0 : 'auto',
                    overflow: 'visible',
                    textAlign: 'center',
                    transition,
                  }}
                >
                  {value}
                </Flex>
              ))}
            </Flex>
          ))}
        </Flex>
        <Flex
          direction={direction}
          gap={gap}
          styles={{
            flex: '1 0 10px',
            padding,
            border: 0,
            [borderMap[to]]: 1,
            borderColor: 'transparent[5]',
          }}
        >
          {_.map(data, (items, index) => (
            <Flex
              key={index}
              direction={direction}
              main="center"
              gap={itemGap}
              styles={{ flex: 1, transition }}
            >
              {_.map(items, ({ name, value }, index) => (
                <Flex
                  key={index}
                  direction={barDirectionMap[to]}
                  main="flex-start"
                  styles={{
                    flex: hideNames[name]
                      ? 0
                      : barWidth != null
                      ? `0 0 ${barWidth}px`
                      : 1,
                    width: hideNames[name] ? 0 : 'auto',
                    transition,
                  }}
                >
                  <Flex.Item
                    styles={{
                      [direction === 'row' ? 'height' : 'width']: value
                        ? (value / maxValue) * 100 + '%'
                        : minBar,
                      [direction === 'row' ? 'width' : 'height']: '100%',
                      backgroundColor: colors[index],
                      borderRadius: radiusMap[to],
                      transition,
                    }}
                  />
                </Flex>
              ))}
            </Flex>
          ))}
        </Flex>
        <Flex
          direction={direction}
          gap={gap}
          styles={{
            flex: '0 0 auto',
            padding,
          }}
        >
          {_.map(labels, (item, index) => (
            <Flex
              key={index}
              direction={barDirectionMap[to]}
              main="flex-end"
              cross="center"
              styles={{
                flex: 1,
                whiteSpace: 'pre-line',
                textAlign: 'center',
              }}
            >
              {_.isFunction(labelFormatter) ? labelFormatter(item) : item.label}
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Bar
