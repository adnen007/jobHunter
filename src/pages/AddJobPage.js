import styled from "styled-components";
import { useState } from "react";
import { addJob, editJob } from "../features/jobs/jobsAsync";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const AddJobPage = () => {
  const isLoading = useSelector((state) => {
    return state.jobs.isLoading;
  });

  const { state: locationState } = useLocation();

  let initialState = {
    position: "",
    company: "",
    jobLocation: "",
    jobType: "full-time",
    status: "interview",
  };

  if (locationState) initialState = locationState;

  const [params, setParams] = useState(initialState);
  const dispatch = useDispatch();

  const onformChange = (e) => {
    const { id, value } = e.target;
    setParams({ ...params, [id]: value });
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    const values = Object.values(params);

    if (values.includes("")) {
      toast.warn("Please fill out all fields");
      return;
    }

    if (locationState) {
      dispatch(editJob({ ...params }));
    } else {
      dispatch(addJob(params));
      setParams(initialState);
    }
  };

  const onClearClick = () => {
    setParams(initialState);
  };

  return (
    <Wrappper className="container">
      <form>
        <h2>{locationState ? "edit job" : "new job"}</h2>
        <div>
          <div className="row">
            <input
              placeholder="position"
              onChange={onformChange}
              value={params.position}
              id="position"
              className="ipt"
              type="text"
            />
          </div>
          <div className="row">
            <input
              placeholder="company"
              onChange={onformChange}
              value={params.company}
              id="company"
              className="ipt"
              type="text"
            />
          </div>
          <div className="row">
            <input
              placeholder="location"
              onChange={onformChange}
              value={params.jobLocation}
              id="jobLocation"
              className="ipt"
              type="text"
            />
          </div>
          <div className="row">
            <select onChange={onformChange} value={params.status} id="status" className="ipt">
              <option value="interview">interview</option>
              <option value="declined">declined</option>
              <option value="pending">pending</option>
            </select>
          </div>
          <div className="row">
            <select onChange={onformChange} value={params.jobType} id="jobType" className="ipt">
              <option value="full-time">full-time</option>
              <option value="part-time">part-time</option>
              <option value="remote">remote</option>
              <option value="internship">internship</option>
            </select>
          </div>
          <div className="row">
            {!locationState ? (
              <button onClick={onClearClick} className="btn clear" type="button">
                clear
              </button>
            ) : (
              false
            )}
            <button onClick={onSubmitClick} className="btn sbumit" type="button">
              {isLoading ? "Loading..." : locationState ? "Edit" : "Add"}
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
    box-shadow: var(--light-shadow);
    border-radius: var(--radius);
    padding: 50px 30px;
  }

  form h2 {
    font-size: 31px;
    font-weight: 400;
    line-height: 41px;
    text-align: left;
    color: var(--text-color-6);
  }
  form > div {
    display: grid;
    column-gap: 20px;
    row-gap: 40px;
    align-items: end;
    margin-top: 20px;
  }

  .row {
    display: flex;
    flex-direction: column;
  }

  .row:last-of-type {
    flex-direction: row;
    gap: 20px;
  }

  .ipt {
    display: block;
    color: rgb(0, 0, 0);
    background-color: white;
    border-radius: 0px;
    border: none;
    outline: none;
    border-bottom: solid 1px #474c51;
    height: 35px;
    padding-bottom: 5px;
    font-size: 16px;
  }
  .ipt::placeholder {
    color: black;
    text-transform: capitalize;
  }
  .ipt:focus::placeholder {
    color: gray;
  }

  .row .btn {
    height: 35px;
    flex-grow: 1;
    text-transform: capitalize;
    font-size: 16px;
    line-height: 18px;
  }
  .row .btn.clear {
    background-color: rgb(149, 150, 151);
  }
  @media (max-width: 992px) {
    .row .btn {
      margin-top: 22px;
    }
  }

  @media (min-width: 992px) {
    form > div {
      grid-template-columns: 1fr 1fr;
      column-gap: 60px;
    }
  }
  @media (min-width: 1200px) {
    form > div {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default AddJobPage;
