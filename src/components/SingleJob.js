import styled from "styled-components";
import { FaLocationArrow } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { FaSuitcase } from "react-icons/fa";
import { convertTime, convertToPath } from "../utils/functions";
import { deleteJob } from "../features/jobs/asynJobs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
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

  return (
    <Wrapper>
      <div className="top">
        <p className="first_letter">{company[0]} </p>
        <div>
          <h3 className="position">{position}</h3>
          <p className="company">{company}</p>
        </div>
      </div>
      <div className="bottom">
        <div className="location">
          <FaLocationArrow /> <span>{jobLocation}</span>
        </div>
        <div className="date">
          <FaCalendarAlt /> <span>{convertTime(createdAt)} </span>
        </div>
        <div className="type">
          <FaSuitcase />
          <span>{jobType} </span>
        </div>
        <div className="status">{status} </div>
        <div className="buttons">
          <button className="edit btn">
            <Link
              to="/add-job"
              state={{ company, position, status, jobType, jobLocation, _id }}
            >
              Edit
            </Link>
          </button>
          <button onClick={onDeleteClick} className=" delete btn">
            delete
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

  .top {
    display: flex;
    padding: 16px 20px;
    column-gap: 30px;
    .first_letter {
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--primary-color);
      color: var(--white);
      border-radius: var(--radius);
      font-size: 24px;
      line-height: 42px;
    }
    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      h3 {
        font-size: 20px;
        line-height: 26px;
        font-weight: 400;
        text-align: left;
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
        font-size: 17px;
        margin-right: 15px;
      }
      span {
        display: block;
      }
    }
    .status {
      background-color: var(--background-color-3);
      color: var(--text-color-1);
      width: fit-content;
      padding: 2px 17px;
      border-radius: var(--radius);
    }
    .buttons {
      display: flex;
      gap: 20px;
      button {
        padding: 6px 15px;
        text-transform: capitalize;
        font-size: 16px;
      }
      .edit {
        background-color: #d1e7dd;
        a {
          color: #0f5132;
        }
      }
      .delete {
        color: #842029;
        background-color: #f8d7da;
      }
    }
  }
`;

export default SingleJob;
