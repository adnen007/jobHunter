import styled from "styled-components";
import { SearchForm, SingleJob, Pagination, Loading } from "../components";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobs } from "../features/jobs/jobsAsync";

const AlljobsPage = () => {
  const intialParams = {
    search: "",
    status: "all",
    jobType: "all",
    sort: "latest",
  };

  const [params, setParams] = useState(intialParams);
  const [currentPage, setCurrentPage] = useState(1);

  const jobs = useSelector((state) => {
    return state.jobs;
  });
  const dispatch = useDispatch();

  const onformChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setParams({ ...params, [id]: value });
  };

  useEffect(() => {
    dispatch(fetchAllJobs(params));
  }, [params, dispatch]);

  const clearFilters = () => {
    setParams(intialParams);
  };

  const wrapperRef = useRef(null);

  return (
    <Wrapper ref={wrapperRef}>
      <div className="container">
        <SearchForm params={params} clearFilters={clearFilters} onformChange={onformChange} />
        <div className="jobs_list">
          <b>{jobs.totalJobs} Positions Listed</b>

          {jobs.isLoading ? (
            <Loading />
          ) : jobs.totalJobs === 0 ? (
            <h2>No Job To Display !</h2>
          ) : (
            <div className="list">
              {jobs.jobList.map((el) => {
                return <SingleJob key={el.id} el={el} params={params} wrapperRef={wrapperRef} />;
              })}
            </div>
          )}
        </div>

        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} params={params} />
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
        grid-template-columns: 1fr 1fr 1fr;
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
`;
export default AlljobsPage;
