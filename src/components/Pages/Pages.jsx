import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Skeleton from '../Skeleton'
import NotFound from '../NotFound'

const createComponent = (Component) => (Component ? <Component /> : null)

const renderRoutes = (routes = [], filter = () => true) =>
  routes.filter(filter).map(({ path, component, children }) => (
    <Route key={path} path={path} element={createComponent(component)}>
      {!!children?.length && renderRoutes(children)}
    </Route>
  ))

const Pages = ({
  filter = () => true,
  loading = true,
  routes = [],
  skeletonProps = { height: '400px' },
}) => {
  return React.useMemo(
    () =>
      loading ? (
        <Skeleton {...skeletonProps} />
      ) : (
        <React.Suspense fallback={<Skeleton {...skeletonProps} />}>
          <Routes>
            {renderRoutes(routes, filter)}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.Suspense>
      ),
    [filter, loading, routes, skeletonProps],
  )
}

export default Pages
