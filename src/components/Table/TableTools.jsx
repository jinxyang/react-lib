import React from 'react'
import _ from 'lodash'

import { Flex } from '@jinxyang/seal-react'

import { Export, Search } from './tools'

const TableTools = ({
  name = '',
  list = [],
  tools = {},
  columns = [],
  renders = {},
  onSearch = () => {},
}) => {
  const toolList = React.useMemo(() => {
    return _.keys(tools).filter((key) => !!tools[key])
  }, [tools])

  return (
    <Flex main="flex-end" cross="center">
      {_.includes(toolList, 'search') && (
        <Flex.Item>
          <Search onSearch={onSearch} />
        </Flex.Item>
      )}
      {_.includes(toolList, 'export') && (
        <Export name={name} list={list} columns={columns} renders={renders} />
      )}
    </Flex>
  )
}

export default TableTools
