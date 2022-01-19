const downloader = (url = '', filename = '') => {
  if (!url) return
  const a = document.createElement('a')
  a.href = url
  filename && a.setAttribute('download', filename)
  a.click()
}

export default downloader
