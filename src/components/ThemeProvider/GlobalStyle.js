import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @keyframes show {
    to {
      opacity: 1;
    }
  }

  @keyframes hide {
    to {
      opacity: 0;
    }
  }

  ::-webkit-scrollbar {
    width: 0;
  }

  * {
    -ms-overflow-style: none;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }
`
export default GlobalStyle
