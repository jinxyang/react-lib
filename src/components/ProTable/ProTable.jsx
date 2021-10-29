import React from 'react'
import { Button, Space } from 'antd'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons'

import App from '../App'
import Container from '../Container'
import Filter from '../Filter'
import Table from '../Table'
import useFetch from '../../hooks/useFetch'

const ProTable = (
  {
    service = () => {},
    list = [],
    filters = [],
    columns = [],
    extraColumns = [],
    defaultQueries = {},
    queriesFormatter = (v) => v,
    onAction = () => {},
    onChange = () => {},
    utils = {},
    onSelect = null,
    vertical = false,
    noPagination = false,
    children,
  },
  ref,
) => {
  const [{ data, loading }, getList] = useFetch(
    service,
    ({ code, data }) => !code && onChange(data.list),
  )
  const [queries, setQueries] = React.useState(defaultQueries)

  const handleClear = () => {
    setQueries({})
    getList(queriesFormatter({}))
  }

  React.useImperativeHandle(
    ref,
    () => ({
      reload: () => {
        getList(queriesFormatter(queries))
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [queries],
  )

  React.useEffect(() => {
    getList(queriesFormatter({}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <App fill={false}>
      <Container column={true}>
        {(!!filters.length || children) && (
          <Container.Item>
            <Filter fields={filters} values={queries} onChange={setQueries}>
              <Space>
                {!!filters.length && (
                  <Button
                    htmlType="submit"
                    type="primary"
                    icon={<SearchOutlined />}
                    loading={loading}
                    onClick={() => getList(queriesFormatter(queries))}
                  >
                    查询
                  </Button>
                )}
                {!!filters.length && (
                  <Button
                    type="default"
                    icon={<ReloadOutlined />}
                    disabled={loading}
                    onClick={handleClear}
                  >
                    重置
                  </Button>
                )}
                {children}
              </Space>
            </Filter>
          </Container.Item>
        )}
        <Container.Item>
          <Table
            columns={columns}
            extraColumns={extraColumns}
            list={list}
            vertical={vertical}
            loading={loading}
            background={true}
            pagination={!noPagination && data.pagination}
            utils={utils}
            onListChange={onChange}
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

export default React.forwardRef(ProTable)
