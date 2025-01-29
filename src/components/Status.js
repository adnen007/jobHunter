import styled from "styled-components";

import { MdOutlineAccessTimeFilled, MdPending } from "react-icons/md";
import { FaFaceDizzy } from "react-icons/fa6";

const Status = ({ el: [key, value] }) => {
  return (
    <Wrapper>
      <div className={key}>
        <div>
          <div className="number">{value}</div>
          <p> {key} applications</p>
        </div>
        <div className="icon">
          {key === "pending" ? (
            <MdPending />
          ) : key === "interview" ? (
            <MdOutlineAccessTimeFilled />
          ) : (
            <FaFaceDizzy />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  > div {
    background-color: var(--white);
    border-radius: var(--radius);
    padding: 35px 30px;
    box-shadow: var(--light-shadow);

    /* border-left: solid 5px; */
    display: flex;
    justify-content: space-between;

    gap: 10px;

    .number {
      font-size: 30px;
      line-height: 30px;
      font-weight: 700;
    }
    .icon {
      display: flex;
      align-items: center;
      /* border-radius: var(--radius); */
      border-left: solid 2px;
      font-size: 33px;
      width: 60px;
      height: 60px;

      justify-content: center;
      svg {
        display: block;
      }
    }

    p {
      font-size: 17px;
      line-height: 26px;
      margin-top: 4px;
      text-transform: capitalize;
      letter-spacing: 1px;
      white-space: nowrap;
    }
  }
  .pending {
    border-color: var(--pending-color-1);
    .number {
      color: var(--pending-color-1);
    }
    .icon {
      color: var(--pending-color-1);
    }
  }
  .interview {
    border-color: var(--interview-color-1);
    .number {
      color: var(--interview-color-1);
    }
    .icon {
      color: var(--interview-color-1);
    }
  }
  .declined {
    border-color: var(--declined-color-1);
    .number {
      color: var(--declined-color-1);
    }
    .icon {
      color: var(--declined-color-1);
    }
  }
`;

export default Status;
