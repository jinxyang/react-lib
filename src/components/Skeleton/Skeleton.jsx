import React from 'react'
import styled from 'styled-components'

import styles from '../../styles'

const getBackground = (theme) => {
  return [
    'linear-gradient(',
    '90deg,',
    'transparent',
    ' 0px,',
    `rgba(255 255 255 / ${theme.darkMode ? 5 : 25}%)`,
    ' 40px,',
    'transparent',
    ' 80px)',
  ]
}

const StyledSkeleton = styled.div`
  @keyframes anime {
    to {
      background-position: -200% center;
    }
  }

  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '100%'};
  background-color: ${({ theme }) => theme.colors.transparent[1]};
  background-image: ${({ theme }) => getBackground(theme)};
  background-repeat: no-repeat;
  background-position: 100% center;
  background-size: 200% 100%;
  border-radius: ${({ $circle }) => ($circle ? '50%' : styles.getRadius())};
  animation: anime ${({ $duration }) => $duration} ${({ $delay }) => $delay}
    infinite linear;
`

const Skeleton = ({
  width = '',
  height = '',
  circle = false,
  duration = '1000ms',
  delay = '0s',
}) => {
  return (
    <StyledSkeleton
      $width={width}
      $height={height}
      $circle={circle}
      $duration={duration}
      $delay={delay}
    />
  )
}

export default Skeleton
