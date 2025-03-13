import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/user/userAsync";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../components/Logo";

const LoginPage = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const isLoading = useSelector((state) => {
    return state.user.isLoading;
  });

  const userId = useSelector((state) => {
    return state.user.userInfo.userId;
  });

  const Dispatch = useDispatch();
  const [showRegister, setShowRegister] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (showRegister) {
      Dispatch(registerUser({ ...formState }));
    } else {
      Dispatch(
        loginUser({
          email: formState.email,
          password: formState.password,
        })
      );
    }
  };

  const OnDemoClick = () => {
    Dispatch(loginUser({ email: "adnen2@gmail.com", password: "000000" }));
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  useEffect(() => {
    if (userId) {
      navigate("/analytics");
    }
  }, [userId, navigate]);

  const name = (
    <>
      <label htmlFor="name">name</label>
      <input name="name" onChange={(e) => onInputChange(e)} type="text" value={formState.name} id="name" />
    </>
  );
  return (
    <Wrapper className="page">
      <div className="content">
        <Logo />
        <form onSubmit={(e) => onSubmit(e)}>
          <h2>{showRegister ? "Sign Up" : "Sign In"}</h2>
          {showRegister ? name : null}
          <label htmlFor="email">email</label>
          <input name="email" onChange={(e) => onInputChange(e)} type="email" value={formState.email} id="email" />
          <label htmlFor="password">password</label>
          <input
            name="password"
            onChange={(e) => onInputChange(e)}
            type="password"
            value={formState.password}
            id="password"
          />
          <button className="btn" type="submit">
            {isLoading ? "loading..." : showRegister ? "Sign Up" : "Sign In"}
          </button>
          <button onClick={OnDemoClick} className="btn demo" type="button">
            {isLoading ? "loading..." : "View Demo"}
          </button>
          <p onClick={() => setShowRegister(!showRegister)}>
            {showRegister ? "Already a member? " : "New around here?  "}
            <span>{showRegister ? "Sign In" : "Sign Up"}</span>
          </p>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
  height: 100vh;

  @media (max-width: 576px) {
    background-color: var(--white);
    padding: 0px;
  }

  .logo {
    margin: auto;
  }
  .content {
    background-color: var(--white);
    padding: 35px 40px;
  }
  @media (min-width: 576px) {
    .content {
      box-shadow: var(--dark-shadow);
    }
  }
  h2 {
    margin-top: 15px;
    font-size: 31px;
    line-height: 41px;
    font-weight: 400;
  }
  form {
    width: 260px;
  }
  @media (min-width: 768px) {
    form {
      width: 320px;
    }
  }

  form > input,
  form > label,
  form > button {
    display: block;
    text-transform: capitalize;
    width: 100%;
  }
  form > label {
    margin-bottom: 10px;
    color: var(--text-color-6);
  }
  form > input {
    border: none;
    background: var(--background-color-1);
    height: 35px;
    border-radius: var(--radius);
    padding-left: 15px;
    outline: solid 1px #ccd3db;
    margin-bottom: 20px;
  }
  form button:first-of-type {
    margin-top: 35px;
  }
  form button {
    margin-bottom: 20px;
    font-size: 16px;
  }
  .demo {
    background: var(--background-color-4);
    color: var(--primary-color);
  }
  .demo:hover {
    background-color: var(--primary-color-d);
    color: white;
  }

  form > p {
    text-align: center;
    span {
      color: var(--primary-color);
      cursor: pointer;
    }
  }
`;

export default LoginPage;
