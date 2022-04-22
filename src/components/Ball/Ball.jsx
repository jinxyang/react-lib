import React from 'react'
import _ from 'lodash'

import useNodeSize from '../../hooks/useNodeSize'
import { Flex, View, Title } from '@jinxyang/seal-react'

import Circle from '../Circle'

const Ball = ({
  size: customSize = null,
  circles = [],
  label,
  value,
  unit,
}) => {
  const [{ minSize }, setNode] = useNodeSize()

  const size = React.useMemo(() => {
    return customSize ?? minSize
  }, [customSize, minSize])

  const [labelText, labelStyle] = React.useMemo(() => {
    return _.isArray(label) ? label : [label, {}]
  }, [label])

  const [valueText, valueStyle] = React.useMemo(() => {
    return _.isArray(value) ? value : [value, {}]
  }, [value])

  const [unitText, unitStyle] = React.useMemo(() => {
    return _.isArray(unit) ? unit : [unit, {}]
  }, [unit])

  return (
    <View
      ref={setNode}
      main="center"
      cross="center"
      styles={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <View
        styles={{
          position: 'relative',
          width: size,
          height: size,
        }}
      >
        {_.map(circles, (props, index) => (
          <Circle key={index} {...props} />
        ))}
        <Flex
          direction="column"
          main="center"
          cross="center"
          gap={0.2}
          styles={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            padding: 1,
            color: '#fff',
            fontSize: size / 12 + 'px',
          }}
        >
          <Title as="h3" styles={{ fontSize: '0.8em', ...labelStyle }}>
            {labelText}
          </Title>
          <View
            styles={{
              paddingTop: 0.5,
              fontFamily: 'digital',
              fontSize: '3.2em',
              lineHeight: 1,
              ...valueStyle,
            }}
          >
            {valueText}
          </View>
          <View styles={unitStyle}>{unitText}</View>
        </Flex>
      </View>
    </View>
  )
}

export default Ball
