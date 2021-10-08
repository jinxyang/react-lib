import React from 'react'
import styled from 'styled-components'

import styles from '../../styles'

const StyledImage = styled.span`
  display: inline-block;
  flex: 0 0 ${({ $width }) => $width || 'auto'};
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '100%'};
  overflow: hidden;
  background-color: ${({ theme, $background }) =>
    $background ? theme.colors.transparent[2] : 'transparent'};
  border-radius: ${({ $shape, $radius }) =>
    $shape === 'circle' ? '50%' : styles.getRadius($radius)};

  img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
`

const Image = ({
  src = '',
  alt = '',
  width = '100%',
  height = '100%',
  shape = 'square', // circle
  radius = 1,
  background = false,
}) => {
  return (
    <StyledImage
      $width={width}
      $height={height}
      $shape={shape}
      $radius={radius}
      $background={background}
    >
      <img src={src} alt={alt} />
    </StyledImage>
  )
}

export default Image
