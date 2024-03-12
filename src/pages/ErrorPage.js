import { Link } from "react-router-dom";
import styled from "styled-components";

const ErrorPage = () => {
  return (
    <Wrapper>
      <h2>error 404</h2>
      <button className="btn">
        <Link to="/">go back home</Link>
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    width: fit-content;
    font-size: 42px;
    color: var(--primary-color);
    text-transform: capitalize;
  }

  button {
    margin-top: 30px;
    a {
      color: var(--white);
    }
  }
`;

export default ErrorPage;
