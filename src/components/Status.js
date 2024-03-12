import styled from "styled-components";
import {
  FaSuitcase as Pending,
  FaCalendarCheck as Interview,
  FaBug as Declined,
} from "react-icons/fa";

const Status = ({ el: [key, value] }) => {
  return (
    <Wrapper>
      <div className={key}>
        <div>
          <div className="number">{value}</div>
          <div className="icon">
            {key === "pending" ? (
              <Pending />
            ) : key === "interview" ? (
              <Interview />
            ) : (
              <Declined />
            )}
          </div>
        </div>
        <p> {key} applications</p>
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
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;

      .number {
        font-size: 50px;
        line-height: 88px;
        font-weight: 700;
      }
      .icon {
        display: flex;
        align-items: center;
        border-radius: var(--radius);
        padding: 18px 20px;
        svg {
          display: block;
          font-size: 30px;
        }
      }
    }
    p {
      font-size: 20px;
      line-height: 26px;
      margin-top: 20px;
      text-transform: capitalize;
      letter-spacing: 1px;
    }
  }
  .pending {
    border-bottom: solid 5px var(--pending-color-1);
    .number {
      color: var(--pending-color-1);
    }
    .icon {
      background-color: var(--pending-color-2);
      color: var(--pending-color-1);
    }
  }
  .interview {
    border-bottom: solid 5px var(--interview-color-1);
    .number {
      color: var(--interview-color-1);
    }
    .icon {
      background-color: var(--interview-color-2);
      color: var(--interview-color-1);
    }
  }
  .declined {
    border-bottom: solid 5px var(--declined-color-1);
    .number {
      color: var(--declined-color-1);
    }
    .icon {
      background-color: var(--declined-color-2);
      color: var(--declined-color-1);
    }
  }
`;

export default Status;
