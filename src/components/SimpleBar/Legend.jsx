import React from 'react'
import _ from 'lodash'

import { Flex, View } from '@jinxyang/seal-react'

const Legend = ({
  names = [],
  hideNames = {},
  colors = [],
  onClick = () => {},
}) => {
  return (
    <Flex wrap="wrap">
      {_.map(names, (name, index) => (
        <Flex
          key={name}
          cross="center"
          gap={0.5}
          onClick={() => onClick(name)}
          styles={{
            filter: hideNames[name] && 'grayscale(1)',
            opacity: hideNames[name] && 0.5,
            cursor: 'pointer',
            userSelect: 'none',
            transition: 'all .2s ease',
          }}
        >
          <View
            styles={{
              width: 24,
              height: 12,
              backgroundColor: colors[index],
              borderRadius: '2px',
            }}
          />
          <View
            styles={{
              whiteSpace: 'nowrap',
            }}
          >
            {name}
          </View>
        </Flex>
      ))}
    </Flex>
  )
}

export default Legend
