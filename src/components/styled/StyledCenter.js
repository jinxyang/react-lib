import styled from 'styled-components'

import styles from '../../styles'

export default styled.div`
  ${styles.center};

  flex-direction: ${({ $column }) => ($column ? 'column' : 'row')};
  gap: ${styles.getGap()};
`
