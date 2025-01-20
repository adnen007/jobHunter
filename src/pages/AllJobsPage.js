import styled from "styled-components";
import { SearchForm, SingleJob, Pagination, Loading } from "../components";
import { useEffect, useRef, useState } from "react";
import { convertToPath } from "../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobs } from "../features/jobs/asynJobs";

const AlljobsPage = () => {
  const intialParams = {
    search: "",
    status: "all",
    jobType: "all",
    sort: "latest",
    page: "1",
  };

  const [params, setParams] = useState(intialParams);
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
    const path = convertToPath(params);
    dispatch(fetchAllJobs(path));
  }, [params, dispatch]);

  const changePage = (pageNumber) => {
    setParams({ ...params, page: pageNumber });
  };

  const clearFilters = () => {
    setParams(intialParams);
  };

  const wrapperRef = useRef(null);

  return (
    <Wrapper ref={wrapperRef}>
      <div className="container">
        <SearchForm
          params={params}
          clearFilters={clearFilters}
          onformChange={onformChange}
        />
        <div className="jobs_list">
          <b>{jobs.total_jobs} jobs found</b>

          {jobs.is_loading ? (
            <Loading />
          ) : jobs.total_jobs === 0 ? (
            <h2>No Job To Display !</h2>
          ) : (
            <div className="list">
              {jobs.jobs_list.map((el) => {
                return (
                  <SingleJob
                    key={el._id}
                    el={el}
                    params={params}
                    wrapperRef={wrapperRef}
                  />
                );
              })}
            </div>
          )}
        </div>
        <Pagination
          changePage={changePage}
          totalPages={jobs.num_of_pages}
          current={params.page}
        />
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
