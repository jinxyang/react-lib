const joinPath = (...paths) => {
  return paths
    .reduce((a, path) => `${a}${a ? '/' : ''}${path}`, '')
    .replace(/(?<!:)\/\/?\//g, '/')
}

export default joinPath
