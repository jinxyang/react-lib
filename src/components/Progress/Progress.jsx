import React from 'react'
import styled, { keyframes } from 'styled-components'

const shake = keyframes`
  from {
    transform: rotate(-5deg);
  }
  to {
    transform: rotate(5deg);
  }
`

const StyledProgress = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  background: ${({ $mode, theme, $color }) =>
    $mode === 'fill' ? $color : 'none'};
  border: 4px solid ${({ $color }) => $color};
  border-radius: ${({ theme }) => (theme.shape === 'circle' ? '50%' : 0)};
`
const StyledInner = styled.div`
  position: absolute;
  top: ${({ $percent }) => $percent};
  left: -50%;
  width: 200%;
  height: 100%;
  background: ${({ $color }) => $color};
  transition: all 0.5s linear;
  animation: ${({ $anime }) =>
    $anime ? `${shake} 3s linear alternate infinite` : 'none'};
`

const getPercent = (string) => string.replace('%', '') / 100

const Progress = ({
  mode = 'empty',
  percent = 0,
  color = 'primary',
  value = 0,
  unit = '%',
  shape = 'normal',
  width = '100%',
  height = '100%',
  animate = false,
  children,
}) => {
  const el = React.useRef(null)
  const [size, setSize] = React.useState(0)

  const diameter = React.useMemo(
    () => (width.includes('%') ? getPercent(width) * size + 'px' : width),
    [size, width],
  )

  React.useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const { contentRect } = entries[0]
      setSize(Math.min(contentRect.width, contentRect.height))
    })
    observer.observe(el.current.parentNode)
    return () => {
      el.current && observer.unobserve(el.current.parentNode)
    }
  }, [])

  return (
    <StyledProgress
      ref={el}
      $color={color}
      $mode={mode}
      style={
        shape === 'circle'
          ? { width: diameter, height: diameter }
          : { width, height }
      }
    >
      {mode === 'empty' && (
        <StyledInner
          $color={color}
          $animate={animate}
          $percent={100 - percent + '%'}
        />
      )}
      {children || (
        <div>
          {value} {unit}
        </div>
      )}
    </StyledProgress>
  )
}

export default Progress
