import styled from "styled-components";

export const FlexBox = styled.div`
  display: inline-flex;
  ${(props) => props.column && `flex-direction: column;`}
  ${(props) => props.row && `flex-direction: row;`}
`;
