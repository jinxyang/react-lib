const normalizer = (array, prop, formatter = (a) => a) => {
  const result = {}
  array.forEach((item) => {
    result[formatter(item[prop])] = item
  })
  return result
}

export default normalizer
