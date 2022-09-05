import React from 'react'
import _ from 'lodash'
import { Spin } from 'antd'

import { Flex, View } from '@jinxyang/seal-react'

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
const valueTranslateMap = {
  top: {
    transform: 'translate(-50%, -100%)',
    top: 0,
    left: '50%',
    paddingBottom: '2px',
  },
  bottom: {
    transform: 'translate(-50%, 100%)',
    bottom: 0,
    left: '50%',
    paddingTop: '2px',
  },
  left: {
    transform: 'translate(-100%, -50%)',
    top: '50%',
    left: 0,
    paddingRight: '2px',
  },
  right: {
    transform: 'translate(100%, -50%)',
    top: '50%',
    right: 0,
    paddingLeft: '2px',
  },
}

const getBarHeight = (value, maxValue, minBar) => {
  return value && value > maxValue
    ? (maxValue * 100) / (2 * maxValue) > 2
      ? (maxValue * 100) / (2 * maxValue) + '%'
      : minBar
    : (value * 100) / maxValue > 2
    ? (value * 100) / maxValue + '%'
    : minBar
}

const Bar = ({
  loading = true,
  value = [],
  to = 'top',
  barWidth,
  gap = 1,
  layoutGap = 0.5,
  itemGap = 0.5,
  boundaryGap = 0.5,
  minBar = '4px',
  legend = 'topCenter',
  colors: customColors = [],
  grid = null,
  options = {},
  barStyle = {},
  onBarClick = () => {},
  valueFloat = false,
  disabledBar = {},
  showLegend = true,
  block = true,
}) => {
  const { labelFormatter, valueFormatter } = options

  const [hideNames, setHideNames] = React.useState({})

  const names = React.useMemo(() => {
    return _.flow(_.map(?, 'name'), _.filter(?, Boolean))(value)
  }, [value])

  const legendVisible = React.useMemo(() => {
    return legend && !!names.length && showLegend
  }, [legend, names.length, showLegend])

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
      _.map(
        ?,
        ({ list }) => _.maxBy(list, ({ value }) => Math.abs(value))?.value,
      ),
      _.map(?, (value) => Math.abs(value)),
      _.max(?),
    )(value)
  }, [value])

  const data = React.useMemo(() => {
    return _.flow(
      _.map(?, ({ name, list }) =>
        _.map(list, ({ value, max, unit, color }) => ({
          value,
          name: name ?? '',
          max,
          unit,
          color,
        })),
      ),
      (lists) => _.zip(...lists),
      // _.map(?, (list) => _.filter(list, ({ name }) => !hideNames[name])),
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

  const getColorIndex = React.useCallback(
    (barName) => {
      return names.findIndex((name) => barName === name)
    },
    [names],
  )

  if (!_.flatten(data).length) {
    return (
      <Flex
        seal
        direction="column"
        gap={0}
        styles={{ width: '100%', height: '100%' }}
      >
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
        <Flex
          main="center"
          cross="center"
          styles={{ width: '100%', height: '100%' }}
        >
          {loading ? <Spin /> : '暂无数据'}
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex direction="column" gap={0} styles={{ width: '100%', height: '100%' }}>
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
      <Flex
        direction={layoutDirection}
        gap={layoutGap}
        styles={{ flex: 1, padding: grid }}
      >
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
              {_.map(items, (item, dataIndex) => (
                <Flex
                  key={dataIndex}
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
                    fontSize: '0.8em',
                    visibility: hideNames[name]
                      ? 'hidden'
                      : valueFloat
                      ? 'hidden'
                      : 'unset',
                    display: block ? 'unset' : 'none',
                  }}
                >
                  {_.isFunction(valueFormatter)
                    ? valueFormatter({ ...item, ...labels[dataIndex] })
                    : item.value}
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
              {_.map(items, ({ name, value, max, unit, color }, dataIndex) => {
                const clickDisabled = !!disabledBar[name]

                return [name, !showLegend].some(Boolean) ? (
                  <Flex
                    key={dataIndex}
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
                      cursor: clickDisabled ? 'default' : 'pointer',
                      ...barStyle,
                    }}
                    title={value}
                    onClick={() =>
                      clickDisabled ? () => {} : onBarClick(dataIndex, index)
                    }
                  >
                    <Flex.Item
                      styles={{
                        [direction === 'row' ? 'height' : 'width']:
                          value && !isNaN(value)
                            ? getBarHeight(
                                Math.abs(value),
                                Math.abs(max) || maxValue,
                                minBar,
                              )
                            : minBar,
                        [direction === 'row' ? 'width' : 'height']: '100%',
                        backgroundColor:
                          color ??
                          colors[getColorIndex(name)] ??
                          colors[dataIndex],
                        borderRadius: radiusMap[to],
                        transition,
                        position: valueFloat ? 'relative' : 'unset',
                      }}
                    >
                      {valueFloat && (
                        <View
                          styles={{
                            transition,
                            fontSize: '0.8em',
                            position: 'absolute',
                            zIndex: 10,
                            visibility: hideNames[name] ? 'hidden' : 'unset',
                            ...valueTranslateMap[to],
                          }}
                        >
                          {_.isFunction(valueFormatter)
                            ? valueFormatter({
                                name,
                                value,
                                ...labels[dataIndex],
                                unit,
                              })
                            : value}
                        </View>
                      )}
                    </Flex.Item>
                  </Flex>
                ) : null
              })}
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
