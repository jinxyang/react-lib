export default {
  id: {
    type: 'string',
    label: 'ID',
  },
  username: {
    type: 'string',
    label: '用户名',
  },
  password: {
    type: 'string',
    label: '密码',
  },
  captcha: {
    type: 'string',
    label: '验证码',
  },
  captchaId: {
    type: 'Captcha',
    label: '验证码',
  },
  name: {
    type: 'string',
    label: '名称',
  },
  icon: {
    type: 'string',
    label: '图标',
  },
  order: {
    type: 'number',
    label: '排序',
  },
  state: {
    type: 'boolean',
    label: '状态',
  },
  remark: {
    type: 'text',
    label: '备注',
  },
  startTime: {
    type: 'date',
    label: '开始时间',
  },
  endTime: {
    type: 'date',
    label: '结束时间',
  },
  createdAt: {
    type: 'date',
    label: '创建时间',
  },
  updatedAt: {
    type: 'date',
    label: '更新时间',
  },
  deletedAt: {
    type: 'date',
    label: '删除时间',
  },
}
