const groupBy = (array, prop) => {
  return array.reduce((a, item) => {
    const value = item[prop]
    const { [value]: group = [] } = a
    return { ...a, [value]: [...group, item] }
  }, {})
}

export default groupBy
