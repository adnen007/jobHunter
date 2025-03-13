import styled from "styled-components";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import Hero from "../images/hero-theme2.svg";
const LandingPage = () => {
  return (
    <Wrapper>
      <div className="container">
        <header>
          <Logo />
        </header>
        <div className="content ">
          <div className="info">
            <h1>
              <span>J</span>ob <span>H</span>unt <span>T</span>racker
            </h1>
            <ul className="checklist">
              <li>
                <span className="checkmark">✔</span> Organize your job search in one place.
              </li>
              <li>
                <span className="checkmark">✔</span> Track your applications, effortlessly.
              </li>

              <li>
                <span className="checkmark">✔</span> Stay ahead with smart reminders.
              </li>
            </ul>
            <Link className="btn" to="/login">
              <span>Get Started</span>
              <div className="arrow">➔</div>
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding-bottom: 100px;
    gap: 20px;
    height: calc(100vh - 100px);
  }

  h1 {
    font-size: 48.5px;
    text-align: start;
    font-family: "roboto condensed", sans-serif;
    line-height: 63px;
    margin-top: 10px;
    text-transform: lowercase;
    color: var(--text-color-6);
    span {
      color: var(--primary-color);
      text-transform: uppercase;
    }
  }
  @media (min-width: 992px) {
    h1 {
      font-size: 56px;
    }
  }
  .checklist {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 20px;
  }

  .checklist li {
    font-size: 16px;
    letter-spacing: 1.3px;
    color: #475569;
    margin: 5px 0;
    display: flex;
    align-items: center;
  }

  .checkmark {
    font-size: 24px;
    color: var(--primary-color);
    margin-right: 10px;
  }

  .btn {
    display: flex;
    align-items: center;
    margin-top: 30px;
    text-transform: capitalize;
    width: fit-content;
    justify-content: center;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    background: var(--primary-color);
    border: none;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.5);
  }

  .btn .arrow {
    display: inline-block;
    font-size: 18px;
    margin-left: 10px;
    animation: slideArrow 1s infinite;
  }

  @keyframes slideArrow {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(8px);
    }
    100% {
      transform: translateX(0);
    }
  }
  .image img {
    display: block;
    max-width: 100%;
  }
  @media (max-width: 992px) {
    .image {
      display: none;
    }
    .content {
      grid-template-columns: 1fr;
    }
  }

  @keyframes arrow {
    0% {
      transform: translateX(0px);
    }
    100% {
      transform: translateX(50px);
    }
  }
`;
export default LandingPage;
