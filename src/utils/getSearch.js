const getSearch = (search, separator = '&') => {
  return (typeof search === 'string' ? search : window.location.search)
    .replace('?', '')
    .split(separator)
    .filter((string) => {
      return !!string && string.includes('=')
    })
    .reduce((a, string) => {
      const [key, value] = string.split('=')
      return {
        ...a,
        [key]: value ?? '',
      }
    }, {})
}

export default getSearch
