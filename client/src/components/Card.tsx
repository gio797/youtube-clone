import React from "react";
import styled from "styled-components";

type Props = {};

const Container = styled.div`
  width: 360px;
  margin-bottom: 45px;
  cursor: pointer;
  background-color: gray;
`;

function Card({}: Props) {
  return <Container>Card</Container>;
}

export default Card;
