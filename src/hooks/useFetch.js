import { useRef, useState, useCallback, useEffect } from 'react'
import { stringify, parse } from 'query-string'

import { api as allApi } from 'config'
import { useAppContext } from 'contexts'
import useMessage from '../hooks/useMessage'

const apiType = process.env.API
const api = apiType ? allApi[apiType] : allApi

const defaultState = {
  loading: false,
  data: {},
  code: 0,
  message: '',
}

const sleep = (delay = 0) =>
  delay
    ? new Promise((resolve) => setTimeout(resolve, delay))
    : Promise.resolve()

const useFetch = (service = () => {}, callback = () => {}, delay = 0) => {
  const controller = useRef(null)
  const [state, setState] = useState(defaultState)
  const { state: appState, actions } = useAppContext()
  const message = useMessage()

  const abort = useCallback(() => controller.current?.abort(), [])

  const start = useCallback(
    async (...payload) => {
      if (state.loading) return state

      controller.current = new AbortController()

      setState({ ...state, loading: true, code: 0 })

      const {
        url = '',
        method = 'GET',
        params = {},
        headers,
        data = {},
        transformResponse = async (response) => await response.json(),
        ...others
      } = service(...payload)

      const newHeaders = new Headers(
        headers || {
          'Content-Type': 'application/json; charset=utf-8',
        },
      )
      const token = localStorage.getItem('token')
      token && newHeaders.append('Authorization', token)
      appState?.from && newHeaders.append('share', appState?.from)

      const requestInitial = {
        ...others,
        method,
        headers: newHeaders,
        signal: controller.current.signal,
      }
      if (method.toUpperCase() !== 'GET') {
        requestInitial.body =
          data instanceof FormData ? data : JSON.stringify(data)
      }
      const [apiType, apiPath] = url.includes('::')
        ? url.split('::')
        : [null, url]
      const [path, queries = ''] = apiPath.split('?')
      const newRequest = new Request(
        api[apiType || 'default'] +
          path +
          `?${stringify({ ...parse(queries), ...params })}`,
        requestInitial,
      )

      await sleep(typeof callback === 'number' ? callback : delay)
      try {
        const fetchResponse = await fetch(newRequest)

        const response = await transformResponse(fetchResponse)

        const httpStatus = fetchResponse.status
        const code =
          httpStatus >= 200 && httpStatus < 300 ? response.code : httpStatus

        if (code === 401) {
          actions?.logout()
        }

        const newState = {
          loading: false,
          data: code ? state.data : response.data,
          code,
          message: response.message || fetchResponse.statusText,
        }

        if (code) {
          message.error(newState.message)
        }

        typeof callback === 'function' && callback(newState)
        setState(newState)
        return newState
      } catch (e) {
        const newState = {
          loading: false,
          data: { ...state.data },
          code: e.code || 1,
          message: e.message,
        }
        setState(newState)
        return newState
      }
    },
    [state, service, appState?.from, callback, delay, actions, message],
  )

  useEffect(() => {
    return () => {
      abort()
    }
  }, [abort])

  return [state, start, abort]
}

export default useFetch
