import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../features/user/userAsync";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Header, Nav } from "../components/index";

const Dashboard = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const dispatch = useDispatch();

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const closeDropdown = () => {
    setShowSideBar(false);
  };

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <Wrapper>
      <div className={`side_bar ${showSideBar ? "active" : ""}`}>
        <Nav />
      </div>
      <div className="content">
        <Header toggleSideBar={toggleSideBar} />
        <Outlet />
      </div>
      <aside className={`dropdown ${showSideBar ? "active" : ""}`}>
        <Nav closeDropdown={closeDropdown} />
      </aside>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;

  > .content {
    flex-grow: 1;
  }
  > .dropdown {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: #000000b0;
    padding: 45px 20px;
    gap: 15px;
    opacity: 0;
    visibility: hidden;
    transition: 0.5s;
  }
  .dropdown.active {
    opacity: 1;
    visibility: visible;
  }
  @media (min-width: 993px) {
    .dropdown {
      display: none;
    }
  }
  .side_bar {
    width: 250px;
    height: 100vh;
    overflow: hidden;
    transition: margin 0.2s linear;
    margin-left: -250px;
    nav {
      > svg {
        display: none;
      }
      .content {
        margin-top: 20px;
        > ul {
          align-items: flex-start;
        }
      }
    }
  }
  .side_bar.active {
    box-shadow: rgba(0, 0, 0, 0.1) 1px 0px 0px 0px;
    margin-left: 0px;
  }
  @media (max-width: 992px) {
    .side_bar {
      display: none;
    }
  }
`;

export default Dashboard;
