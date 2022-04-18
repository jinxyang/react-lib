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
const legendMainMap = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
}
const directionMap = {
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

const labelOrderMap = {
  top: 1,
  bottom: -1,
  left: 1,
  right: -1,
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
  title = null,
  value = [],
  to = 'top',
  flex = 1,
  gap = 1,
  legend = 'topCenter',
  colors: customColors = [],
}) => {
  const [hideNames, setHideNames] = React.useState({})

  const names = React.useMemo(() => {
    return _.map(value, 'name')
  }, [value])

  const [legendOrder, legendMain] = React.useMemo(() => {
    const [vertical, horizontal] = _.kebabCase(legend).split('-')
    return [vertical === 'top' ? -1 : 1, legendMainMap[horizontal]]
  }, [legend])

  const direction = React.useMemo(() => {
    return to === 'top' || to === 'bottom' ? 'row' : 'column'
  }, [to])

  const colors = React.useMemo(() => {
    return _.zipWith(defaultColors, customColors, (a, b) => b ?? a)
  }, [customColors])

  const maxValue = React.useMemo(() => {
    return (
      _.flow(
        _.map(?, ({ list }) => _.maxBy(list, 'value')?.value),
        _.max(?),
      )(value) * 1.1
    )
  }, [value])

  const padding = React.useMemo(() => {
    return direction === 'row' ? [0, 1] : [1, 0]
  }, [direction])

  const data = React.useMemo(() => {
    return _.flow(_.map(?, 'list'), (value) => _.zip(...value))(value)
  }, [value])

  const handleLegendClick = React.useCallback((name) => {
    setHideNames((names) => ({
      ...names,
      [name]: !names[name],
    }))
  }, [])

  if (!data.length) {
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
    <Flex direction="column" styles={{ width: '100%', height: '100%' }}>
      {title &&
        (React.isValidElement(title) ? (
          title
        ) : (
          <Flex.Item order={-2} styles={{ fontSize: 1.1, fontWeight: 'bold' }}>
            {title}
          </Flex.Item>
        ))}
      {legend && (
        <Flex main={legendMain} styles={{ order: legendOrder }}>
          <Legend
            names={names}
            hideNames={hideNames}
            colors={colors}
            onClick={handleLegendClick}
          />
        </Flex>
      )}
      <Flex
        direction={direction === 'row' ? 'column' : 'row'}
        gap={0.25}
        styles={{ flex: 1 }}
      >
        <Flex
          direction={direction}
          gap={gap}
          styles={{
            flex: 1,
            padding,
            border: 0,
            [borderMap[to]]: 1,
            borderColor: 'transparent[5]',
          }}
        >
          {_.map(data, (items, dataIndex) => (
            <Flex
              key={dataIndex}
              direction={direction}
              main="center"
              gap="2px"
              styles={{ flex: 1, transition }}
            >
              {_.map(items, ({ value: currentValue }, index) => (
                <Flex
                  key={index}
                  gap={0.5}
                  direction={directionMap[to]}
                  cross="center"
                  styles={{
                    flex: hideNames[value[index].name] ? 0 : flex,
                    width: hideNames[value[index].name] ? 0 : 'auto',
                    overflow: 'hidden',
                    transition,
                  }}
                >
                  <Flex.Item
                    styles={{
                      [direction === 'row' ? 'height' : 'width']:
                        (currentValue / maxValue) * 100 + '%',
                      [direction === 'row' ? 'width' : 'height']: '100%',
                      backgroundColor: colors[index],
                      borderRadius: radiusMap[to],
                    }}
                  />
                  <View styles={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
                    {currentValue}
                  </View>
                </Flex>
              ))}
            </Flex>
          ))}
        </Flex>
        <Flex
          direction={direction}
          styles={{
            flex: '0 0 auto',
            padding,
            order: labelOrderMap[to],
          }}
        >
          {_.map(data, (items, index) => (
            <Flex
              key={index}
              as="span"
              main="center"
              cross="center"
              styles={{
                flex: 1,
                overflow: 'hidden',
                whiteSpace: 'pre-line',
              }}
            >
              {items[0].label}
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Bar
