import styled from "styled-components";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";

const Pagination = ({ changePage, totalPages: total, current }) => {
  const pagesArr = [];
  const onNextClick = () => {
    if (current < total) changePage(current + 1);
  };
  const onPrevClick = () => {
    if (current > 1) changePage(current - 1);
  };

  if (total <= 5) {
    // Display all pages if total pages is 5 or less
    for (let i = 0; i < total; i++) {
      pagesArr[i] = i + 1;
    }
  } else {
    // Handling larger total pages with dynamic pagination
    if (current <= 3) {
      pagesArr.push(1, 2, 3, "...", total);
    } else if (current >= total - 2) {
      pagesArr.push(1, "...", total - 2, total - 1, total);
    } else {
      pagesArr.push(1, "...", current, "...", total);
    }
  }

  return (
    <Wrapper className="pagination">
      <div onClick={onPrevClick} className="prev">
        <MdOutlineKeyboardDoubleArrowLeft /> <span>Prev</span>
      </div>
      <div className="pages">
        {pagesArr.map((el, i) => {
          return (
            <div
              key={i}
              onClick={() => (el !== "..." ? changePage(el) : "")}
              className={el === current ? "current" : ""}
            >
              {el}
            </div>
          );
        })}
      </div>
      <div onClick={onNextClick} className="next">
        <span>Next</span> <MdOutlineKeyboardDoubleArrowRight />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  row-gap: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  .pages {
    display: flex;
    border-radius: var(--radius);
    > div {
      background-color: var(--interview-color-2);
      color: var(--primary-color);
      font-size: 20px;
      line-height: 23px;
      font-weight: 700;
      width: 60px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    > div.current {
      background-color: var(--primary-color);
      color: var(--white);
      border-radius: var(--radius);
    }
  }
  .next,
  .prev {
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
    svg {
      font-size: 20px;
      display: block;
    }
    span {
      display: block;
    }
  }
`;

export default Pagination;
