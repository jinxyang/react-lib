import React from 'react'
import { withRouter, matchPath, generatePath } from 'react-router-dom'

import Breadcrumb from '../Breadcrumb'

const getRelationList = (relations = {}, child, list = [child]) => {
  const parent = relations[child]
  if (!parent) return [...list].reverse()
  return getRelationList(relations, parent, [...list, parent])
}

const BreadcrumbWithRoute = ({
  history = {},
  location = {},
  match = {},
  relations = {},
  map = {},
  children,
}) => {
  const routes = React.useMemo(() => Object.values(map), [map])
  const currentRoute = React.useMemo(
    () =>
      routes.find(({ path }) =>
        matchPath(location.pathname, { path, exact: true }),
      ),
    [location.pathname, routes],
  )

  const list = React.useMemo(
    () => (currentRoute ? getRelationList(relations, currentRoute.name) : []),
    [currentRoute, relations],
  )

  const handleItemClick = (key) => {
    const route = map[key]
    try {
      const path = generatePath(route.path, match.params)
      history.push(path)
    } catch (e) {
      console.error(e)
    }
  }
  if (!list.length) return null
  return (
    <Breadcrumb>
      {list.map((key) => (
        <Breadcrumb.Item
          disabled={!map[key].path}
          key={key}
          onClick={() => handleItemClick(key)}
        >
          {map[key].title}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}

export default withRouter(BreadcrumbWithRoute)
