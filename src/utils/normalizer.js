const normalizer = (array, prop, options = {}) => {
  return array.reduce((map, item) => {
    if (!options?.formatter) {
      return { ...map, [item[prop]]: item }
    }

    const newItem = options?.formatter?.(item)
    return newItem ? { ...map, [options.prop || item[prop]]: newItem } : map
  }, {})
}

export default normalizer
