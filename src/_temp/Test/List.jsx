import React, { useState, useRef, useEffect } from 'react'
import { Space, Button, message } from 'antd'

import { ProForm } from 'components'
// Input,
// InputNumber,
// Select,
// DatePicker,
// TimePicker,
// Radio,
// Checkbox,
const formList = [
  {
    type: 'Switch',
    label: '纵向',
    key: 'column',
  },
  {
    type: 'Switch',
    label: '行内',
    key: 'inline',
  },
  {
    type: 'Input',
    label: '姓名',
    desc: '真实姓名',
    key: 'name',
    rules: [{ type: 'string', required: true, message: '请填写姓名' }],
  },
  {
    type: 'DatePicker',
    label: '生日',
    key: 'birthday',
    rules: [{ required: true, message: '请填写年龄' }],
  },
  {
    type: 'Select',
    label: '职业',
    key: 'job',
    rules: [{ required: true, message: '请选择职业' }],
    props: {
      options: [
        { label: '前端', value: 'fe' },
        { label: '后端', value: 'be' },
      ],
    },
  },
  {
    type: 'InputNumber',
    label: '工作年限',
    key: 'job_years',
    rules: [{ required: true, message: '请填写工作年限' }],
  },
  {
    type: 'Radio',
    label: '婚姻状态',
    key: 'married',
    props: {
      options: [
        { label: '未婚', value: 0 },
        { label: '已婚', value: 1 },
      ],
    },
  },
  {
    type: 'InputNumber',
    label: '子女',
    key: 'children',
    hide: (values) => !values.married,
  },
  {
    type: 'Checkbox',
    label: '爱好',
    key: 'hobbies',
    props: {
      options: [
        { label: '看电影', value: 'movies' },
        { label: '看剧', value: 'tvs' },
        { label: '跑步', value: 'running' },
        { label: '健身', value: 'gym' },
        { label: '看书', value: 'books' },
      ],
    },
  },
  {
    type: 'TimePicker',
    label: '起床时间',
    desc: '工作日的起床时间',
    key: 'wake',
  },
]

const List = () => {
  const form = useRef({})
  const [values, setValues] = useState({})

  useEffect(() => {
    console.log('List values: ', values)
  }, [values])

  const handleSubmit = async () => {
    const errors = await form.current.validate()
    errors && message.error(errors[0].message)
  }

  return (
    <ProForm
      ref={form}
      style={{ width: '50%' }}
      list={formList}
      defaultValues={{ column: true, inline: true }}
      column={!!values.column}
      inline={!!values.inline}
      onChange={setValues}
    >
      <Space>
        <Button onClick={handleSubmit}>查询</Button>
        <Button onClick={() => form.current.reset()}>重置</Button>
        <Button onClick={() => form.current.clear()}>清空</Button>
      </Space>
    </ProForm>
  )
}

export default List
