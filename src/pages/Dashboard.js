import { Outlet } from "react-router-dom";
import { Header, Nav } from "../components/index";
import styled from "styled-components";
import { useState } from "react";

const Dashboard = () => {
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const closeDropdown = () => {
    setShowSideBar(false);
  };

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
    padding: 10px 20px;
    gap: 15px;
    opacity: 0;
    visibility: hidden;
    transition: 0.5s;
  }
  .dropdown.active {
    opacity: 1;
    visibility: visible;
  }
  @media (min-width: 992px) {
    .dropdown {
      display: none;
    }
  }
  .side_bar {
    width: 0px;
    height: 100vh;
    overflow: hidden;
    transition: 0.5s;
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
    width: 250px;
  }
  @media (max-width: 992px) {
    .side_bar {
      display: none;
    }
  }
`;

export default Dashboard;
