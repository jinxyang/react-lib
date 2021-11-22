const fileSelector = (accept = '', options = {}) => {
  return new Promise((resolve) => {
    const input = document.createElement('input')
    Object.keys(options).forEach((prop) => {
      input[prop] = options[prop]
    })
    input.hidden = true
    input.type = 'file'
    input.accept = accept
    input.onclick = (e) => {
      e.target.value = ''
    }
    input.onchange = async (e) => {
      resolve(options.multiple ? Array.from(e.target.files) : e.target.files[0])
      input.remove()
    }
    input.click()
  })
}

export default fileSelector
