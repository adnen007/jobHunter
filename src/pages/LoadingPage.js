import React from "react";
import styled from "styled-components";

const LoadingPage = () => {
  return (
    <Wrapper>
      <div className="spinner" />
      <p className="loading-text">Loading, please wait...</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--background-color-1);
  color: var(--text-color-6);
  font-family: "cabin", "Roboto Condensed", sans-serif;
  text-align: center;

  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid var(--background-color-5);
    border-top: 5px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }

  .loading-text {
    font-size: 18px;
    font-weight: bold;
    color: var(--text-color-7);
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default LoadingPage;
