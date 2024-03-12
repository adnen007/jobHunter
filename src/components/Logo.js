import styled from "styled-components";
import logo from "../images/logo.35bb8e1d9b5745af32ff148cbee51dfa.svg";

const Logo = () => {
  return (
    <Wrapper className="logo">
      <img src={logo} alt="" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: fit-content;
  img {
    display: block;
  }
`;

export default Logo;
