const defaultOptions = {
  formatter: (v) => v,
}
const normalizer = (array, prop = 'id', customOptions) => {
  const { formatter } = { ...defaultOptions, ...customOptions }
  return array.reduce((map, item) => {
    const newItem = formatter(item, map)
    return {
      ...map,
      ...(newItem && { [item[prop]]: newItem }),
    }
  }, {})
}

export default normalizer
