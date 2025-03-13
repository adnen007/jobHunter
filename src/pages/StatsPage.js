import styled from "styled-components";
import { Status } from "../components";
import { Loading } from "../components";
import { useDispatch, useSelector } from "react-redux";
import fetchStats from "../features/stats/statsAsync";
import { useEffect } from "react";
import ChartsContainer from "../components/ChartsContainer";

const StatsPage = () => {
  const dispatch = useDispatch();

  const stats = useSelector((state) => {
    return state.stats;
  });

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
  padding-top: 40px;
  padding-bottom: 80px;
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
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }
  }
`;

export default StatsPage;
