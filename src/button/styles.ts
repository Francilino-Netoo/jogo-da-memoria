import styled from "styled-components";

export const Container = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  background-color: #1550ff;
  border-radius: 10px;
  cursor: pointer;
  opacity: 1;
  transition: all ease 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;

export const IconArea = styled.div`
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
`;

export const Icon = styled.img`
  height: 20px;
  margin-right: 5px;
  margin-left: 5px;
`;

export const Label = styled.div`
  height: inherit;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 0 20px;
`;
