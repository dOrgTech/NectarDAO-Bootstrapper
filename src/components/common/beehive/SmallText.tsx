import styled from 'styled-components'

export const Smalltext = styled.h1`
  position: relative;
  font-family: Montserrat;
  display: inline-block;
  font-style: normal;
  font-weight: ${({ afterElement }: { afterElement: boolean }) => afterElement? 600: 300 };
  font-size: 10px;
  line-height: 140%;
  margin: 0;
  padding: 0 4px;
  letter-spacing: -0.02em;
  color: #FFFFFF;
  z-index: 1;

  ${({ afterElement }: { afterElement: boolean }) => afterElement &&
    `&::after {
      content: attr(data-content);
      position: absolute;
      color: #000;
      top: 50%;
      left: 0;
      width: 102%;
      height: 52%;
      background: linear-gradient(315deg, #FF8800 8.75%, #E2A907 100%);
      z-index: -1;
      opacity: 0.3;
    }`
}
`