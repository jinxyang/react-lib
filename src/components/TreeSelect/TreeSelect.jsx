import React from 'react'
import { TreeSelect } from 'antd'

const getTreeNode = (list = []) =>
  list.map(({ label, value, props = {}, children }) => (
    <TreeSelect.TreeNode {...props} key={value} value={value} title={label}>
      {children && getTreeNode(children)}
    </TreeSelect.TreeNode>
  ))

const ProTreeSelect = ({
  value = '',
  options = [],
  onChange = () => {},
  ...props
}) => {
  return (
    <TreeSelect {...props} value={value} onChange={onChange}>
      {getTreeNode(options)}
    </TreeSelect>
  )
}

export default ProTreeSelect
