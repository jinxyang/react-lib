import actionRender from './actionRender'

const actionColumn = (list = [], options = {}) => ({
  label: '操作',
  width: 80,
  align: 'center',
  render: actionRender(list, options),
})

export default actionColumn
