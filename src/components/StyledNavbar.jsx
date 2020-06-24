import styled from "styled-components";

export const StyledNavbar = styled.div`
  ${(props) => props.fixed && `position: fixed; top: 0;`}
  ${(props) => !props.fixed && `position: absolute; bottom: -4rem;`}
  height: 4rem;
  display: flex;
`;
