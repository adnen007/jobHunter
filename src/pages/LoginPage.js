import styled from "styled-components";
import Logo from "../components/Logo";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/user/userAsync";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [formState, setFormState] = useState({ name: "", email: "", password: "" });
  const user = useSelector((state) => {
    return state.user;
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
    if (user.user_data.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.user_data.token}`;
      localStorage.user_data = JSON.stringify(user.user_data);
      navigate("/");
      toast.success(`welcom ${user.user_data.name}`);
    } else if (user.user_status.err) {
      toast.error(user.user_status.err);
    }
  }, [user.user_data, navigate, user.user_status.err]);

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
          <h2>Login</h2>
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
            {user.is_loading ? "loading..." : "submit"}
          </button>
          <button onClick={OnDemoClick} className="btn" type="button">
            {user.is_loading ? "loading..." : "demo app"}
          </button>
          <p onClick={() => setShowRegister(!showRegister)}>
            not a member yet? <span>{showRegister ? "login" : "register"}</span>
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
