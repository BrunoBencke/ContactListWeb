import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  gap: 20px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
`;

export const labelError = styled.label`
  font-size: 14px;
  color: red;
`;

export const Title = styled.h2``;

export const ContainerGrid = styled.div`
  justify-content: center;
  background: #fff;
`;

export const CardLine = styled.div`
  position: relative;
  background: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 15px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.9);
  header {
    position: absolute;
    top: -22px;
    left: 15px;
  }
  p {
    font-weight: 500;
    line-height: 20px;
  }
  img {
    width: 24px;
    height: 24px;
    border-radius: 2px;
    margin-top: 5px;
  }
`;
