import React from 'react'
import styled from 'styled-components'

const StyledDivider = styled.hr`
width: ${props => props.width};
height: 2px;
margin: ${props => props.margin};
background-color: var(--inactive-border);
border: 0 none;
`

const Divider = ({ width, margin }) => (
  <StyledDivider width={width} margin={margin} />
)

export default Divider
