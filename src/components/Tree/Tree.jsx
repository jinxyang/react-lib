import React from 'react'
import { Tree } from 'antd'

const getTreeNode = (list = []) =>
  list.map(({ label, value, props = {}, children }) => (
    <Tree.TreeNode {...props} key={value} title={label}>
      {children && getTreeNode(children)}
    </Tree.TreeNode>
  ))

const ProTree = ({
  value = '',
  options = [],
  onChange = () => {},
  checkable = false,
  labelInValue = false,
  ...props
}) => {
  const restProps = checkable
    ? {
        checkedKeys: value,
        onCheck: ({ checked }, { checkedNodes }) => {
          onChange(labelInValue ? checkedNodes : checked)
        },
      }
    : { selectedKeys: value, onSelect: onChange }
  return (
    <Tree {...props} {...restProps} checkable={checkable}>
      {getTreeNode(options)}
    </Tree>
  )
}

export default ProTree
