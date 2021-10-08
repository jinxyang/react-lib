import React from 'react'
import styled from 'styled-components'

const StyledPagination = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
`

const Pagination = ({
  current = 1,
  pageSize = 10,
  total = 0,
  onChange = () => {},
  onPageSizeChange = () => {},
}) => {
  return <StyledPagination></StyledPagination>
}

export default Pagination
