const switchDarkMode = (darkMode) => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.type = 'text/css'

  if (!darkMode) {
    const darkLink = document.getElementById('dark')
    darkLink?.remove()
  } else {
    if (document.getElementById('dark')) return

    link.id = 'dark'
    link.href = '/static/antd.dark.min.css'
    document.body.appendChild(link)
  }
}

export default switchDarkMode
