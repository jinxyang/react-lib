const toTree = (
  list,
  parentKey,
  options = { formatter: (v) => v },
  value = '',
) => {
  return list
    .map(options.formatter)
    .filter((item) => item && item[parentKey] === value)
    .map(({ children, ...item }) => {
      const childList = toTree(list, parentKey, options, item.id)
      return {
        ...item,
        ...(childList.length ? { children: childList } : {}),
      }
    })
}

export default toTree
