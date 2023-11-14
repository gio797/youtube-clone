import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {};

const Container = styled.div`
  width: 360px;
  margin-bottom: 45px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 202px;
  background-color: gray;
`;

const Details = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 12px;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 51%;
  background-color: gray;
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin-block: 9px;
`;

const Info = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

function Card({}: Props) {
  return (
    <Link to="/video/test" style={{ textDecoration: "none" }}>
      <Container>
        <Image />
        <Details>
          <ChannelImage />
          <Texts>
            <Title>Test Video</Title>
            <ChannelName>Gio's Channel</ChannelName>
            <Info>Lorem ipsum dolor sit amet.</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
}

export default Card;
