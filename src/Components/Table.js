import styled from "styled-components";

export const Table = styled.table`
  color: ${(props) => props.theme.color};
  border: 1px solid ${(props) => props.theme.borderColor};
  vertical-align: center;

  & th {
    padding: 0.35rem;
    vertical-align: middle;
    border-top: 1px solid ${(props) => props.theme.borderColor};
  }
  & > th {
    text-align: left;
  }
  & th:last-child {
    text-align: right;
  }
`;
