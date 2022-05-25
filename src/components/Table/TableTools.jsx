import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

import { Flex } from '@jinxyang/seal-react'

const XLSX = window.XLSX

// const Menus = ({ onClick = () => {} }) => (
//   <Menu>
//     <Menu.Item onClick={() => onClick('excel')}>Excel</Menu.Item>
//   </Menu>
// )

const TableTools = ({ name = '', list = [], columns = [] }) => {
  const handleClick = React.useCallback(() => {
    const json = _.map(list, (item) => {
      return _.reduce(
        columns,
        (result, { label, key }) => {
          const value = _.get(item, key)
          return key == null || value == null
            ? result
            : {
                ...result,
                [label]: value,
              }
        },
        {},
      )
    })

    const sheet = XLSX.utils.json_to_sheet(json)
    const book = XLSX.utils.book_new()

    const cols = _.flow(
      _.mapValues(?, (value, key) => ({ ...value, column: key[0] })),
      _.omitBy(?, ({ column }) => column === '!'),
      _.groupBy(?, 'column'),
      _.toPairs(?),
      _.orderBy(?, ([k]) => k, 'asc'),
      _.map(?, ([__, list]) => ({
        wch: _.max([..._.map(list, ({ v }) => v.length * 3), 10]),
      })),
    )(sheet)
    sheet['!cols'] = cols
    const styledSheet = _.mapValues(sheet, (value, key) =>
      key.indexOf('!') === 0
        ? value
        : {
            ...value,
            t: 's',
          },
    )

    XLSX.utils.book_append_sheet(book, styledSheet)
    XLSX.writeFile(
      book,
      `${name || 'sheet'}_${moment().format('YYYY_MM_DD_HH_mm_ss')}.xlsx`,
    )
  }, [columns, list, name])

  return XLSX ? (
    <Flex main="flex-end" cross="center">
      <Button type="link" icon={<DownloadOutlined />} onClick={handleClick} />
      {/* <Dropdown overlay={<Menus onClick={handleClick} />}>
        <DownloadOutlined style={{ fontSize: '1.2em' }} />
      </Dropdown> */}
    </Flex>
  ) : null
}

export default TableTools
