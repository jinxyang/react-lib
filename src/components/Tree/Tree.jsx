import React from 'react'
import { Tree } from 'antd'

const getTreeNode = (list = []) =>
  list.map(({ label, value, props = {}, children }) => (
    <Tree.TreeNode {...props} key={value} value={value} title={label}>
      {children && getTreeNode(children)}
    </Tree.TreeNode>
  ))

const ProTree = ({
  value = '',
  options = [],
  onChange = () => {},
  ...props
}) => {
  return (
    <Tree
      {...props}
      checkedKeys={value}
      selectedKeys={value}
      onSelect={onChange}
      onCheck={onChange}
    >
      {getTreeNode(options)}
    </Tree>
  )
}

export default ProTree
