import { RiMenuUnfoldFill } from "react-icons/ri";
import { RiLogoutCircleLine } from "react-icons/ri";
import { RiShutDownLine } from "react-icons/ri";

import styled from "styled-components";
import Logo from "./Logo";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user/userAsync";

const Header = ({ toggleSideBar }) => {
  const Dispatch = useDispatch();

  const [dropLogout, setDropLogout] = useState(false);

  const userName = useSelector((state) => {
    return state.user.userInfo.name;
  });

  const loading = useSelector((state) => {
    return state.user.isLoading;
  });

  const toggleLogout = () => {
    setDropLogout(!dropLogout);
  };

  const onLogoutClick = () => {
    Dispatch(logout());
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
          <div onClick={onLogoutClick} className={`logout ${dropLogout ? "active" : ""}`}>
            <RiLogoutCircleLine />
          </div>
          <div className="name">
            <p>{loading ? "loading..." : userName}</p>

            <div className="shutdown">
              <RiShutDownLine />
            </div>
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
      display: none;
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
    padding-left: 10px;
    gap: 10px;
    position: relative;
    svg {
      display: block;
      font-size: 16px;
    }
  }

  .shutdown {
    height: 25px;
    width: 40px;
    border-left: solid white 1.5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 375px) {
    .user .name {
      font-size: 14px;
    }
  }
  .user .logout {
    width: 40px;
    height: 40px;

    font-size: 18px;
    background: var(--primary-color);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    position: absolute;
    top: 0;
    right: 0px;
    display: flex;
    transition: top 0.5s;
  }
  .user .logout.active {
    display: flex;
    top: calc(100% + 4px);
  }
`;

export default Header;
