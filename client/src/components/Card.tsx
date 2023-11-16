import { Link } from "react-router-dom";
import styled from "styled-components";
import { Video, User } from "../types";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import axios from "axios";

type CardProps = {
  type?: string;
  video?: Video;
};

const Container = styled.div<CardProps>`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img<CardProps>`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div<CardProps>`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img<CardProps>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
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
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

function Card({ type, video }: CardProps) {
  const [channel, setChannel] = useState<User | undefined>(undefined);

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/users/find/${video?.userId}`
      );
      setChannel(res.data);
    };

    fetchChannel();
  }, [video?.userId]);

  return (
    <Link to="/video/test" style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video?.imgUrl} />
        <Details type={type}>
          <ChannelImage type={type} src={channel?.img} />
          <Texts>
            <Title>{video?.title}</Title>
            <ChannelName>{channel?.name}</ChannelName>
            <Info>
              {video?.views} views • {format(video?.createdAt ?? new Date())}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
}

export default Card;
