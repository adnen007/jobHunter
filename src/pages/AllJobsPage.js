import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobs } from "../features/jobs/jobsAsync";
import { SearchForm, SingleJob, Pagination } from "../components";
import Skeleton from "../components/Skeleton.js";
import { generateSkeleton } from "../utils/functions";

const AlljobsPage = () => {
  const intialParams = {
    search: "",
    status: "all",
    jobType: "all",
    sort: "latest",
    currentPage: 1,
    pageMovement: "",
  };

  const [params, setParams] = useState(intialParams);
  const dispatch = useDispatch();

  //Refs
  const timeoutRef = useRef(null);
  const isFirstRender = useRef(true);
  const wrapperRef = useRef(null);

  const jobs = useSelector((state) => {
    return state.jobs;
  });

  const onformChange = (e) => {
    const { id, value } = e.target;

    setParams({ ...params, [id]: value, currentPage: 1, pageMovement: "" });
  };

  const clearFilters = () => {
    setParams(intialParams);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      dispatch(fetchAllJobs(params));
      isFirstRender.current = false;
    } else {
      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        dispatch(fetchAllJobs(params));
      }, 500);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [params, dispatch]);

  return (
    <Wrapper>
      <div className="container">
        <SearchForm params={params} clearFilters={clearFilters} onformChange={onformChange} />
        <div className="jobs_list" ref={wrapperRef}>
          <b>{jobs.totalJobs} Positions Listed</b>

          {jobs.isLoading ? (
            <div className="list">
              {generateSkeleton(jobs.length).map((el, i) => {
                return <Skeleton key={i} el={el} params={params} />;
              })}
            </div>
          ) : jobs.totalJobs === 0 ? (
            <h2>No Job To Display !</h2>
          ) : (
            <div className="list">
              {jobs.jobList.map((el) => {
                return <SingleJob key={el.id} el={el} params={params} />;
              })}
            </div>
          )}
        </div>

        <Pagination setParams={setParams} wrapperRef={wrapperRef} params={params} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding-top: 60px;
  padding-bottom: 60px;
  max-height: calc(100vh - 96px);
  overflow-y: auto;

  .jobs_list {
    margin-top: 60px;
    b {
      font-size: 20px;
      line-height: 26px;
      color: var(--text-color-6);
    }
    .list {
      margin-top: 20px;

      display: grid;
      gap: 30px;
    }
    @media (min-width: 992px) {
      .list {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (min-width: 1200px) {
      .list {
        grid-template-columns: 1fr 1fr;
      }
    }
  }

  .jobs_list h2 {
    font-size: 32px;
    margin: 30px 0;
    font-weight: 200;
  }
  .pagination {
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
  }

  .skeleton {
    height: 357px;
    background-color: white;
    border: solid 1px;
  }
`;
export default AlljobsPage;
