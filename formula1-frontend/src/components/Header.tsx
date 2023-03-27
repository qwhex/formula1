import styled from "styled-components";
import f1Small from "../f1_small.png";

const HeaderContainer = styled.div`
  padding: 0 0 8px;
`;

export const Header = () => (
  // Site header component
  <HeaderContainer>
    <img src={f1Small} alt="Formula1 Logo" />
    <h1>Formula1 drivers</h1>
  </HeaderContainer>
);
