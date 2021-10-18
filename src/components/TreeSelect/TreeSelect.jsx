import React from 'react'
import { TreeSelect } from 'antd'

const getTreeNode = (list = []) =>
  list.map(({ label, value, children }) => (
    <TreeSelect.TreeNode key={value} value={value} title={label}>
      {children && getTreeNode(children)}
    </TreeSelect.TreeNode>
  ))

const ProTreeSelect = ({
  value = [],
  onChange = () => {},
  options = [],
  ...props
}) => {
  return (
    <TreeSelect
      value={value[0]}
      {...props}
      onChange={(...value) => onChange(value)}
    >
      {getTreeNode(options)}
    </TreeSelect>
  )
}

export default ProTreeSelect
