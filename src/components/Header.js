import { RiMenuUnfoldFill } from "react-icons/ri";

import styled from "styled-components";
import Logo from "./Logo";
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../features/user/userSlice";
const Header = ({ toggleSideBar }) => {
  const userName = useSelector((state) => {
    return state.user.user_data.name;
  });

  const [dropLogout, setDropLogout] = useState(false);
  const navigate = useNavigate();
  const Dispatch = useDispatch();
  const toggleLogout = () => {
    setDropLogout(!dropLogout);
  };

  const onLogoutClick = () => {
    Dispatch(userActions.logout());
    navigate("/login");
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="menu" onClick={toggleSideBar}>
          <RiMenuUnfoldFill />
        </div>
        <div className="title">
          <h2>Dashboard</h2> <Logo />
        </div>
        <div className="user" onClick={toggleLogout}>
          <div className="name">
            <FaUserCircle />
            <p>{userName}</p>
            <IoMdArrowDropdown />
          </div>
          <div onClick={onLogoutClick} className={`logout ${dropLogout ? "active" : ""}`}>
            logout
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  background-color: var(--white);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 0px 0px;
  .container {
    display: flex;
    justify-content: space-between;
    height: 96px;
    align-items: center;

    .logo {
      width: 100px;
      img {
        max-width: 100%;
      }
    }
    @media (min-width: 992px) {
      .logo {
        display: none;
      }
    }
    h2 {
      display: none;
      font-weight: 400;
      font-size: 31px;
      line-height: 41px;
    }

    @media (min-width: 992px) {
      h2 {
        /* display: block; */
      }
    }
    .menu {
      color: var(--primary-color);

      svg {
        font-size: 30px;
        display: block;
        cursor: pointer;
      }
    }
  }
  .user {
    position: relative;
    height: 40px;
    text-transform: capitalize;
    cursor: pointer;
    user-select: none;
  }
  .user .name {
    border-radius: var(--radius);
    width: 100%;
    height: 100%;
    background-color: var(--primary-color);
    color: var(--white);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    padding: 0 10px;
    gap: 10px;

    svg {
      display: block;
      font-size: 16px;
    }
  }
  @media (max-width: 375px) {
    .user .name {
      font-size: 14px;
    }
  }
  .user .logout {
    width: 100%;
    height: 40px;
    background: var(--background-color-4);
    color: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    position: absolute;
    top: calc(100% + 8px);
    left: 0px;
    display: none;
  }
  .user .logout.active {
    display: flex;
  }
`;

export default Header;
