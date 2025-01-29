import styled from "styled-components";
import logo from "../images/theme1.png";

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
    width: 160px;
  }
`;

export default Logo;
