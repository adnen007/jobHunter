import styled from "styled-components";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { links } from "../utils/constants";

import Logo from "./Logo";

const Nav = ({ closeDropdown }) => {
  return (
    <Wrapper>
      <div onClick={closeDropdown} className="close">
        <ImCross />
      </div>
      <div className="content">
        <Logo />
        <ul>
          {links.map((el) => {
            return (
              <li key={el.path} onClick={closeDropdown}>
                <Link to={el.path}>
                  {el.icon} {el.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  background-color: var(--white);

  width: 100%;
  height: 100%;
  border-radius: var(--radius);
  position: relative;
  display: flex;
  justify-content: center;
  .close {
    position: absolute;
    top: 15px;
    left: 20px;
    cursor: pointer;
    svg {
      font-size: 23px;
      color: var(--text-color-5);
      display: block;
    }
  }
  @media (min-width: 993px) {
    .close {
      display: none;
    }
  }
  .content {
    margin-top: 60px;
  }
  ul {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    gap: 26px;
    align-items: center;
  }
  li {
    width: 100px;

    a {
      display: flex;
      align-items: center;
      color: var(--text-color-4);
      gap: 15px;
      svg {
        font-size: 24px;
        display: block;
      }
    }
  }
  li:hover a,
  li.active a {
    color: var(--primary-color);
  }

  .logo img {
    width: 140px;
  }
  @media (max-width: 992px) {
    .logo img {
      width: 190px;
    }
  }
`;
export default Nav;
