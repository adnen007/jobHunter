import styled from "styled-components";
const SearchForm = ({
  params: { search, jobType, sort, status },
  onformChange,
  clearFilters,
}) => {
  return (
    <Wrapper>
      {/* <h2>search form</h2> */}
      <div>
        <div className="row">
          <label className="lbl" htmlFor="search">
            search
          </label>
          <input
            onChange={onformChange}
            id="search"
            value={search}
            className="ipt"
            type="text"
            placeholder="Position"
          />
        </div>
        <div className="row">
          <label className="lbl" htmlFor="status">
            status
          </label>
          <select onChange={onformChange} id="status" value={status} className="ipt">
            <option value="interview">interview</option>
            <option value="declined">declined</option>
            <option value="pending">pending</option>
          </select>
        </div>
        <div className="row">
          <label className="lbl" htmlFor="jobType">
            type
          </label>
          <select onChange={onformChange} id="jobType" value={jobType} className="ipt">
            <option value="full-time">full-time</option>
            <option value="part-time">part-time</option>
            <option value="remote">remote</option>
            <option value="internship">internship</option>
          </select>
        </div>
        <div className="row">
          <label className="lbl" htmlFor="sort">
            sort
          </label>
          <select onChange={onformChange} id="sort" value={sort} className="ipt">
            <option value="latest">latest</option>
            <option value="oldest">oldest</option>
            <option value="a-z">a-z</option>
            <option value="z-a">z-a</option>
          </select>
        </div>
        <div className="row">
          <button onClick={clearFilters} className="btn" type="button">
            clear
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  background-color: var(--white);
  border-radius: var(--radius);
  padding: 30px 35px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  h2 {
    font-size: 25px;
    font-weight: 400;
    line-height: 31px;
    text-align: left;
    color: var(--text-color-6);
  }
  > div {
    display: grid;
    column-gap: 20px;
    row-gap: 10px;
    align-items: end;
    /* margin-top: 20px; */

    .row {
      display: flex;
      flex-direction: column;

      .ipt {
        display: block;
        border: none;
        background: var(--background-color-1);
        height: 35px;
        border-radius: var(--radius);
        padding-left: 15px;
        outline: solid 1px #ccd3db;
      }

      .btn {
        height: 35px;
        text-transform: capitalize;
        font-size: 16px;
        line-height: 18px;
        color: white;
        background-color: var(--primary-color);
        margin-top: 22px;
      }
    }
  }
  @media (min-width: 992px) {
    > div {
      grid-template-columns: repeat(5, 1fr);
    }
  }
  @media (min-width: 1200px) {
    > div {
      grid-template-columns: repeat(5, 1fr);
    }
  }
`;

export default SearchForm;
