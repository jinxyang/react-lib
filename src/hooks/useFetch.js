import React from 'react'
import { stringify, parse } from 'query-string'

import { useConfig } from '../components/Provider'
import useMessage from '../hooks/useMessage'
import sleep from '../utils/sleep'

const defaultState = {
  loading: false,
  loaded: false,
  data: {},
  code: 0,
  message: '',
}

const defaultHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
}

const useFetch = (service = () => {}, callback = () => {}, delay = 0) => {
  const controller = React.useRef(null)
  const [state, setState] = React.useState({ ...defaultState })
  const { fetchOptions } = useConfig()
  const message = useMessage()

  const utils = React.useMemo(() => {
    return {
      state: { ...defaultState },
      message,
    }
  }, [message])

  const transformRequest = React.useCallback(
    (input, init) => {
      return (
        fetchOptions.transformRequest?.(input, init, utils) ?? [input, init]
      )
    },
    [fetchOptions, utils],
  )

  const transformResponse = React.useCallback(
    async (response, ...args) => {
      return (
        (await fetchOptions.transformResponse?.(response, ...args)) ??
        (await response.json())
      )
    },
    [fetchOptions],
  )

  const start = React.useCallback(
    async (...payload) => {
      if (state.loading) return state

      controller.current = new AbortController()
      setState((state) => ({
        ...defaultState,
        loading: true,
        data: state.data,
      }))

      const {
        url = '',
        method = 'GET',
        headers,
        params = {},
        data = {},
        transformRequest: customTransformRequest = (input, init) => [
          input,
          init,
        ],
        transformResponse: customTransformResponse,
        ...others
      } = service(...payload)

      const [path, inlineQueries = ''] = url.split('?')
      const queries = stringify({ ...params, ...parse(inlineQueries) })
      const requestInput = path + (queries ? `?${queries}` : '')
      const requestInit = {
        ...others,
        method,
        headers: headers || { ...defaultHeaders },
        signal: controller.current?.signal,
      }

      if (method.toUpperCase() !== 'GET') {
        requestInit.body =
          data instanceof FormData ? data : JSON.stringify(data)
      }

      const newRequest = new Request(
        ...customTransformRequest(
          ...transformRequest(requestInput, requestInit, utils),
        ),
      )

      await sleep(typeof callback === 'number' ? callback : delay)

      try {
        const response = await fetch(newRequest)
        const customResult = await customTransformResponse?.(response, utils)
        const { code, data, message } = await transformResponse(
          response,
          utils,
          customResult,
        )

        const newState = {
          loading: false,
          loaded: true,
          data: (code ? state.data : data) ?? {},
          code,
          message: message || response.statusText,
        }

        typeof callback === 'function' && callback(newState)
        setState(newState)
        return newState
      } catch (e) {
        const newState = {
          loading: false,
          loaded: true,
          data: { ...state.data },
          code: e.code || 1,
          message: e.message,
        }
        setState(newState)
        return newState
      }
    },
    [
      callback,
      delay,
      service,
      state,
      transformRequest,
      transformResponse,
      utils,
    ],
  )

  React.useEffect(() => {
    return () => {
      controller.current?.abort?.()
    }
  }, [])

  return [state, start, controller.current?.abort ?? (() => {})]
}

export default useFetch
