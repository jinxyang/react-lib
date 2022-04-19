import React from 'react'
import _ from 'lodash'

const useNodeSize = () => {
  const ref = React.useRef(null)
  const [size, setSize] = React.useState({
    width: 0,
    height: 0,
    minSize: 0,
    maxSize: 0,
  })

  const handleResize = _.debounce((entries) => {
    const { width, height } = entries[0].contentRect
    const minSize = _.min([width, height])
    const maxSize = _.max([width, height])
    setSize({ width, height, minSize, maxSize })
  }, 300)

  React.useEffect(() => {
    let node = null

    const observer = new ResizeObserver(handleResize)

    if (ref.current) {
      node = ref.current
      observer.observe(node)
    }

    return () => {
      observer.unobserve(node)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [size, ref]
}

export default useNodeSize
