import styled from 'styled-components'

export const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

export const StyledItem = styled.li`
  & + & {
    margin-top: ${({ theme }) => theme.gap / 2 + 'px'};
  }
`
