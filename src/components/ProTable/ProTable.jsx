import React from 'react'
import _ from 'lodash'
import { Button } from 'antd'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons'

import App from '../App'
import Container from '../Container'
import Filter from '../Filter'
import Table from '../Table'
import useFetch from '../../hooks/useFetch'
import useLocation from '../../hooks/useLocation'

const ProTable = (
  {
    sticky = false,
    stickyStyle = {},
    service = () => {},
    list = [],
    filters = [],
    filterComponents = {},
    columns = [],
    extraColumns = [],
    defaultQueries = {},
    queriesFormatter = (v) => v,
    onAction = () => {},
    onChange = () => {},
    utils = {},
    onSelect = null,
    disabledSelection = () => false,
    vertical = false,
    noPagination = false,
    showMiniPagination = true,
    enableExpand = true,
    expandAll = false,
    children,
    effect,
    align,
    hollow = false,
    sort = null,
    name = '',
    tools = { export: ['sheet'] },
  },
  ref,
) => {
  const location = useLocation()
  const [{ data, loading }, getList] = useFetch(
    service,
    ({ code, data }) => !code && onChange(data.list, data.extra ?? {}),
  )
  const [queries, setQueries] = React.useState(defaultQueries)

  const handleClear = () => {
    setQueries({})
    getList(queriesFormatter({}))
  }

  const mergedColumns = React.useMemo(() => {
    return _.orderBy([...columns, ...(data.columns ?? [])], 'order', 'desc')
  }, [columns, data.columns])

  React.useImperativeHandle(
    ref,
    () => ({
      reload: (queriesOrFormatter) => {
        const newQueries = queriesOrFormatter
          ? typeof queriesOrFormatter === 'function'
            ? queriesOrFormatter(queries)
            : queriesOrFormatter
          : queriesFormatter(queries)
        getList(newQueries)
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [queries],
  )

  React.useEffect(() => {
    // TODO: 带参
    console.log('TODO: ProTable', location)
    getList(queriesFormatter(queries))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effect])

  const [Wrapper, wrapperProps] = React.useMemo(() => {
    return hollow ? [React.Fragment, {}] : [App, { fill: false }]
  }, [hollow])

  return (
    <Wrapper {...wrapperProps}>
      <Container column={true}>
        {(!!filters.length || children) && (
          <Container.Item>
            <Filter
              components={filterComponents}
              fields={filters}
              values={queries}
              onChange={setQueries}
            >
              <Container>
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
              </Container>
            </Filter>
          </Container.Item>
        )}
        <Container.Item>
          <Table
            sticky={sticky}
            stickyStyle={stickyStyle}
            name={name || data.name}
            tools={tools}
            align={align}
            sort={sort}
            columns={mergedColumns}
            extraColumns={extraColumns}
            list={list}
            vertical={vertical}
            loading={loading}
            background={true}
            pagination={!noPagination && data.pagination}
            showMiniPagination={showMiniPagination}
            utils={utils}
            enableExpand={enableExpand}
            expandAll={enableExpand}
            onListChange={onChange}
            onPageChange={(current, pageSize) => {
              getList(queriesFormatter({ current, pageSize, ...queries }))
            }}
            onSelect={onSelect}
            disabledSelection={disabledSelection}
            onAction={onAction}
          />
        </Container.Item>
      </Container>
    </Wrapper>
  )
}

export default React.forwardRef(ProTable)
