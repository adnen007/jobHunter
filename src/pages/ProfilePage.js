import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { updateUser } from "../features/user/userAsync";

const ProfilePage = () => {
  const userInfo = useSelector((state) => {
    return state.user.userInfo;
  });
  const isLoading = useSelector((state) => {
    return state.user.isLoading;
  });

  const dispatch = useDispatch();

  const initialState = { name: "", lastName: "", email: "", userId: "", location: "" };

  const [params, setParams] = useState(initialState);

  const onformChange = (e) => {
    const { id, value } = e.target;
    setParams({ ...params, [id]: value });
  };

  const onsubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(params));
  };

  useEffect(() => {
    setParams(userInfo);
  }, [userInfo]);

  return (
    <Wrappper className="container">
      <form>
        <h2>Profile</h2>
        <div>
          <div className="row">
            <input
              onChange={onformChange}
              id="name"
              value={params.name}
              className="ipt"
              type="text"
              placeholder="First Name"
            />
          </div>
          <div className="row">
            <input
              onChange={onformChange}
              value={params.lastName}
              id="lastName"
              className="ipt"
              type="text"
              placeholder="Last Name"
            />
          </div>
          <div className="row">
            <input
              onChange={onformChange}
              value={params.email}
              id="email"
              className="ipt"
              type="email"
              placeholder="Email"
              readOnly
            />
          </div>
          <div className="row">
            <input
              onChange={onformChange}
              value={params.location}
              id="location"
              className="ipt"
              type="text"
              placeholder="Location"
            />
          </div>
          <div className="row">
            <button onClick={onsubmit} className="btn" type="submit">
              {isLoading ? "loading..." : "Confirm"}
            </button>
          </div>
        </div>
      </form>
    </Wrappper>
  );
};
const Wrappper = styled.section`
  padding-top: 30px;
  padding-bottom: 30px;
  max-height: calc(100vh - 96px);
  overflow-y: auto;

  form {
    background-color: var(--white);
    border-radius: var(--radius);
    padding: 50px 30px;
    box-shadow: var(--light-shadow);
  }
  form h2 {
    font-size: 31px;
    font-weight: 400;
    line-height: 41px;
    text-align: left;
    color: var(--text-color-6);
  }

  form > div {
    display: grid;
    column-gap: 20px;
    row-gap: 40px;
    align-items: end;
    margin-top: 20px;
  }
  .row {
    display: flex;
    flex-direction: column;
  }
  .row .ipt {
    display: block;
    color: rgb(0, 0, 0);
    background-color: white;
    border-radius: 0px;
    border: none;
    outline: none;
    border-bottom: solid 1px #474c51;
    height: 35px;
    padding-bottom: 5px;
    font-size: 16px;
  }
  .row .ipt::placeholder {
    color: black;
    text-transform: capitalize;
  }
  .row .ipt:focus::placeholder {
    color: gray;
  }
  .row .ipt#email {
    color: rgb(116, 117, 119);
    cursor: not-allowed;
  }
  .row .btn {
    height: 35px;
    text-transform: capitalize;
    font-size: 16px;
    line-height: 18px;
    margin-top: 22px;
  }

  @media (min-width: 992px) {
    form > div {
      grid-template-columns: 1fr 1fr;
      column-gap: 60px;
    }
    .row .btn {
      margin-top: 0px;
    }
  }
  @media (min-width: 1200px) {
    form > div {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default ProfilePage;
