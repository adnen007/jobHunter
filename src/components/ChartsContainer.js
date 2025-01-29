import React, { useState } from "react";
import styled from "styled-components";

import ScatterChart from "./ScatterChart";
import AreaChart from "./AreaChart";
import { useSelector } from "react-redux";
const ChartsContainer = () => {
  const [scatterChart, setScatterChart] = useState(false);
  const { monthlyApplications: data } = useSelector((state) => state.stats.data);
  return (
    <Wrapper>
      <h4>Chasing Opportunities: 6-Month Snapshot</h4>
      <button type="button" onClick={() => setScatterChart(!scatterChart)}>
        {scatterChart ? "Area Chart" : "Scatter Chart"}
      </button>
      {scatterChart ? <ScatterChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;

  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-color);
    font-size: 1.25rem;
    cursor: pointer;
  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }
`;

export default ChartsContainer;
