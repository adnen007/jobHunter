import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import styled from "styled-components";
import { updateUser } from "../features/user/userAsync";
const ProfilePage = () => {
  const user = useSelector((state) => {
    return state.user;
  });

  const dispatch = useDispatch();

  const [params, setParams] = useState(user.user_data);

  const onformChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setParams({ ...params, [id]: value });
  };

  const onsubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(params));
  };

  return (
    <Wrappper className="container">
      <form>
        <h2>Profile</h2>
        <div>
          <div className="row">
            <label className="lbl" htmlFor="name">
              name
            </label>
            <input
              onChange={onformChange}
              id="name"
              value={params.name}
              className="ipt"
              type="text"
            />
          </div>
          <div className="row">
            <label className="lbl" htmlFor="lastName">
              last name
            </label>
            <input
              onChange={onformChange}
              value={params.lastName}
              id="lastName"
              className="ipt"
              type="text"
            />
          </div>
          <div className="row">
            <label className="lbl" htmlFor="email">
              email
            </label>
            <input
              onChange={onformChange}
              value={params.email}
              id="email"
              className="ipt"
              type="email"
            />
          </div>
          <div className="row">
            <label className="lbl" htmlFor="location">
              location
            </label>
            <input
              onChange={onformChange}
              value={params.location}
              id="location"
              className="ipt"
              type="text"
            />
          </div>
          <div className="row">
            <button onClick={onsubmit} className="btn" type="submit">
              save changes
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
    h2 {
      font-size: 31px;
      font-weight: 400;
      line-height: 41px;
      text-align: left;
      color: var(--text-color-6);
    }
    > div {
      display: grid;
      column-gap: 20px;
      row-gap: 10px;
      align-items: end;
      margin-top: 20px;

      .row {
        display: flex;
        flex-direction: column;
        .btn {
          height: 35px;
          text-transform: capitalize;
          font-size: 16px;
          line-height: 18px;
          margin-top: 22px;
        }
      }
    }
    @media (min-width: 992px) {
      > div {
        grid-template-columns: 1fr 1fr;
      }
    }
    @media (min-width: 1200px) {
      > div {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
  }
`;

export default ProfilePage;
