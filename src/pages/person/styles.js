import styled from "styled-components";

export const Container = styled.div`
  padding: 20%;
  justify-content: center;
  background: #ecf1f8;
`;

export const CardLine = styled.div`
  position: relative;
  background: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 15px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
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
