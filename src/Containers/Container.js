import styled from 'styled-components'

export const Container = styled.div`
    color:  ${props => props.theme.color} ;
    background-color: ${props => props.theme.bgColor};
   
    border: 3px solid ${props => props.theme.borderColor};
    padding: 16px;

    font-size: 13px;
  `

