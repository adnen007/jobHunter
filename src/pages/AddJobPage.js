import styled from "styled-components";
import { useEffect, useState } from "react";
import { addJob, editJob } from "../features/jobs/asynJobs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { jobsActions } from "../features/jobs/jobsSlice";
import { toast } from "react-toastify";

const AddJobPage = () => {
  const jobStatus = useSelector((state) => {
    return state.jobs.job_status;
  });

  const { state: locationState } = useLocation();

  let initialState = {
    position: "",
    company: "",
    jobLocation: "",
    jobType: "full-time",
    status: "interview",
  };

  if (locationState) {
    initialState = locationState;
  }

  const [params, setParams] = useState(initialState);

  const dispatch = useDispatch();

  const onformChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    if (id === "type") {
      setParams({ ...params, jobType: value });
    } else {
      setParams({ ...params, [id]: value });
    }
  };

  const onSubmitClick = (e) => {
    e.preventDefault();

    const values = Object.values(params);

    if (values.some((el) => el === "")) {
      toast.warn("pleas fill out all the fields");
      return null;
    }

    if (locationState) {
      const id = params._id;
      const payload = { ...params };
      delete payload._id;
      dispatch(editJob({ id, payload }));
    } else {
      dispatch(addJob(params));
      setParams({
        position: "",
        company: "",
        jobLocation: "",
        jobType: "full-time",
        status: "interview",
      });
    }
  };

  useEffect(() => {
    if (jobStatus.success) {
      toast.success(jobStatus.success);
      dispatch(jobsActions.clear_job_status());
    } else if (jobStatus.err) {
      toast.error(jobStatus.err);
      dispatch(jobsActions.clear_job_status());
    }
  }, [jobStatus, dispatch]);

  useEffect(() => {
    if (locationState) {
      return;
    }
    setParams({
      position: "",
      company: "",
      jobLocation: "",
      jobType: "full-time",
      status: "interview",
    });
  }, [locationState, setParams]);

  const onClearClick = () => {
    setParams({
      position: "",
      company: "",
      jobLocation: "",
      jobType: "full-time",
      status: "interview",
    });
  };

  return (
    <Wrappper className="container">
      <form>
        <h2>{locationState ? "edit job" : "add job"}</h2>
        <div>
          <div className="row">
            <label className="lbl" htmlFor="position">
              position
            </label>
            <input
              onChange={onformChange}
              value={params.position}
              id="position"
              className="ipt"
              type="text"
            />
          </div>
          <div className="row">
            <label className="lbl" htmlFor="company">
              company
            </label>
            <input
              onChange={onformChange}
              value={params.company}
              id="company"
              className="ipt"
              type="text"
            />
          </div>
          <div className="row">
            <label className="lbl" htmlFor="jobLocation">
              job location
            </label>
            <input
              onChange={onformChange}
              value={params.jobLocation}
              id="jobLocation"
              className="ipt"
              type="text"
            />
          </div>
          <div className="row">
            <label className="lbl" htmlFor="status">
              status
            </label>
            <select
              onChange={onformChange}
              value={params.status}
              id="status"
              className="ipt"
            >
              <option value="interview">interview</option>
              <option value="declined">declined</option>
              <option value="pending">pending</option>
            </select>
          </div>
          <div className="row">
            <label className="lbl" htmlFor="type">
              type
            </label>
            <select
              onChange={onformChange}
              value={params.jobType}
              id="type"
              className="ipt"
            >
              <option value="full-time">full-time</option>
              <option value="part-time">part-time</option>
              <option value="remote">remote</option>
              <option value="internship">internship</option>
            </select>
          </div>
          <div className="row">
            <button onClick={onClearClick} className="btn clear" type="button">
              clear
            </button>
            <button onClick={onSubmitClick} className="btn sbumit" type="button">
              submit
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
    border-radius: var(--radius);
    padding: 50px 30px;
    h2 {
      font-size: 31px;
      font-weight: 400;
      line-height: 41px;
      text-align: left;
      color: var(--text-color-6);
    }
    > div {
      display: grid;
      column-gap: 20px;
      row-gap: 10px;
      align-items: end;
      margin-top: 20px;

      .row {
        display: flex;
        flex-direction: column;
        .btn {
          height: 35px;
          flex-grow: 1;
          text-transform: capitalize;
          font-size: 16px;
          line-height: 18px;
        }
        .btn.clear {
          background-color: var(--text-color-4);
        }

        @media (max-width: 992px) {
          .btn {
            margin-top: 22px;
          }
        }
      }
      .row:last-of-type {
        flex-direction: row;
        gap: 20px;
      }
    }
    @media (min-width: 992px) {
      > div {
        grid-template-columns: 1fr 1fr;
      }
    }
    @media (min-width: 1200px) {
      > div {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
  }
`;

export default AddJobPage;
