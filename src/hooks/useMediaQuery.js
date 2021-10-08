import React from 'react'

const useMediaQuery = (mediaQueryString) => {
  const [matches, setMatches] = React.useState(
    !!window.matchMedia(mediaQueryString).matches,
  )

  React.useLayoutEffect(() => {
    const mql = window.matchMedia(mediaQueryString)
    const handler = () => setMatches(!!mql.matches)

    mql.addEventListener('change', handler)

    return () => mql.removeEventListener('change', handler)
  }, [mediaQueryString])

  return matches
}

export default useMediaQuery
