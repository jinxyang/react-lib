const normalizer = (array, prop, options = {}) => {
  return array.reduce((map, item) => {
    if (!options?.formatter) {
      return { ...map, [item[prop]]: item }
    }

    const newItem = options?.formatter?.(item)

    return newItem ? { ...map, [newItem[prop]]: newItem } : map
  }, {})
}

export default normalizer
