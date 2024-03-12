import styled from "styled-components";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import Hero from "../images/hero-img.svg";
const LandingPage = () => {
  return (
    <Wrapper>
      <div className="container">
        <header>
          <Logo />
        </header>
        <div className="content page-no-h">
          <div className="info">
            <h1>
              job <span>tracking</span> app
            </h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid molestiae
              distinctio sint nostrum, totam illum modi similique ipsam reiciendis
              temporibus doloribus! Aspernatur, veritatis.
            </p>
            <Link className="btn" to="/login">
              Login/Register
            </Link>
          </div>
          <div className="image">
            <img src={Hero} alt="hero-img" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  header {
    height: 100px;
    display: flex;
    align-items: center;
  }
  .content {
    display: flex;
    align-items: center;
    padding-bottom: 100px;
    div {
      width: 100%;
    }
  }
  h1 {
    font-size: 49px;
    font-family: "roboto condensed", sans-serif;
    line-height: 63px;
    margin-top: 10px;
    color: var(--text-color-6);
    span {
      color: var(--primary-color);
    }
  }
  p {
    color: var(--text-color-7);
    margin-top: 30px;
  }
  .btn {
    font-size: 20px;
    margin-top: 25px;
    text-transform: capitalize;
  }
  .image {
    img {
      max-width: 500px;
      width: 100%;
    }
  }
  @media (max-width: 992px) {
    .image {
      display: none;
    }
  }
`;
export default LandingPage;
