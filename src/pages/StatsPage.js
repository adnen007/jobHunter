import styled from "styled-components";
import { Status } from "../components";
import { Loading } from "../components";
import { useDispatch, useSelector } from "react-redux";
import fetchStats from "../features/stats/statsAsync";
import { useEffect } from "react";
import ChartsContainer from "../components/ChartsContainer";

const StatsPage = () => {
  const stats = useSelector((state) => {
    return state.stats;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  if (stats.isLoading) {
    return <Loading />;
  }
  const status = Object.entries(stats.status);

  return (
    <Wrapper>
      <div className="container">
        <div className="status">
          {status.map((el, i) => {
            return <Status key={i} el={el} />;
          })}
        </div>
        <ChartsContainer />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  max-height: calc(100vh - 96px);
  overflow-y: auto;
  padding: 30px 0;
  .status {
    display: grid;
    gap: 30px;
  }
  @media (min-width: 992px) {
    .status {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 1200px) {
    .status {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default StatsPage;
