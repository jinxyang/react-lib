const defaultOptions = {
  idKey: 'id',
  childrenKey: 'children',
  formatter: (v) => v,
  sorter: () => -1,
}

const toTree = (list = [], parentKey, customOptions = {}, value = '') => {
  const options = { ...defaultOptions, ...customOptions }
  return list
    .filter((item) => item && item[parentKey] === value)
    .sort(options.sorter)
    .map((item, index) => {
      const childList = toTree(list, parentKey, options, item[options.idKey])
      return {
        ...options.formatter(item, index),
        ...(childList.length ? { [options.childrenKey]: childList } : {}),
      }
    })
}

export default toTree
