import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobs } from "../features/jobs/jobsAsync";

const Pagination = ({ params, currentPage, setCurrentPage }) => {
  const dispatch = useDispatch();

  const totalPages = useSelector((state) => {
    return state.jobs.totalPages;
  });

  const onPrev = () => {
    setCurrentPage(currentPage - 1);
    dispatch(fetchAllJobs({ ...params, pageMovement: "prev" }));
  };
  const onNext = () => {
    setCurrentPage(currentPage + 1);
    dispatch(fetchAllJobs({ ...params, pageMovement: "next" }));
  };

  return (
    <Wrapper>
      <button className="prev" onClick={onPrev} disabled={currentPage === 1}>
        <span className="arrowIcon">&lt;</span> Prev
      </button>
      <span className="pageInfo">
        {currentPage} / {totalPages}
      </span>
      <button className="next" onClick={onNext} disabled={currentPage === totalPages}>
        Next <span className="arrowIcon">&gt;</span>
      </button>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 70px;

  .prev,
  .next {
    background-color: var(--white);
    color: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 0 20px;
    height: 40px;
    border-radius: var(--radius);
    width: fit-content;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    span {
      display: block;
    }
  }

  .pageInfo {
    font-size: 16px;
    font-weight: 500;
    margin: 0 10px;
    color: var(--primary-color);
  }

  .arrowIcon {
    font-size: 20px;
    display: block;
  }
`;
export default Pagination;
