import styled from 'styled-components'

export const Container = styled.div`
    padding: 16px;
    border: 3px solid ${props => props.theme.borderColor};
    background-color: ${props => props.theme.bgColor};
    font-size: 13px;
    color:  ${props => props.theme.color} ;
  `

