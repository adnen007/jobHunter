import styled from "styled-components";

const Loading = () => {
  return (
    <Wrapper>
      <div className="loading"></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 60px 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  .loading {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 5px var(--primary-color) solid;
    border-left-color: transparent;
    animation: load 1s linear infinite;
    transform: rotate(0deg);
  }

  @keyframes load {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loading;
