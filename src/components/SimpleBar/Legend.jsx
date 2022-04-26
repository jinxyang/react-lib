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
    <Flex wrap="wrap" gap={0.5}>
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
              width: '1.6em',
              height: '0.8em',
              backgroundColor: colors[index],
              borderRadius: '2px',
            }}
          />
          <View
            styles={{
              whiteSpace: 'nowrap',
              fontSize: '0.8em',
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
