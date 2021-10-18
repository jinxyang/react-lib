import React from 'react'
import { Button, Space } from 'antd'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons'

import App from '../App'
import Container from '../Container'
import Filter from '../Filter'
import Table from '../Table'
import useFetch from '../../hooks/useFetch'

const ProTable = ({
  service = () => {},
  list = [],
  filters = [],
  columns = [],
  extraColumns = [],
  queriesFormatter = (v) => v,
  onAction = () => {},
  onChange = () => {},
  onSelect = null,
  vertical = false,
  noPagination = false,
  children,
}) => {
  const [{ data, loading }, getList] = useFetch(
    service,
    ({ code, data }) => !code && onChange(data.list),
  )
  const [queries, setQueries] = React.useState({})

  const handleClear = () => {
    setQueries({})
    getList(queriesFormatter({}))
  }

  React.useEffect(() => {
    getList(queriesFormatter({}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <App>
      <Container column={true}>
        <Container.Item>
          <Filter fields={filters} values={queries} onChange={setQueries}>
            <Space>
              <Button
                htmlType="submit"
                type="primary"
                icon={<SearchOutlined />}
                loading={loading}
                onClick={() => getList(queriesFormatter(queries))}
              >
                查询
              </Button>
              <Button
                type="default"
                icon={<ReloadOutlined />}
                disabled={loading}
                onClick={handleClear}
              >
                重置
              </Button>
              {children}
            </Space>
          </Filter>
        </Container.Item>
        <Container.Item>
          <Table
            columns={columns}
            extraColumns={extraColumns}
            list={list}
            vertical={vertical}
            loading={loading}
            background={true}
            pagination={!noPagination && data.pagination}
            onPageChange={(current, pageSize) => {
              getList(queriesFormatter({ current, pageSize, ...queries }))
            }}
            onSelect={onSelect}
            onAction={onAction}
          />
        </Container.Item>
      </Container>
    </App>
  )
}

export default ProTable
