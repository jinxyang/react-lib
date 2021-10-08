import { css } from 'styled-components'

const translate = (gap) => `translate(${gap / -2}, 0)`

export const showAnimation = css`
  @keyframes show {
    to {
      transform: translate(0, 0);
      opacity: 1;
    }
  }

  transform: ${({ theme }) => translate(theme.gap)};
  opacity: 0;
  animation: show 150ms forwards;
`
