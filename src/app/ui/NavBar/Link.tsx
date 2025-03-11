import styled from 'styled-components';

export const StyledA = styled.a`
  font-size: 1.5em;
  text-align: center;
  color: ${(props) => props.theme.main};
  flex-basis: 10%;
  border-width: 2px;
  border-color: red;
  border-radius: 0.375rem;
  margin: 2%;
`;
