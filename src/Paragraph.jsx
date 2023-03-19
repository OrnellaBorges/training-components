import styleOf from 'styled-components'

export const Paragraph = styleOf.p`
  font-style: italic;
  color: ${props => props.connected ? 'green' : 'white'}
`
