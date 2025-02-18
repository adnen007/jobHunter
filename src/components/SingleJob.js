import styled from "styled-components";
import { convertTime, convertToPath } from "../utils/functions";
import { deleteJob } from "../features/jobs/asynJobs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaLocationCrosshairs, FaFaceDizzy } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineAccessTimeFilled, MdPending, MdWorkHistory } from "react-icons/md";
import { BsCalendar2CheckFill } from "react-icons/bs";

const SingleJob = ({
  el: { company, position, status, jobType, jobLocation, createdAt, _id },
  wrapperRef,
  params,
}) => {
  const dispatch = useDispatch();

  const onDeleteClick = () => {
    dispatch(deleteJob({ id: _id, path: convertToPath(params) }));
    wrapperRef.current.scrollTo(0, 0);
  };

  const icon =
    status === "pending" ? (
      <MdPending />
    ) : status === "interview" ? (
      <MdOutlineAccessTimeFilled />
    ) : (
      <FaFaceDizzy />
    );

  return (
    <Wrapper>
      <div className="top">
        <div className={`icon ${status}`}>{icon} </div>
        <div>
          <h3 className="position">{position}</h3>
          <p className="company">{company}</p>
        </div>
      </div>
      <div className="bottom">
        <div className="location">
          <FaLocationCrosshairs /> <span>{jobLocation}</span>
        </div>
        <div className="date">
          <BsCalendar2CheckFill /> <span>{convertTime(createdAt)} </span>
        </div>
        <div className="type">
          <MdWorkHistory />
          <span>{jobType} </span>
        </div>
        <div className={`status ${status}`}>{status} </div>
        <div className="buttons">
          <button className="edit btn">
            <Link
              to="/new-job"
              state={{ company, position, status, jobType, jobLocation, _id }}
            >
              <IoMdSettings />
            </Link>
          </button>

          <button onClick={onDeleteClick} className=" delete btn">
            <AiFillDelete />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--white);
  box-shadow: var(--light-shadow);
  border-radius: var(--radius);
  min-width: 0;
  .top {
    display: flex;
    padding: 16px 20px;
    column-gap: 30px;
    .icon {
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--white);
      border-radius: var(--radius);
      font-size: 34px;
      line-height: 42px;
      flex-shrink: 0;
    }
    .icon.pending {
      background-color: var(--pending-color-1);
    }
    .icon.declined {
      background-color: var(--declined-color-1);
    }
    .icon.interview {
      background-color: var(--interview-color-1);
    }
    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      h3 {
        font-size: 20px;
        line-height: 26px;
        font-weight: 400;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .company {
        font-size: 16px;
        line-height: 28px;
        color: var(--text-color-8);
      }
    }
  }
  .bottom {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 16px 20px;
    border-top: solid 1px var(--background-color-4);
  }
  .location,
  .date,
  .type {
    font-size: 16px;
    line-height: 28px;
    color: var(--text-color-6);
    display: flex;
    align-items: center;
    svg {
      color: var(--text-color-8);

      font-size: 21px;
      margin-right: 15px;
    }
    span {
      display: block;
    }
  }
  .date svg {
    font-size: 18px;
  }
  .status {
    color: var(--text-color-1);
    width: fit-content;
    padding: 2px 17px;
    border-radius: var(--radius);
  }
  .status.pending {
    background-color: var(--pending-color-2);
    color: var(--pending-color-1);
  }
  .status.declined {
    background-color: var(--declined-color-2);
    color: var(--declined-color-1);
  }
  .status.interview {
    background-color: var(--interview-color-2);
    color: var(--interview-color-1);
  }
  .buttons {
    display: flex;
    gap: 20px;
    button {
      background-color: rgb(226, 230, 235);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.07);
      padding: 0px;
      height: 36px;
      width: 56px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      transition: box-shadow 0.2s ease, transform 0.2s ease;
    }
    button:hover {
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15), 0 3px 5px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
    button svg {
      color: rgb(16, 4, 68);
      display: block;
      font-size: 18px;
    }
  }
  a {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
`;

export default SingleJob;
