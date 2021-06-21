import styled from "styled-components";

export const Input = styled.input`
    background-clip: unset;
    
    width: 50%;
    height: 27.27px;
   
    padding: 5px;
    
    border-radius: ${props => props.theme.borderRadiusButton};
    border: 1px solid ${props => props.theme.borderColor};

    font-size:15px;
    line-height: 15px;
    vertical-align: middle;
    
    &:focus {
    border-color: ${props => props.theme.borderColor};
    box-shadow: 0 0 0 0.1rem ${props => props.theme.borderColor};
  }

`