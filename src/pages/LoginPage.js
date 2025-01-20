import styled from "styled-components";
import Logo from "../components/Logo";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/user/userAsync";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formState, setFormState] = useState({ name: "", email: "", password: "" });

  const token = useSelector((state) => {
    return state.user.user_data.token;
  });

  const isLoading = useSelector((state) => {
    return state.user.is_loading;
  });

  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (showRegister) {
      Dispatch(registerUser({ ...formState }));
    } else {
      Dispatch(loginUser({ email: formState.email, password: formState.password }));
    }
  };

  const OnDemoClick = () => {
    Dispatch(loginUser({ email: "testUser@test.com", password: "secret" }));
  };

  const onInputChange = (e) => {
    if (e.target.name === "name") {
      setFormState({ ...formState, name: e.target.value });
    }
    if (e.target.name === "email") {
      setFormState({ ...formState, email: e.target.value });
    }
    if (e.target.name === "password") {
      setFormState({ ...formState, password: e.target.value });
    }
  };

  useEffect(() => {
    // don't try get rid to  the conditional rendering it is here to prevent unnecessary navigation during logout.
    if (token) {
      // We perform navigation here instead of within the thunk because the navigation logic depends
      // on the token, which is only available after the thunk finishes and returns the fetched data.
      navigate("/");
    }
  }, [token, navigate]);

  const name = (
    <>
      <label htmlFor="name">name</label>
      <input
        name="name"
        onChange={(e) => onInputChange(e)}
        type="text"
        value={formState.name}
      />
    </>
  );
  return (
    <Wrapper className="page">
      <div className="content">
        <Logo />
        <form onSubmit={(e) => onSubmit(e)}>
          <h2>{showRegister ? "Register" : "Login"}</h2>
          {showRegister ? name : null}
          <label htmlFor="email">email</label>
          <input
            name="email"
            onChange={(e) => onInputChange(e)}
            type="email"
            value={formState.email}
          />
          <label htmlFor="password">password</label>
          <input
            name="password"
            onChange={(e) => onInputChange(e)}
            type="password"
            value={formState.password}
          />
          <button className="btn" type="submit">
            {isLoading ? "loading..." : "submit"}
          </button>
          <button onClick={OnDemoClick} className="btn" type="button">
            {isLoading ? "loading..." : "demo app"}
          </button>
          <p onClick={() => setShowRegister(!showRegister)}>
            {showRegister ? "Already a member? " : "Not a member yet? "}
            <span>{showRegister ? "Login" : "Register"}</span>
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
  .logo {
    margin: auto;
  }
  .content {
    background-color: var(--white);
    box-shadow: var(--dark-shadow);
    border-top: solid 4px var(--primary-color-d);
    padding: 35px 40px;
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
  form button:last-of-type {
    background: var(--background-color-4);
    color: var(--primary-color);
  }

  form > p {
    text-align: center;
    span {
      color: var(--primary-color);
    }
  }
`;

export default LoginPage;
