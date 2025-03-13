import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Pagination = ({ params, setParams, wrapperRef }) => {
  const totalPages = useSelector((state) => {
    return state.jobs.totalPages;
  });

  const onPrev = () => {
    setParams({ ...params, currentPage: params.currentPage - 1, pageMovement: "prev" });
    wrapperRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const onNext = () => {
    setParams({ ...params, currentPage: params.currentPage + 1, pageMovement: "next" });
    wrapperRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Wrapper>
      <button className="prev" onClick={onPrev} disabled={params.currentPage === 1}>
        <span className="arrowIcon">&lt;</span> Prev
      </button>
      <span className="pageInfo">
        {params.currentPage} / {totalPages}
      </span>
      <button className="next" onClick={onNext} disabled={params.currentPage >= totalPages}>
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
