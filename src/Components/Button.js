import styled from "styled-components";

export const Button = styled.button`
    background-color: ${props => props.theme.bgColor};
   
    border: 1px solid ${props => props.theme.borderColor};
    border-radius: ${props => props.theme.borderRadiusButton}!important;
    margin-left: 5px;
    padding: 5px;

    color:  ${props => props.theme.color};
    font-size: 15px;
    line-height: 15px;

    &:hover {
        color:  ${props => props.theme.hoverTextColor};
        background-color: ${props => props.theme.hoverBgColor};
    }
    

`