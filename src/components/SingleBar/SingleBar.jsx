import React from 'react'

import { Flex, View } from '@jinxyang/seal-react'

const positions = {
  top: {
    top: '-1.2em',
    left: '50%',
    transform: 'translate(-50%, 0)',
  },
  center: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  bottom: {
    left: '50%',
    bottom: '0px',
    transform: 'translate(-50%, 0)',
  },
}

const getPosition = (position) => {
  return {
    position: 'absolute',
    margin: 0,
    fontSize: '1.2em',
    fontWeight: 'bold',
    lineHeight: 1,
    fontFamily: 'digital, sans-serif',
    ...positions[position],
  }
}

const SingleBar = ({ position = 'center', height, value, unit, color }) => {
  return (
    <View
      styles={{
        position: 'relative',
        height: `calc(${height || '100%'} - 1.3em)`,
        width: '100%',
        border: '4px solid ' + color,
        background: color,
        borderRadius: ['4px', '4px', 0, 0],
      }}
    >
      <Flex gap={0} cross="baseline" styles={getPosition(position)}>
        <Flex.Item>{value}</Flex.Item>
        <Flex.Item styles={{ fontSize: '0.6em', fontFamily: 'sans-serif' }}>
          {unit}
        </Flex.Item>
      </Flex>
    </View>
  )
}
export default SingleBar
