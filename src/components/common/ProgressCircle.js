import React from 'react'
import styled from 'styled-components'
import {
  CircularProgressbarWithChildren as Circle,
  buildStyles
} from 'react-circular-progressbar'
import './ProgressCircle.scss'

const Wrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`

const ProgressCircle = ({
 value, icon, width, height
}) => {
  return (
    <Wrapper width={width} height={height}>
      <Circle
        value={value}
        styles={buildStyles({
          // Rotation of path and trail, in number of turns (0-1)
          rotation: 0.75,

          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: 'butt',
          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,

          // Colors
          pathColor: '#9872fb',
          trailColor: '#3a3867'
        })}// ting 9872fb back 3a3867
      >
        {icon !== undefined ?
          <img style={{ width: '50%' }} src={icon} alt="ethfinex" /> :
          <React.Fragment />
        }
      </Circle>
    </Wrapper>
  )
}

export default ProgressCircle
