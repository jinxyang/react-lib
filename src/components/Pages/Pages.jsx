import React from 'react'
import { Routes, Route } from 'react-router-dom'
import _ from 'lodash'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

import useLocation from '../../hooks/useLocation'
import Skeleton from '../Skeleton'
import NotFound from '../NotFound'

const createComponent = (Component, props = {}) =>
  Component ? <Component {...props} /> : null

const renderRoutes = (routes = [], filter = () => true) =>
  routes.filter(filter).map(({ path, component, to, replace, children }) => (
    <Route
      key={path}
      path={path}
      element={createComponent(
        component,
        _.omitBy({ to, replace }, (v) => v == null),
      )}
    >
      {!!children?.length && renderRoutes(children)}
    </Route>
  ))

const Pages = ({
  filter = () => true,
  loading = true,
  routes = [],
  skeletonProps = { height: '400px' },
}) => {
  const location = useLocation()

  return loading ? (
    <Skeleton {...skeletonProps} />
  ) : (
    <React.Suspense fallback={<Skeleton {...skeletonProps} />}>
      <SwitchTransition>
        <CSSTransition key={location.key} classNames="fade" timeout={400}>
          <Routes location={location}>
            {renderRoutes(routes, filter)}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CSSTransition>
      </SwitchTransition>
    </React.Suspense>
  )
}

export default Pages
