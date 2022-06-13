import React from 'react'
import { Input } from 'antd'
import { FilterOutlined } from '@ant-design/icons'

const Search = ({ onSearch = () => {} }) => {
  const [search, setSearch] = React.useState('')

  const handleSearch = React.useCallback((e) => {
    const value = e.target.value
    setSearch(value)
    onSearch(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Input
      allowClear
      size="small"
      placeholder="搜索"
      value={search}
      prefix={<FilterOutlined />}
      onChange={handleSearch}
    />
  )
}

export default Search
