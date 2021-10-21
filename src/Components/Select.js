import styled from "styled-components";

export const Select = styled.select`
  border-radius: ${(props) => props.theme.borderRadiusButton}!important;
  border: 1px solid ${(props) => props.theme.borderColor};

  &:focus {
    border-color: ${(props) => props.theme.borderColor};
    box-shadow: 0 0 0 0.1rem ${(props) => props.theme.borderColor};
  }
`;
